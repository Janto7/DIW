document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("playwebCanvas");
  var ctx = canvas.getContext("2d");

  // Ajuste para asegurar que el canvas tenga el tamaño correcto
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  var particles = [];
  var particleCount = 100;
  var maxVelocity = 2;
  var angle = 0;

  // Generador de partículas
  function generateParticles() {
    for (var i = 0; i < particleCount; i++) {
      var x = canvas.width * Math.random();
      var y = canvas.height * Math.random();
      var vx = maxVelocity * 2 * Math.random() - maxVelocity;
      var vy = maxVelocity * 2 * Math.random() - maxVelocity;
      particles.push({ x: x, y: y, vx: vx, vy: vy });
    }
  }

  // Función para actualizar la posición de las partículas
  function updateParticles() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 100px 'Kavoon', 'Keania One', sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "hsl(" + (angle % 360) + ", 100%, 50%)";
    ctx.fillText("PlayWEB", canvas.width / 2, canvas.height / 2 + 30);

    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2, false);
      ctx.fill();
    });

    angle += 1;

    requestAnimationFrame(updateParticles);
  }

  generateParticles();
  updateParticles();
});
