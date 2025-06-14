document.addEventListener("DOMContentLoaded", function () {
  // --- 1. LOADER ---
  const loader = document.querySelector(".loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(() => {
        loader.style.display = "none";
      }, 300);
    });
  }

  // --- 2. DARK THEME ---
  const toggleInput = document.getElementById("input");
  const bodyElement = document.body;
  const titleElement = document.querySelector("title");

  if (toggleInput) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      toggleInput.checked = true;
      bodyElement.classList.add("dark-theme");
      bodyElement.style.backgroundColor = "black";
      bodyElement.style.color = "white";
    } else {
      toggleInput.checked = false;
      bodyElement.classList.remove("dark-theme");
      bodyElement.style.backgroundColor = "white";
      bodyElement.style.color = "black";
    }

    function applyTheme() {
      if (toggleInput.checked) {
        bodyElement.classList.add("dark-theme");
        bodyElement.style.backgroundColor = "black";
        bodyElement.style.color = "white";
      } else {
        bodyElement.classList.remove("dark-theme");
        bodyElement.style.backgroundColor = "white";
        bodyElement.style.color = "black";
      }
    }

    toggleInput.addEventListener("change", applyTheme);
    applyTheme();
  }

  // --- 3. FORM VALIDATION & SUBMISSION ---
  const form = document.getElementById("contact-form");
  if (form) {
    const modal = document.getElementById('form-status-modal');
    const modalIcon = modal.querySelector('.nmm-modal-icon');
    const modalTitle = modal.querySelector('.nmm-modal-title');
    const modalMessage = modal.querySelector('.nmm-modal-message');
    const modalButton = modal.querySelector('.nmm-modal-button');
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    // Show error for an input
    const showError = (input, message) => {
      const inputGroup = input.parentElement;
      inputGroup.classList.remove("success");
      inputGroup.classList.add("error");
      const validationMessage = inputGroup.querySelector(".validation-message");
      if (validationMessage) validationMessage.innerText = message;
    };

    // Show success for an input
    const showSuccess = (input) => {
      const inputGroup = input.parentElement;
      inputGroup.classList.remove("error");
      inputGroup.classList.add("success");
      const validationMessage = inputGroup.querySelector(".validation-message");
      if (validationMessage) validationMessage.innerText = "";
    };

    // SHOW MODAL
    const showModal = (isSuccess, title, message) => {
      modalIcon.className = 'nmm-modal-icon';
      modalButton.className = 'nmm-modal-button';

      if (isSuccess) {
        modalIcon.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        modalIcon.classList.add('success');
        modalButton.classList.add('success');
      } else {
        modalIcon.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        modalIcon.classList.add('error');
        modalButton.classList.add('error');
      }
      modalTitle.textContent = title;
      modalMessage.textContent = message;
      modal.classList.add('active');
    };

    const hideModal = () => {
      modal.classList.remove('active');
    };

    // Modal close event
    modalButton.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });

    // Validate Name
    const checkName = () => {
      let isValid = false;
      const value = nameInput.value.trim();
      if (value === "") {
        showError(nameInput, "Your name cannot be left blank.");
      } else if (value.length < 2) {
        showError(nameInput, "Full name must be at least 2 characters.");
      } else {
        showSuccess(nameInput);
        isValid = true;
      }
      return isValid;
    };

    // Validate Email
    const checkEmail = () => {
      let isValid = false;
      const value = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value === "") {
        showError(emailInput, "Email cannot be left blank.");
      } else if (!emailRegex.test(value)) {
        showError(emailInput, "Email is not in correct format.");
      } else {
        showSuccess(emailInput);
        isValid = true;
      }
      return isValid;
    };

    // Validate Subject
    const checkSubject = () => {
      let isValid = false;
      const value = subjectInput.value.trim();
      if (value === "") {
        showError(subjectInput, "Subject cannot be left blank.");
      } else if (value.length < 3) {
        showError(subjectInput, "Subject must be at least 3 characters.");
      } else {
        showSuccess(subjectInput);
        isValid = true;
      }
      return isValid;
    };

    // Validate Message
    const checkMessage = () => {
      let isValid = false;
      const value = messageInput.value.trim();
      if (value === "") {
        showError(messageInput, "Message content cannot be left blank.");
      } else if (value.length < 10) {
        showError(messageInput, "Message must be at least 10 characters.");
      } else {
        showSuccess(messageInput);
        isValid = true;
      }
      return isValid;
    };

    // Add blur and input events for fields
    nameInput.addEventListener("blur", checkName);
    emailInput.addEventListener("blur", checkEmail);
    subjectInput.addEventListener("blur", checkSubject);
    messageInput.addEventListener("blur", checkMessage);

    nameInput.addEventListener("input", checkName);
    emailInput.addEventListener("input", checkEmail);
    subjectInput.addEventListener("input", checkSubject);
    messageInput.addEventListener("input", checkMessage);

    // Form submit event
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const isNameValid = checkName();
      const isEmailValid = checkEmail();
      const isSubjectValid = checkSubject();
      const isMessageValid = checkMessage();
      const isFormValid =
        isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (!isFormValid) {
        showModal(false, 'Invalid Data', 'Please check the information you entered in the form.');
        return;
      }

      const submitBtn = form.querySelector(".submit-btn");
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;

      const formData = new FormData(form);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
      .then(response => {
        if (response.ok) {
          showModal(true, 'Success!', 'Your message has been sent. Thank you for contacting!');
          form.reset();
          const inputGroups = form.querySelectorAll('.input-group');
          inputGroups.forEach(group => {
            group.classList.remove('success', 'error');
          });
        } else {
          throw new Error('Server-side error.');
        }
      })
      .catch(error => {
        showModal(false, 'Failed!', 'An error occurred while sending. Please try again later.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
    });
  }

  // --- 4. SCROLL REVEAL ---
  // ScrollReveal().reveal("#home", {
  //   origin: "top",
  //   distance: "60px",
  //   duration: 1000,
  //   delay: 100,
  //   opacity: 0,
  //   scale: 0.97,
  //   easing: "cubic-bezier(0.5, 0, 0, 1)",
  //   reset: true,
  // });
  // ScrollReveal().reveal("#about", {
  //   origin: "left",
  //   distance: "60px",
  //   duration: 1000,
  //   delay: 200,
  //   opacity: 0,
  //   scale: 0.97,
  //   easing: "cubic-bezier(0.5, 0, 0, 1)",
  //   reset: true,
  // });
  // ScrollReveal().reveal("#contact", {
  //   origin: "bottom",
  //   distance: "60px",
  //   duration: 1000,
  //   delay: 200,
  //   opacity: 0,
  //   scale: 0.97,
  //   easing: "cubic-bezier(0.5, 0, 0, 1)",
  //   reset: true,
  // });
  // ScrollReveal().reveal(".footer-main", {
  //   origin: "bottom",
  //   distance: "40px",
  //   duration: 900,
  //   delay: 200,
  //   opacity: 0,
  //   scale: 0.96,
  //   easing: "cubic-bezier(0.5, 0, 0, 1)",
  //   reset: true,
  // });

  // ScrollReveal().reveal("#contact-via-email", {
  //   origin: "bottom",
  //   distance: "60px",
  //   duration: 1000,
  //   delay: 250,
  //   opacity: 0,
  //   scale: 0.97,
  //   easing: "cubic-bezier(0.5, 0, 0, 1)",
  //   reset: true,
  // });

  // ScrollReveal().reveal("#project", {
  //   origin: "right",
  //   distance: "60px",
  //   duration: 1000,
  //   delay: 250,
  //   opacity: 0,
  //   scale: 0.97,
  //   easing: "cubic-bezier(0.5, 0, 0, 1)",
  //   reset: true,
  // });

  // --- 5. OTHER FEATURES ---
  // Change title
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      titleElement.textContent = "Comeback Please 😭";
    } else {
      titleElement.textContent = "NguyenMauManh - Portfolio Website";
    }
  });

  // Prevent source code viewing actions
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "F12" ||
      (event.ctrlKey &&
        event.shiftKey &&
        (event.key === "I" || event.key === "J" || event.key === "C")) ||
      (event.ctrlKey && (event.key === "U" || event.key === "u"))
    ) {
      event.preventDefault();
      return false;
    }
  });
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    return false;
  });
  document.addEventListener("selectstart", (event) => {
    event.preventDefault();
    return false;
  });
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
  document.querySelectorAll("a").forEach((a) => {
    a.addEventListener("dragstart", (e) => e.preventDefault());
  });
});