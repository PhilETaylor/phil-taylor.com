export default {
  async fetch(request, env) {
    if (!env.ASSETS) {
      return new Response("Not Found", { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
};
