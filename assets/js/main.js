(function () {
  'use strict';

  /* =========================================================
     1. Mobile Menu Toggle
     ========================================================= */
  const mobileBtn  = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('d-none');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('d-none');
      });
    });
  }


  /* =========================================================
     2. Swiper Slider Setup
     ========================================================= */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }


  /* =========================================================
     3. Video Modal (YouTube Embed)
     ========================================================= */
  const modal  = document.getElementById('videoModal');
  const iframe = document.getElementById('modalIframe');

  const openVideo = (id) => {
    if (!id || !modal || !iframe) return;
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    if (!modal || !iframe) return;
    iframe.src = '';
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.video-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openVideo(card.dataset.videoId);
    });
  });

  const closeBtn = document.getElementById('closeModalBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeVideo);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeVideo();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideo();
  });


  /* =========================================================
     4. WhatsApp Button & Appointment Form
     ========================================================= */
  const WHATSAPP_NUMBER = '8801881226288';
  const defaultMsg = 'Hello Dr. Tanvir Ahmed, I would like to book an appointment.';

  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMsg)}`;
  }

  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name  = document.getElementById('patientName').value.trim() || 'N/A';
      const phone = document.getElementById('phone').value.trim()       || 'N/A';
      const date  = document.getElementById('prefDate').value           || 'N/A';
      const note  = document.getElementById('notes').value.trim()       || 'None';

      const message =
        `*Appointment Request*\n` +
        `👤 Name: ${name}\n` +
        `📞 Phone: ${phone}\n` +
        `📅 Date: ${date}\n` +
        `📝 Notes: ${note}`;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    });
  }


  /* =========================================================
     5. Live Chamber Status
     ========================================================= */
  function updateChamberStatus() {
    const badge      = document.getElementById('liveStatusBadge');
    const statusText = document.getElementById('liveStatusText');
    const pulseDot   = document.querySelector('.pulse-dot');

    // Chamber: Tuesday(2) & Thursday(4), 15:00–18:00
    const now  = new Date();
    const day  = now.getDay();
    const hour = now.getHours();

    const isChamberDay  = day === 2 || day === 4;
    const isChamberTime = hour >= 15 && hour < 18;
    const isOpen        = isChamberDay && isChamberTime;

    if (badge) {
      badge.className = `status-badge ${isOpen ? 'open' : 'closed'}`;
      badge.innerHTML = isOpen
        ? '<i class="fas fa-circle-dot me-1"></i> Open Now'
        : '<i class="fas fa-circle me-1"></i> Closed Now';
    }

    if (statusText) {
      statusText.textContent = isOpen ? 'Open Now' : 'Closed Now';
    }

    if (pulseDot) {
      pulseDot.classList.toggle('closed', !isOpen);
    }
  }

  updateChamberStatus();

})();