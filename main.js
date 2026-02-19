/* ─── COUNCILLOR EMAILS ─── */
const councillorEmails = {
  '1':  'cathy.deaglegammon@halifax.ca',
  '2':  'david.hendsbee@halifax.ca',
  '3':  'becky.kent@halifax.ca',
  '4':  'trish.purdy@halifax.ca',
  '5':  'sam.austin@halifax.ca',
  '6':  'tony.mancini@halifax.ca',
  '7':  'laura.white@halifax.ca',
  '8':  'virginia.hinch@halifax.ca',
  '9':  'shawn.cleary@halifax.ca',
  '10': 'kathryn.morse@halifax.ca',
  '11': 'cuttelp@halifax.ca',
  '12': 'Janet.steele@halifax.ca',
  '13': 'nancy.hartling@halifax.ca',
  '14': 'john.young@halifax.ca',
  '15': 'billy.gillis@halifax.ca',
  '16': 'jean.st-amand@halifax.ca',
};
const mayorEmail = 'mayor@halifax.ca';
const clerkEmail = 'clerks@halifax.ca';

/* ─── ROTATING COMMUNITY NAME ─── */
const communities = [
  'Halifax', 'Dartmouth', 'Bedford', 'Sackville', 'Cole Harbour',
  'Eastern Passage', 'Spryfield', 'Clayton Park', 'Fall River',
  'Timberlea', 'Herring Cove', 'Beaver Bank',
  'Musquodoboit', 'Porters Lake', 'Waverley', 'Lawrencetown',
  'Preston', 'Cherry Brook', 'Lake Echo', 'Sambro', 'Prospect',
  'Beechville', 'Woodside', 'Burnside', 'Armdale', 'Fairview',
  'Rockingham', 'Westphal', 'Sheet Harbour', 'Tantallon', 'Timberlea',
  'Jollimore', 'Purcells Cove', 'Lucasville',
];

const communityEl = document.getElementById('communityName');
let shuffled = [];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickCommunity() {
  if (shuffled.length === 0) {
    shuffled = shuffle(communities);
    // avoid repeating the name currently shown
    if (shuffled[0] === communityEl.textContent) {
      shuffled.push(shuffled.shift());
    }
  }
  const name = shuffled.pop();
  communityEl.style.opacity = 0;
  setTimeout(() => {
    communityEl.textContent = name;
    communityEl.style.opacity = 1;
  }, 400);
}

// Only run the rotator if the user hasn't requested reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  communityEl.style.transition = 'opacity 0.4s ease';
  setInterval(pickCommunity, 3000);
}

/* ─── HEADER SCROLL ─── */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ─── MOBILE NAV ─── */
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus();
  }
});

/* ─── SCROLL REVEAL ─── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

/* ─── ACTIVE NAV HIGHLIGHT ─── */
const navLinks = document.querySelectorAll('.header-nav a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.1, rootMargin: '-20% 0px -60% 0px' });

sections.forEach(section => navObserver.observe(section));

/* ─── MOBILE CARD TOGGLE ─── */
const cardToggle = document.getElementById('cardToggle');
cardToggle.addEventListener('click', () => {
  const card = document.querySelector('.hero-card');
  if (window.innerWidth <= 900) {
    const isExpanded = card.classList.toggle('expanded');
    cardToggle.setAttribute('aria-expanded', isExpanded);
  }
});

/* ─── MAILTO BUTTON ─── */
const districtSelect = document.getElementById('district');
const mailtoBtn = document.getElementById('mailtoLink');

function buildMailtoHref() {
  const district = districtSelect.value;
  if (!district) return null;
  const councillor = councillorEmails[district];
  const to = [councillor, mayorEmail].join(',');
  const subject = encodeURIComponent('Please reject austerity and invest in HRM');
  return `mailto:${to}?cc=${encodeURIComponent(clerkEmail)}&subject=${subject}`;
}

function updateMailto() {
  const href = buildMailtoHref();
  if (!href) {
    mailtoBtn.disabled = true;
    return;
  }
  mailtoBtn.disabled = false;
}

mailtoBtn.addEventListener('click', () => {
  const href = buildMailtoHref();
  if (href) {
    window.location.href = href;
  }
});

districtSelect.addEventListener('change', updateMailto);
