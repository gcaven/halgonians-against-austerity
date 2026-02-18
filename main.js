/* ─── DEFAULT EMAIL MESSAGE ─── */
const defaultMessage = `Dear Mayor Fillmore and Councillor,

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere diam in tellus pretium, sit amet pharetra velit faucibus. Nam lacinia hendrerit sapien, ut sagittis tortor molestie quis. Donec ut leo sed ipsum volutpat posuere. Phasellus interdum metus et fermentum pulvinar. Nulla accumsan aliquet vulputate. Pellentesque sodales ipsum turpis, eu tristique dui ultricies eget. Nunc lectus velit, consectetur vel consectetur nec, luctus non turpis. Fusce pulvinar ut magna sit amet sodales. Etiam vel condimentum mi. Pellentesque cursus, nulla ac facilisis mollis, orci nisi lobortis purus, in molestie nunc nulla id mi. Suspendisse non justo a magna gravida lacinia pulvinar sit amet justo. Donec ut ipsum non elit consectetur vehicula vitae nec turpis. Curabitur scelerisque ac erat quis venenatis. Duis id pretium urna. Etiam odio leo, iaculis eu vulputate eget, finibus eu felis. Fusce quis libero ex.

Cras neque urna, euismod in eros eleifend, tristique vulputate lacus. Vivamus malesuada ut nibh in consequat. Maecenas commodo mi justo. Aenean sed condimentum sapien. Suspendisse dapibus lacus at porttitor ullamcorper. Donec nunc lacus, sagittis in egestas ac, fringilla in tellus. Duis sit amet erat maximus, gravida neque sed, feugiat magna. Donec cursus efficitur mi, tristique imperdiet nunc vulputate vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ultricies felis vel eros hendrerit, ut malesuada tortor ultrices. Nullam non nibh ac arcu luctus dapibus. Curabitur vitae purus et magna suscipit ornare a vel sapien. Donec a lorem mi. Donec condimentum tortor sed elementum maximus. Aenean tempor nulla eget lacinia vulputate.

Sincerely,`;

document.getElementById('message').value = defaultMessage;

/* ─── HEADER SCROLL ─── */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ─── MOBILE NAV ─── */
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('navMenu').classList.toggle('open');
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

/* ─── FORM HANDLING ─── */
document.getElementById('emailForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    district: form.district.value,
    message: form.message.value
  };
  // TODO: Actually send the email
  alert('Thank you, ' + data.firstName + '! Someday soon this will actually send an email!');
});
