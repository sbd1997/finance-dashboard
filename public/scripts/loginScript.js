// Elementos del DOM
const elements = {
  tabs: {
    login: document.getElementById('loginTab'),
    register: document.getElementById('registerTab')
  },
  forms: {
    login: document.getElementById('loginForm'),
    register: document.getElementById('registerForm')
  },
  links: {
    showLogin: document.getElementById('showLogin'),
    showRegister: document.getElementById('showRegister')
  },
  errorMessages: {
    login: document.getElementById('error-message'),
    register: document.getElementById('error-message-register')
  }
};

// Funciones de utilidad
const utils = {
  showElement: (element) => element.classList.add('active'),
  hideElement: (element) => element.classList.remove('active'),
  showError: (element, message, duration = 3000) => {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => element.style.display = 'none', duration);
  },
  handleResponse: async (response, successRedirect, errorElement) => {
    const data = await response.json();
    if (response.status !== 200) {
      utils.showError(errorElement, data.message);
    } else {
      window.location.href = data.redirect || successRedirect;
    }
  }
};

// Controlador de formularios
const formHandler = {
  showLoginForm: () => {
    utils.showElement(elements.tabs.login);
    utils.hideElement(elements.tabs.register);
    utils.showElement(elements.forms.login);
    utils.hideElement(elements.forms.register);
  },
  
  showRegisterForm: () => {
    utils.showElement(elements.tabs.register);
    utils.hideElement(elements.tabs.login);
    utils.showElement(elements.forms.register);
    utils.hideElement(elements.forms.login);
  },
  
  handleLogin: async (e) => {
    e.preventDefault();
    const formData = {
      username: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    };
    
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      await utils.handleResponse(response, '/', elements.errorMessages.login);
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      utils.showError(elements.errorMessages.login, 'Hubo un error al procesar la solicitud');
    }
  },
  
  handleRegister: async (e) => {
    e.preventDefault();
    const formData = {
      username: document.getElementById("registerName").value,
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value
    };
    
    try {
      const response = await fetch('/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      await utils.handleResponse(response, '/', elements.errorMessages.register);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      utils.showError(elements.errorMessages.register, 'Hubo un error al procesar el registro');
    }
  }
};

// Event listeners
elements.tabs.login.addEventListener('click', formHandler.showLoginForm);
elements.tabs.register.addEventListener('click', formHandler.showRegisterForm);
elements.links.showLogin.addEventListener('click', formHandler.showLoginForm);
elements.links.showRegister.addEventListener('click', formHandler.showRegisterForm);
elements.forms.login.addEventListener('submit', formHandler.handleLogin);
elements.forms.register.addEventListener('submit', formHandler.handleRegister);