
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

    
    const menu = $('#menu');
    const hamburger = $('#hamburger');
    hamburger?.addEventListener('click', () => menu.classList.toggle('open'));
    $$('#menu a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

    const observerNav = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = $(`#menu a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          $$('#menu a').forEach(el => el.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    $$('section[id]').forEach(sec => observerNav.observe(sec));

    

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => revealObs.observe(el));

    

    const barsObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const spans = $$('span[data-pct]', e.target);
          spans.forEach(s => s.style.width = s.dataset.pct + '%');
        }
      })
    }, { threshold: .3 });
    $$('#habilidades .skill').forEach(s => barsObs.observe(s));

    

    const projectGrid = $('#projectGrid');
    const filterButtons = $$('.filter');
    function applyFilters() {
      const active = $('.filter.active')?.dataset.filter || 'all';
      const term = $('#globalSearch').value.trim().toLowerCase();
      $$('#projectGrid .card').forEach(card => {
        const tags = card.dataset.tags || '';
        const text = card.innerText.toLowerCase();
        const byTag = active === 'all' || tags.includes(active);
        const bySearch = term === '' || text.includes(term);
        card.style.display = (byTag && bySearch) ? '' : 'none';
      });
    }
    filterButtons.forEach(btn => btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    }));
    $('#globalSearch').addEventListener('input', applyFilters);

    
    const modal = $('#modal');
    const modalTitle = $('#modalTitle');
    const modalDesc = $('#modalDesc');
    const modalImg = $('#modalImg');
    const openModal = (data) => {
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modalImg.src = data.img;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    };
    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    };
    $('#modalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    $$('#proyectos [data-modal-open]').forEach(btn => btn.addEventListener('click', () => openModal(JSON.parse(btn.dataset.modalOpen))));

    
    const form = $('#contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const errs = {};
      if (!data.get('nombre')?.trim()) errs.nombre = 'Por favor, escribe tu nombre.';
      const email = data.get('email')?.trim();
      if (!email) errs.email = 'El email es obligatorio.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'El email no es válido.';
      if (!data.get('mensaje')?.trim()) errs.mensaje = 'Cuéntame un poco sobre tu proyecto.';

      $$('.error').forEach(e => e.textContent = '');
      Object.entries(errs).forEach(([k, v]) => $(`[data-error-for="${k}"]`).textContent = v);
      if (Object.keys(errs).length) return;

      const status = $('#formStatus');
      status.textContent = 'Enviando…';
      setTimeout(() => {
        status.textContent = '¡Gracias! Te responderé pronto.';
        form.reset();
      }, 800);
    });

    
    const themes = ['default', 'royal', 'emerald', 'sunset'];
    let idx = 0;
    const themeBtn = $('#themeBtn');
    const setTheme = (name) => {
      if (name === 'default') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', name);
      localStorage.setItem('theme-name', name);
    };
    themeBtn.addEventListener('click', () => { idx = (idx + 1) % themes.length; setTheme(themes[idx]); });
    setTheme(localStorage.getItem('theme-name') || 'default');

    
    $('#year').textContent = new Date().getFullYear();



    