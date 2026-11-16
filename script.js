(() => {
  const P = PERFIL;
  const D = P.destacado;
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const est = P.estudios[0] || {};

  // ---------- Portada ----------
  document.title = `${P.nombre} — Ingeniería de Software`;
  $("#brand").textContent = P.nombre;
  $("#eyebrow").textContent = [est.titulo, P.universidad].filter(Boolean).join(" · ");
  const partes = P.nombre.split(" ");
  $("#nombre").innerHTML = `${esc(partes[0])}<br><span>${esc(partes.slice(1).join(" "))}</span>`;
  $("#lead").innerHTML =
    `Estudio Ingeniería de Software y construyo aplicaciones web y móviles con ${esc(P.lenguajePrincipal)} y React.` +
    (D ? ` Ahora mismo trabajo en <a href="#trabajo">${esc(D.nombre)}</a>, una app que ayuda a anticipar crisis epilépticas.` : "");
  if (!P.disponible) $("#status").remove();
  $("#hero-links").innerHTML = [
    P.email && `<a class="gh" href="mailto:${esc(P.email)}"><i class="mail-icon"></i>${esc(P.email)}</a>`,
    P.github && `<a class="gh" href="${esc(P.github)}" target="_blank" rel="noopener"><i class="gh-icon"></i>GitHub <span>@${esc(P.github.split("/").filter(Boolean).pop())}</span></a>`,
    P.linkedin && `<a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
  ].filter(Boolean).join("");
  if (P.foto) { $("#hero-photo").src = P.foto; $("#hero-photo").alt = `Foto de ${P.nombre}`; }
  else $(".hero-photo").remove();

  // ---------- Marquee (port de Magic UI) ----------
  // Igual que <Marquee repeat={4} reverse pauseOnHover>: repite el contenido N veces
  // y cada grupo se desplaza su propio ancho + gap, así el bucle es continuo.
  const ICONOS = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/";
  const marquee = (el, children, repeat = 4) => {
    el.innerHTML = Array.from({ length: repeat }, (_, i) =>
      `<div class="marquee-group"${i ? ' aria-hidden="true"' : ""}>${children}</div>`).join("");
  };
  (P.cintaStack || []).forEach((fila, i) => {
    const el = $(`#mq-${i + 1}`); if (!el) return;
    marquee(el, fila.map(([nombre, slug]) =>
      `<span class="tech"><i style="--icon:url('${ICONOS}${slug}.svg')"></i>${esc(nombre)}</span>`).join(""));
  });
  if (!P.cintaStack?.length) $(".stack-band")?.remove();

  // ---------- Proyecto principal ----------
  if (D) {
    $("#sc-name").textContent = D.nombre;
    $("#sc-slogan").textContent = D.eslogan;
    $("#sc-desc").textContent = D.descripcion;
    $("#sc-aviso").textContent = D.aviso || "";
    $("#sc-cifras").innerHTML = D.cifras.map(([n, l]) => `<li><b>${esc(n)}</b><span>${esc(l)}</span></li>`).join("");
    $("#sc-stack").textContent = D.stack.join(", ");
    $("#sc-feats").innerHTML = D.funciones.map(([, t, d]) =>
      `<li class="reveal"><div><h4>${esc(t)}</h4><p>${esc(d)}</p></div></li>`).join("");
    $("#sc-estado").innerHTML = D.estado.map(([t, ok]) =>
      `<li class="${ok ? "ok" : ""}"><span>${esc(t)}</span><span>${ok ? "Hecho" : "Pendiente"}</span></li>`).join("");
    $("#sc-formula").innerHTML = esc(D.formula).replace(/\b(\d+(\.\d+)?)\b/g, '<span class="n">$1</span>');
    if (D.demo) { $("#sc-demo").href = D.demo; $("#sc-frame").src = D.demo; }
    else { $("#sc-demo").remove(); $(".phone-wrap").remove(); }
    if (D.codigo) $("#sc-code").href = D.codigo; else $("#sc-code").remove();
  } else {
    $("#trabajo").remove();
  }

  // ---------- Otros trabajos ----------
  // (sección quitada del HTML; si vuelves a añadir <ul id="projects"> se rellena sola)
  if ($("#projects")) $("#projects").innerHTML = P.proyectos.map((p) => {
    const url = p.demo || p.codigo;
    const inner = `<h4>${esc(p.titulo)}</h4><p>${esc(p.descripcion)}</p><small>${esc(p.tecnologias.join(" · "))} ${url ? "↗" : ""}</small>`;
    return `<li class="reveal">${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="row">${inner}</div>`}</li>`;
  }).join("");

  // ---------- Sobre mí ----------
  $("#resumen").textContent = P.resumen;
  $("#langs").innerHTML = P.lenguajes.map((l) =>
    `<li>${esc(l.nombre)}${l.nombre === P.lenguajePrincipal ? "<small>principal</small>" : ""}</li>`).join("");
  $("#tools").innerHTML = P.herramientas.map((t) => `<li>${esc(t)}</li>`).join("");
  $("#idiomas").innerHTML = P.idiomas.map((i) => `<li>${esc(i.nombre)}<small>${esc(i.nivel)}</small></li>`).join("");

  // ---------- Formación ----------
  const tl = (arr, a, b) => arr.map((e) => `
    <li class="reveal"><span class="period">${esc(e.periodo)}</span>
      <div><h4>${esc(e[a])}</h4><span class="inst">${esc(e[b])}</span>${e.descripcion ? `<p>${esc(e.descripcion)}</p>` : ""}</div></li>`).join("");
  $("#estudios-list").innerHTML = tl(P.estudios, "titulo", "institucion");
  if (P.experiencia.length) $("#exp-list").innerHTML = tl(P.experiencia, "puesto", "empresa"); else $("#exp-wrap").remove();
  if (P.certificaciones.length) $("#certs").innerHTML = P.certificaciones.map((c) =>
    `<li class="reveal"><span class="period">${esc(c.anio)}</span><div><h4>${esc(c.nombre)}</h4><span class="inst">${esc(c.entidad)}</span></div></li>`).join("");
  else $("#certs-wrap").remove();

  // ---------- Contacto ----------
  if (P.email) {
    $("#mail").href = `mailto:${P.email}`;
    $("#mail").textContent = P.email;
    $("#copy-btn").addEventListener("click", async (e) => {
      try { await navigator.clipboard.writeText(P.email); e.target.textContent = "Copiado"; }
      catch { e.target.textContent = P.email; }
      setTimeout(() => (e.target.textContent = "Copiar email"), 2000);
    });
  } else {
    $("#mail").href = P.github || "#"; $("#mail").textContent = "GitHub"; $("#copy-btn").remove();
  }
  $("#foot").textContent = `© ${new Date().getFullYear()} ${P.nombre}`;

  // ---------- Aparición al hacer scroll ----------
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.closest(".hero")) el.style.transitionDelay = `${[...el.parentNode.children].indexOf(el) * 0.07}s`;
    io.observe(el);
  });

  // ---------- Nav ----------
  const nav = $(".nav");
  const secciones = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".links a")];
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 10);
    let actual = "";
    secciones.forEach((s) => { if (s.getBoundingClientRect().top < 160) actual = s.id; });
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${actual}`));
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const mb = $(".menu-btn"), links = $(".links");
  mb.addEventListener("click", () => mb.setAttribute("aria-expanded", links.classList.toggle("open")));
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });

  // ---------- CV ----------
  $("#btn-cv").addEventListener("click", () => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
    window.print();
  });
})();

// ---------- GitHub ----------
(() => {
  const gh = PERFIL.github;
  const card = document.getElementById("gh-card"), foot = document.getElementById("foot-gh");
  if (!gh) { card?.remove(); foot?.remove(); return; }
  const user = gh.split("/").filter(Boolean).pop();
  card.href = gh; foot.href = gh;
  document.getElementById("gh-user").textContent = `github.com/${user}`;
})();

// ---------- Correo en el pie ----------
(() => {
  const a = document.getElementById("foot-mail");
  if (!PERFIL.email) { a?.remove(); return; }
  a.href = `mailto:${PERFIL.email}`; a.textContent = PERFIL.email;
})();
