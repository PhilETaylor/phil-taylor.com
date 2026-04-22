const MIME_HTML = "text/html";
const MIME_MARKDOWN = "text/markdown";

function prefersMarkdown(accept) {
  if (!accept) return false;
  let htmlQ = -1;
  let mdQ = -1;
  for (const raw of accept.split(",")) {
    const parts = raw.trim().split(";").map((s) => s.trim());
    const type = parts[0].toLowerCase();
    let q = 1;
    for (const p of parts.slice(1)) {
      const [k, v] = p.split("=").map((s) => s.trim());
      if (k === "q") {
        const n = Number(v);
        if (!Number.isNaN(n)) q = Math.max(0, Math.min(1, n));
      }
    }
    if (type === MIME_MARKDOWN && q > mdQ) mdQ = q;
    if ((type === MIME_HTML || type === "*/*" || type === "text/*") && q > htmlQ) htmlQ = q;
  }
  return mdQ > 0 && mdQ >= htmlQ;
}

function appendVaryAccept(headers) {
  const existing = headers.get("vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept")) headers.set("Vary", `${existing}, Accept`);
}

export default {
  async fetch(request, env) {
    if (!env.ASSETS) {
      return new Response("Not Found", { status: 404 });
    }

    const url = new URL(request.url);
    const isHomepage = url.pathname === "/" || url.pathname === "/index.html";

    if (isHomepage && prefersMarkdown(request.headers.get("accept"))) {
      const mdUrl = new URL(url);
      mdUrl.pathname = "/index.md";
      const mdRes = await env.ASSETS.fetch(new Request(mdUrl.toString(), request));
      if (mdRes.status === 200) {
        const res = new Response(mdRes.body, mdRes);
        res.headers.set("Content-Type", `${MIME_MARKDOWN}; charset=utf-8`);
        appendVaryAccept(res.headers);
        return res;
      }
    }

    const res = await env.ASSETS.fetch(request);
    if (isHomepage) {
      const out = new Response(res.body, res);
      appendVaryAccept(out.headers);
      if (out.headers.get("content-type")?.includes(MIME_HTML)) {
        const existingLink = out.headers.get("link");
        const alt = `</index.md>; rel="alternate"; type="text/markdown"`;
        out.headers.set("Link", existingLink ? `${existingLink}, ${alt}` : alt);
      }
      return out;
    }
    return res;
  },
};
