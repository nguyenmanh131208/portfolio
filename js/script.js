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
document.addEventListener('selectstart', function(event) {
  event.preventDefault();
  return false;
});
// Scroll Reveal
document.addEventListener('DOMContentLoaded', function () {
  // Hiệu ứng cho các section chính
  ScrollReveal().reveal('#home', {
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 100,
    opacity: 0,
    scale: 0.97,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  ScrollReveal().reveal('#about', {
    origin: 'left',
    distance: '60px',
    duration: 1000,
    delay: 200,
    opacity: 0,
    scale: 0.97,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  ScrollReveal().reveal('#contact', {
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    opacity: 0,
    scale: 0.97,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });

  ScrollReveal().reveal('.footer-main', {
    origin: 'bottom',
    distance: '40px',
    duration: 900,
    delay: 200,
    opacity: 0,
    scale: 0.96,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: true
  });
});