(function () {
  var canvas = document.getElementById('hero-netlist-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var wrap = canvas.parentElement;
  var W, H, cx, cy;
  var dpr = window.devicePixelRatio || 1;

  function resize() {
    var rect = wrap.getBoundingClientRect();
    W = canvas.width = rect.width * dpr;
    H = canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    cx = W / 2;
    cy = H / 2;
  }
  window.addEventListener('resize', resize);
  resize();

  var NODE_COUNT = 85;
  var nodes = [];
  for (var i = 0; i < NODE_COUNT; i++) {
    var phi = Math.acos(2 * Math.random() - 1);
    var theta = Math.random() * Math.PI * 2;
    var r = 1.5 + Math.random() * 0.35;
    nodes.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta) * 0.6,
      z: r * Math.cos(phi),
      kind: Math.random() < 0.18 ? 'io' : (Math.random() < 0.5 ? 'logic' : 'memory'),
    });
  }

  var kindColor = {
    io: '#e8672f',
    logic: '#7c3fe0',
    memory: '#0fa89e',
  };

  var edges = [];
  for (var a = 0; a < nodes.length; a++) {
    var dists = nodes
      .map(function (n, j) {
        return { j: j, d: a === j ? Infinity : Math.hypot(n.x - nodes[a].x, n.y - nodes[a].y, n.z - nodes[a].z) };
      })
      .sort(function (p, q) { return p.d - q.d; })
      .slice(0, 2 + (Math.random() < 0.3 ? 1 : 0));
    dists.forEach(function (d) {
      var key = a < d.j ? a + '-' + d.j : d.j + '-' + a;
      if (!edges.some(function (e) { return e.key === key; })) edges.push({ key: key, a: a, b: d.j });
    });
  }

  function buildFullTour(start) {
    var adj = {};
    edges.forEach(function (e) {
      (adj[e.a] = adj[e.a] || []).push(e.b);
      (adj[e.b] = adj[e.b] || []).push(e.a);
    });

    // Pick a spanning tree over the whole graph (DFS), then walk it as an
    // Euler tour (visit child, come back to parent) so the path touches
    // every node before looping back to the start.
    var visited = {};
    var children = {};
    visited[start] = true;
    children[start] = [];
    var stack = [start];
    while (stack.length) {
      var u = stack.pop();
      (adj[u] || []).forEach(function (v) {
        if (!visited[v]) {
          visited[v] = true;
          children[u].push(v);
          children[v] = [];
          stack.push(v);
        }
      });
    }

    var path = [];
    function walk(u) {
      path.push(u);
      children[u].forEach(function (v) {
        walk(v);
        path.push(u);
      });
    }
    walk(start);
    return path;
  }
  var criticalPath = buildFullTour(0);
  var tourSegCount = criticalPath.length - 1;

  var angle = 0.4;
  var tilt = 0.34;

  function project(x, y, z) {
    var scaleX = W * 0.3;
    var scaleY = H * 0.42;
    var scaleD = Math.min(scaleX, scaleY);
    var cosY = Math.cos(angle), sinY = Math.sin(angle);
    var X = x * cosY - z * sinY;
    var Z0 = x * sinY + z * cosY;
    var cosX = Math.cos(tilt), sinX = Math.sin(tilt);
    var Y = y * cosX - Z0 * sinX;
    var Z = y * sinX + Z0 * cosX;
    var depth = Z + 5;
    var persp = 700 / (700 + depth * scaleD);
    return {
      sx: cx + X * scaleX * persp,
      sy: cy - Y * scaleY * persp,
      depth: depth,
    };
  }

  var pulseT = 0;

  var ZOOM = 1.3;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(ZOOM, ZOOM);
    ctx.translate(-cx, -cy);
    var projected = nodes.map(function (n) { return project(n.x, n.y, n.z); });

    edges.forEach(function (e) {
      var pa = projected[e.a], pb = projected[e.b];
      ctx.beginPath();
      ctx.moveTo(pa.sx, pa.sy);
      ctx.lineTo(pb.sx, pb.sy);
      ctx.strokeStyle = 'rgba(20,20,30,0.14)';
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();
    });

    var headTotal = pulseT % tourSegCount;
    var headSeg = Math.floor(headTotal);
    var TRAIL = 18;
    ctx.lineWidth = 1.6 * dpr;
    for (var k = 0; k < TRAIL; k++) {
      var segIdx = headSeg - k;
      while (segIdx < 0) segIdx += tourSegCount;
      var pa2 = projected[criticalPath[segIdx]], pb2 = projected[criticalPath[segIdx + 1]];
      ctx.strokeStyle = 'rgba(20,20,30,' + (0.4 * (1 - k / TRAIL)) + ')';
      ctx.beginPath();
      ctx.moveTo(pa2.sx, pa2.sy);
      ctx.lineTo(pb2.sx, pb2.sy);
      ctx.stroke();
    }

    nodes.forEach(function (n, i) {
      var p = projected[i];
      var scaleD = Math.min(W * 0.3, H * 0.42);
      var scaleFactor = 700 / (700 + Math.max(0, p.depth) * scaleD) + 0.3;
      var rad = (2.4 + (n.kind === 'io' ? 1 : 0)) * dpr * scaleFactor;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
      ctx.fillStyle = kindColor[n.kind];
      ctx.globalAlpha = 0.9;
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (tourSegCount > 0) {
      var f = headTotal - headSeg;
      var a2 = projected[criticalPath[headSeg]];
      var b2 = projected[criticalPath[headSeg + 1]];
      var px = a2.sx + (b2.sx - a2.sx) * f;
      var py = a2.sy + (b2.sy - a2.sy) * f;
      ctx.beginPath();
      ctx.arc(px, py, 4.5 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = '#141417';
      ctx.shadowColor = 'rgba(124,63,224,0.55)';
      ctx.shadowBlur = 16 * dpr;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function loop() {
    if (!reduceMotion) {
      angle += 0.0022;
      pulseT += 0.06;
    }
    draw();
    requestAnimationFrame(loop);
  }
  loop();
})();
