const toggle = document.getElementById('theme-switch');
const titleElement = document.querySelector('title');
document.addEventListener('DOMContentLoaded', function () {
  // Get the checkbox input element
  const toggleInput = document.getElementById('input');
  const bodyElement = document.body;

  function applyTheme() {
    if (toggleInput.checked) {
      bodyElement.classList.add('dark-theme');
      bodyElement.style.backgroundColor = 'black';
      bodyElement.style.color = 'white';
    } else {
      bodyElement.classList.remove('dark-theme');
      bodyElement.style.backgroundColor = 'white';
      bodyElement.style.color = 'black';
    }
  }

  toggleInput.addEventListener('change', applyTheme);

  applyTheme();
});

  //Change title
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        titleElement.textContent = 'Comeback Please 😭'
    } 
    else {
    titleElement.textContent = 'NguyenMauManh - Portfolio Website'
    }
});

document.addEventListener('keydown', function(event) {
  // Ngăn F12
  if (event.key === 'F12' || event.keyCode === 121) {
    event.preventDefault();
    return false;
  }
  // Ngăn Ctrl+U (View Source)
  if (event.ctrlKey && (event.key === 'u' || event.key === 'U' || event.keyCode === 85)) {
    event.preventDefault();
    return false;
  }
  // Ngăn Ctrl+Shift+I (DevTools)
  if (event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I' || event.keyCode === 73)) {
    event.preventDefault();
    return false;
  }
  // Ngăn Ctrl+Shift+J (DevTools)
  if (event.ctrlKey && event.shiftKey && (event.key === 'j' || event.key === 'J' || event.keyCode === 74)) {
    event.preventDefault();
    return false;
  }
  // Ngăn Ctrl+Shift+C (Inspect Element)
  if (event.ctrlKey && event.shiftKey && (event.key === 'c' || event.key === 'C' || event.keyCode === 67)) {
    event.preventDefault();
    return false;
  }
});
// Ngăn chuột phải
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  return false;
});
//Ngăn chọn văn bản
document.addEventListener('DOMContentLoaded', function () {
  // Hiệu ứng cho toàn bộ section home
  ScrollReveal().reveal('#home', {
    origin: 'top',
    distance: '80px',
    duration: 1200,
    delay: 100,
    opacity: 0,
    scale: 0.96,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // Ảnh đại diện
  ScrollReveal().reveal('#home .img', {
    origin: 'left',
    distance: '60px',
    duration: 1000,
    delay: 200,
    opacity: 0,
    scale: 0.95,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // Tên người dùng
  ScrollReveal().reveal('#home #userName', {
    origin: 'top',
    distance: '30px',
    duration: 900,
    delay: 350,
    opacity: 0,
    scale: 0.98,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // Birthday và location
  ScrollReveal().reveal('#home .birthday, #home .location', {
    origin: 'top',
    distance: '20px',
    duration: 900,
    delay: 450,
    opacity: 0,
    interval: 100,
    scale: 0.98,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // Mô tả
  ScrollReveal().reveal('#home .desc', {
    origin: 'bottom',
    distance: '30px',
    duration: 900,
    delay: 600,
    opacity: 0,
    scale: 0.98,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // Các nút mạng xã hội
  ScrollReveal().reveal('#home .link-btn .social-btn', {
    origin: 'bottom',
    distance: '20px',
    duration: 900,
    delay: 700,
    opacity: 0,
    interval: 120,
    scale: 0.98,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // Nút scroll down
  ScrollReveal().reveal('#scroll-down-btn', {
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    delay: 1100,
    opacity: 0,
    scale: 0.98,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // ======= ABOUT SECTION =======
  ScrollReveal().reveal('#about .about-info', {
    origin: 'left',
    distance: '60px',
    duration: 1200,
    delay: 200,
    opacity: 0,
    scale: 0.97,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  ScrollReveal().reveal('#about .about-box', {
    origin: 'right',
    distance: '60px',
    duration: 1200,
    delay: 400,
    opacity: 0,
    scale: 0.97,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  ScrollReveal().reveal('#about .interest-box', {
    origin: 'bottom',
    distance: '30px',
    duration: 900,
    delay: 600,
    opacity: 0,
    interval: 120,
    scale: 0.98,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // ======= CONTACT SECTION =======
  ScrollReveal().reveal('#contact', {
    origin: 'top',
    distance: '60px',
    duration: 1200,
    delay: 200,
    opacity: 0,
    scale: 0.97,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  ScrollReveal().reveal('#contact .contact-box', {
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    delay: 400,
    opacity: 0,
    interval: 150,
    scale: 0.98,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  // Footer
  ScrollReveal().reveal('.footer-main', {
    origin: 'bottom',
    distance: '60px',
    duration: 1200,
    delay: 200,
    opacity: 0,
    scale: 0.96,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  ScrollReveal().reveal('.footer-link a', {
    origin: 'bottom',
    distance: '20px',
    duration: 900,
    delay: 400,
    opacity: 0,
    interval: 100,
    scale: 0.98,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });
});