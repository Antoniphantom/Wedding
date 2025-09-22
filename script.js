document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('bgmusic');
  const btn = document.getElementById('music-toggle');
  let started = true;

  // URL actualizado del Apps Script
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6d7U4jcJRrPHIFvdMpILCkZh1NWYQxAu5yr4WgNNneEOD95aUpeQ_1XfTYdF-Pdm_/exec";

  // Confirmación de asistencia
  const form = document.getElementById('confirmation-form');
  const responseMsg = document.getElementById('response-msg');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      responseMsg.textContent = "Enviando confirmación...";
      const data = new FormData(form);
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data
      })
      .then(r => r.text())
      .then(resp => {
        if (resp.includes("OK") || resp.toLowerCase().includes("success")) {
          responseMsg.textContent = "¡Confirmación recibida! Gracias por acompañarnos.";
        } else {
          responseMsg.textContent = "Ocurrió un error. Intenta de nuevo más tarde.";
        }
      })
      .catch(() => {
        responseMsg.textContent = "Hubo un error enviando tu confirmación.";
      });
    });
  }

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