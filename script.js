const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (!cursorGlow || window.matchMedia('(pointer: coarse)').matches) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
  cursorGlow.style.opacity = '1';
});
document.addEventListener('pointerleave', () => { if (cursorGlow) cursorGlow.style.opacity = '0'; });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

// Subtle magnetic movement on interactive elements.
if (window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) * 0.12;
      const dy = (event.clientY - rect.top - rect.height / 2) * 0.12;
      element.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });
}

// Add your portrait as assets/profile.jpg to replace the initials placeholder.
const profilePlaceholder = document.getElementById('profile-placeholder');
const portrait = new Image();
portrait.src = 'assets/profile.jpg';
portrait.onload = () => {
  profilePlaceholder.innerHTML = '';
  profilePlaceholder.style.background = `linear-gradient(0deg, rgba(23,21,18,.12), rgba(23,21,18,.02)), url("assets/profile.jpg") center 35% / cover`;
  profilePlaceholder.setAttribute('aria-label', 'Anik Dey portrait');
};
document.getElementById('year').textContent = new Date().getFullYear();
