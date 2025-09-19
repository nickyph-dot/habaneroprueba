// Carousel de testimonios (auto-rotate, pausa en hover/focus)
(function(){
  const wrap = document.querySelector('.testimonios-wrap');
  if (!wrap) return;

  const items = Array.from(wrap.querySelectorAll('.testimonio-item'));
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');

  let current = 0;
  const total = items.length;
  const INTERVAL = 6000; // ms
  let timer = null;
  let paused = false;

  // Inicial: activa el primer item
  function show(index){
    items.forEach((it, i) => {
      const active = i === index;
      it.classList.toggle('is-active', active);
      it.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    current = index;
  }

  function next(){
    show((current + 1) % total);
  }
  function prev(){
    show((current - 1 + total) % total);
  }

  function startAuto(){
    stopAuto();
    timer = setInterval(() => {
      if (!paused) next();
    }, INTERVAL);
  }
  function stopAuto(){
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Pausa al hover/focus
  wrap.addEventListener('mouseenter', () => { paused = true; });
  wrap.addEventListener('mouseleave', () => { paused = false; });
  wrap.addEventListener('focusin', () => { paused = true; });
  wrap.addEventListener('focusout', () => { paused = false; });

  // Controles
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // Tecla izquierda/derecha (opcional)
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); startAuto(); }
    if (e.key === 'ArrowLeft') { prev(); startAuto(); }
  });

  // Inicializamos
  show(0);
  startAuto();

  // --------- ejemplo: cómo cargar desde Supabase (comentar o usar más tarde) ----------
  /*
  async function loadFromSupabase(){
    // require @supabase/supabase-js y tus credenciales en script (o mejor: hacerlo desde backend)
    const supabaseUrl = 'https://TU_SUPABASE.supabase.co';
    const supabaseKey = 'PUBLIC_ANON_KEY';
    const { createClient } = supabase; // si lo importas
    const client = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await client.from('testimonios').select('texto, nombre, empresa').order('id', {ascending:true});
    if (!error && data) {
      // vacía wrap y crea los items dinámicamente, luego reinicia show/startAuto
    }
  }
  */
})();
