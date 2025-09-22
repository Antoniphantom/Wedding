document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('bgmusic');
  const btn = document.getElementById('music-toggle');
  let started = false;

  // Función para iniciar el audio desde 1:30 (90 segundos)
  function startAudioAtPosition() {
    audio.currentTime = 90; // 1:30 = 90 segundos
    audio.play();
    started = true;
    btn.textContent = '⏸ Pausar música';
  }

  // Botón de pausa/reanudar
  btn.addEventListener('click', function() {
    if (!started) {
      startAudioAtPosition();
      return;
    }
    if (audio.paused) {
      audio.play();
      btn.textContent = '⏸ Pausar música';
    } else {
      audio.pause();
      btn.textContent = '▶️ Reanudar música';
    }
  });

  // Autoplay con posición cuando el usuario haga click en cualquier parte
  document.body.addEventListener('click', function autoPlayOnce() {
    if (!started) startAudioAtPosition();
    document.body.removeEventListener('click', autoPlayOnce);
  }, {once: true});
});
