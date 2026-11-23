document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.querySelector('b').textContent = isOpen ? 'Закрыть меню' : 'Открыть меню';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('b').textContent = 'Открыть меню';
      });
    });
  }

  document.querySelectorAll('.image-container img').forEach((image) => {
    image.addEventListener('click', () => {
      const lightbox = document.createElement('dialog');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `<button type="button" aria-label="Закрыть изображение">×</button><img src="${image.src}" alt="${image.alt}">`;
      document.body.append(lightbox);
      lightbox.showModal();
      const close = () => { lightbox.close(); lightbox.remove(); };
      lightbox.querySelector('button').addEventListener('click', close);
      lightbox.addEventListener('click', (event) => { if (event.target === lightbox) close(); });
      lightbox.addEventListener('close', () => lightbox.remove());
    });
  });
});


// Яндекс Форма
(() => {
  const yandexFormUrl =
    'https://forms.yandex.ru/u/6b00589d974ab2a4b73b74e2?iframe=1';

  const modal = document.querySelector('[data-modal]');
  const frame = document.querySelector('[data-yandex-frame]');

  const openButtons = document.querySelectorAll('[data-open-form]');
  const closeButtons = document.querySelectorAll('[data-close-form]');

  if (!modal || !frame) return;

  const openModal = () => {
    frame.src = yandexFormUrl;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    frame.src = '';
  };

  openButtons.forEach(button => {
    button.addEventListener('click', openModal);
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  // Закрытие при клике на затемнённый фон
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Закрытие клавишей Escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
})();
