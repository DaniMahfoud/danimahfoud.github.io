(()=>{
  const root=document.documentElement;
  const themeButton=document.querySelector('[data-theme-toggle]');
  const saved=localStorage.getItem('dani-theme');
  const initial=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');

  function setTheme(theme){
    root.dataset.theme=theme;
    if(themeButton){
      themeButton.textContent=theme==='dark'?'☼ Light':'☾ Dark';
      themeButton.setAttribute('aria-label',`Switch to ${theme==='dark'?'light':'dark'} mode`);
    }
  }

  function escapeHtml(value){
    return String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }

  async function loadExperience(){
    const list=document.querySelector('[data-experience-list]');
    if(!list) return;
    try{
      const response=await fetch('./experience.json',{cache:'no-store'});
      if(!response.ok) throw new Error(`Experience data returned ${response.status}`);
      const entries=await response.json();
      if(!Array.isArray(entries)||!entries.length) throw new Error('Experience data is empty');
      list.innerHTML=entries.map(entry=>`<div class="timeline-item"><div class="eyebrow">${escapeHtml(entry.period)}</div><h3>${escapeHtml(entry.title)}</h3><strong>${escapeHtml(entry.company)}</strong><ul>${(Array.isArray(entry.highlights)?entry.highlights:[]).map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></div>`).join('');
    }catch(error){
      console.warn('Could not load experience.json. Showing the embedded fallback.',error);
    }
  }

  setTheme(initial);
  themeButton?.addEventListener('click',()=>{
    const next=root.dataset.theme==='dark'?'light':'dark';
    setTheme(next);
    localStorage.setItem('dani-theme',next);
  });

  const toggle=document.querySelector('[data-menu-toggle]');
  const nav=document.querySelector('[data-nav-links]');
  function closeMenu(){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}
  toggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
  nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));

  const year=document.querySelector('#year');
  if(year) year.textContent=new Date().getFullYear();
  loadExperience();

  document.querySelector('[data-contact-form]')?.addEventListener('submit',async event=>{
    event.preventDefault();
    const form=event.currentTarget;
    const note=form.querySelector('[data-form-note]');
    if(!form.reportValidity()) return;
    if(form.elements.website?.value) return;

    const name=form.elements.name.value.trim();
    const email=form.elements.email.value.trim();
    const message=form.elements.message.value.trim();
    const recipient=form.dataset.recipient.trim();
    const endpoint=form.dataset.formEndpoint.trim();
    const submit=form.querySelector('button[type="submit"]');

    if(endpoint){
      submit.disabled=true;
      submit.textContent='Sending…';
      try{
        const response=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        if(!response.ok) throw new Error('Request failed');
        form.reset();
        note.textContent='Thanks — your message was sent successfully.';
      }catch(error){
        note.textContent='The form service could not be reached. Please use LinkedIn instead.';
      }finally{
        submit.disabled=false;
        submit.textContent='Prepare message ↗';
      }
      return;
    }

    if(!recipient){
      note.textContent='The free email option is ready, but the site owner still needs to add a recipient email in data-recipient.';
      return;
    }

    const subject=encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body=encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href=`mailto:${recipient}?subject=${subject}&body=${body}`;
    note.textContent='Your email app should open with a prepared message. Please send it to complete the inquiry.';
  });
})();
