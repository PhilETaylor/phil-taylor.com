var cameras = [
    { alias: '667152e6e359f', name: 'Runway Cam', featured: true },
    { alias: '667166e35c208', name: 'Aero Club \u2013 Fuel Bowser' },
    { alias: '6671bb0673f93', name: 'Apron' },
    { alias: '6671ba0eeb76c', name: 'Far Grass Parking' },
    { alias: '66965d5218582', name: 'Grass Parking Near Road' }
];

var container = document.getElementById('cameras');

cameras.forEach(function(cam, i) {
    var div = document.createElement('div');
    div.className = 'stream' + (cam.featured ? ' featured' : '');
    div.innerHTML =
        '<h2>' + cam.name + '</h2>' +
        '<div class="loading" id="loader-' + i + '">Loading\u2026</div>' +
        '<div id="cam-' + i + '" style="display:none"></div>';
    container.appendChild(div);
    initCamera(cam, i);
});

function initCamera(cam, index) {
    fetch('https://www.ipcamlive.com/player/getcamerastreamstate.php?alias=' + cam.alias + '&targetdomain=' + location.hostname)
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var d = data.details;
            var loader = document.getElementById('loader-' + index);
            var wrapper = document.getElementById('cam-' + index);

            if (!d || d.enabled !== '1') {
                loader.textContent = 'Camera offline';
                loader.style.color = '#a44';
                return;
            }

            loader.style.display = 'none';
            wrapper.style.display = 'block';

            if (d.cameracannotbeembedded) {
                showSnapshot(wrapper, cam, d);
            } else {
                embedPlayer(wrapper, cam, index);
            }
        })
        .catch(function() {
            var loader = document.getElementById('loader-' + index);
            loader.textContent = 'Failed to load';
            loader.style.color = '#a44';
        });
}

function embedPlayer(wrapper, cam, index) {
    var playerId = 'player-' + index;
    var playerDiv = document.createElement('div');
    playerDiv.id = playerId;
    playerDiv.className = 'player-wrap';
    wrapper.appendChild(playerDiv);

    var player = new iplayer();
    player.embed(playerId, cam.alias, { autoplay: 1, mute: 0 });
    player.resize();

    var w = playerDiv.clientWidth;
    playerDiv.style.height = (w * 0.5625) + 'px';

    window.addEventListener('resize', function() {
        var w = playerDiv.clientWidth;
        playerDiv.style.height = (w * 0.5625) + 'px';
        player.resize();
    });

    var status = document.createElement('div');
    status.className = 'status live';
    status.textContent = 'Live stream';
    wrapper.appendChild(status);
}

function showSnapshot(wrapper, cam) {
    var link = document.createElement('a');
    link.className = 'snapshot-link';
    link.href = 'https://www.ipcamlive.com/' + cam.alias;
    link.target = '_blank';
    link.rel = 'noopener';

    var img = document.createElement('img');
    img.alt = cam.name;
    var snapshotUrl = 'https://www.ipcamlive.com/player/snapshot.php?alias=' + cam.alias;
    img.src = snapshotUrl + '&t=' + Date.now();

    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = '<span>Open live stream \u2192</span>';

    link.appendChild(img);
    link.appendChild(overlay);
    wrapper.appendChild(link);

    var status = document.createElement('div');
    status.className = 'status live';
    status.textContent = 'Live snapshot \u2013 click to watch';
    wrapper.appendChild(status);

    setInterval(function() {
        img.src = snapshotUrl + '&t=' + Date.now();
    }, 10000);
}
