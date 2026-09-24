const canvas = document.getElementById("embers");
const ctx = canvas.getContext("2d");
const motes = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

for (let i = 0; i < 70; i++) {
  motes.push({
    x: Math.random(),
    y: Math.random(),
    r: 1 + Math.random() * 2.2,
    s: 0.15 + Math.random() * 0.45,
    a: 0.25 + Math.random() * 0.6,
    w: Math.random() * Math.PI * 2
  });
}

function frame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const t = performance.now() / 1000;
  for (const m of motes) {
    m.y -= m.s / 400;
    if (m.y < -0.02) m.y = 1.02;
    const x = m.x * canvas.width + Math.sin(t + m.w) * 16;
    const y = m.y * canvas.height;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 214, 150, ${m.a})`;
    ctx.arc(x, y, m.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(frame);
}
frame();
