document.addEventListener('DOMContentLoaded', () => {
  // Animación Typewriter para el título principal
  const titulo = document.querySelector('.titulo');
  const textoTitulo = titulo.textContent;
  titulo.textContent = '';

  let i = 0;
  function typeWriter() {
    if (i < textoTitulo.length) {
      titulo.textContent += textoTitulo.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      const carta = document.querySelector('.carta');
      carta.style.opacity = '1';
      carta.style.transform = 'translateY(0)';
      // Iniciar animaciones de fondo una vez que el contenido principal está visible
      initNightAnimations();
    }
  }
  // Retrasar el inicio del typewriter ligeramente para que la página cargue un poco
  setTimeout(typeWriter, 500);

  // Funcionalidad del Lightbox
  const gridGaleria = document.querySelector('.grid-galeria');
  const lightbox = document.getElementById('lightbox');
  const imagenAmpliada = document.querySelector('.imagen-ampliada');
  const descripcionObra = document.querySelector('.descripcion-obra');
  const cerrarLightbox = document.querySelector('.cerrar');

  gridGaleria.addEventListener('click', (e) => {
    const figure = e.target.closest('figure');
    if (figure) {
      const img = figure.querySelector('img');
      const caption = figure.querySelector('figcaption');
      imagenAmpliada.src = img.dataset.src || img.src;
      descripcionObra.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('visible');
    }
  });

  cerrarLightbox.addEventListener('click', () => {
    lightbox.classList.remove('visible');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('visible');
    }
  });

  // Botón flotante para volver al inicio
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animaciones de Noche: Estrellas Fugaces y Luciérnagas
  let starTimeouts = [];
  let fireflyTimeouts = [];
  let currentStars = [];
  let currentFireflies = [];

  const animationContainer = document.getElementById('animation-container');


  function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    animationContainer.appendChild(star);
    currentStars.push(star);

    // Posición inicial y final aleatorias para la animación de la estrella
    const startX = Math.random() * 100; // 0-100vw
    const startY = Math.random() * 30; // 0-30vh (parte superior para que 'caiga')
    const endX = startX + (Math.random() * 40 + 30); // Se mueve a la derecha
    const endY = startY + (Math.random() * 40 + 30); // Y hacia abajo

    star.style.setProperty('--start-x', startX);
    star.style.setProperty('--start-y', startY);
    star.style.setProperty('--end-x', endX);
    star.style.setProperty('--end-y', endY);

    star.addEventListener('animationend', () => {
      star.remove();
      currentStars = currentStars.filter(s => s !== star);
    });

    // *** AUMENTO DE FRECUENCIA DE ESTRELLAS ***
    const nextStarDelay = Math.random() * 2000 + 1000; // Antes era 2000-6000ms, ahora 1000-3000ms
    starTimeouts.push(setTimeout(createShootingStar, nextStarDelay));
  }

  function createFirefly() {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    animationContainer.appendChild(firefly);
    currentFireflies.push(firefly);

    // Posición inicial aleatoria para la luciérnaga
    const fireflyX = Math.random() * 100;
    const fireflyY = Math.random() * 100;
    firefly.style.setProperty('--firefly-x', fireflyX);
    firefly.style.setProperty('--firefly-y', fireflyY);

    // Definir puntos aleatorios para el camino de la luciérnaga
    firefly.style.setProperty('--move-x1', Math.random() * 100);
    firefly.style.setProperty('--move-y1', Math.random() * 100);
    firefly.style.setProperty('--move-x2', Math.random() * 100);
    firefly.style.setProperty('--move-y2', Math.random() * 100);
    firefly.style.setProperty('--move-x3', Math.random() * 100);
    firefly.style.setProperty('--move-y3', Math.random() * 100);
    firefly.style.setProperty('--move-x4', Math.random() * 100);
    firefly.style.setProperty('--move-y4', Math.random() * 100);


    firefly.addEventListener('animationend', () => {
      firefly.remove();
      currentFireflies = currentFireflies.filter(f => f !== firefly);
      // *** AUMENTO DE FRECUENCIA DE LUCIÉRNAGAS ***
      fireflyTimeouts.push(setTimeout(createFirefly, Math.random() * 2000 + 500)); // Antes 0-4000ms, ahora 500-2500ms
    });
  }

  function initNightAnimations() {
    // *** MÁS ESTRELLAS INICIALES ***
    for(let j = 0; j < 5; j++) { // Antes 3, ahora 5 estrellas iniciales
        starTimeouts.push(setTimeout(createShootingStar, Math.random() * 2500));
    }

    // *** MÁS LUCIÉRNAGAS INICIALES ***
    const numberOfFireflies = 120; // Antes 8, ahora 15 luciérnagas iniciales
    for (let k = 0; k < numberOfFireflies; k++) {
      fireflyTimeouts.push(setTimeout(createFirefly, Math.random() * 2000));
    }
  }
});