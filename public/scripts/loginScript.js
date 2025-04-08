// Elementos del DOM
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showLogin = document.getElementById('showLogin');
const showRegister = document.getElementById('showRegister');

// Mostrar formulario de login
function showLoginForm() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
}

// Mostrar formulario de registro
function showRegisterForm() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
}

// Event listeners para las pestañas
loginTab.addEventListener('click', showLoginForm);
registerTab.addEventListener('click', showRegisterForm);

// Event listeners para los enlaces de alternancia
showLogin.addEventListener('click', showLoginForm);
showRegister.addEventListener('click', showRegisterForm);

// Manejo de envío de formularios (ejemplo)
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        // Enviar datos al backend usando fetch
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password })
        });
        // Obtener la respuesta del servidor
    const data = await response.json();

    // Si la respuesta no es exitosa (status no es 200), mostrar el mensaje de error
    if (response.status !== 200) {
      document.getElementById('error-message').textContent = data.message;
      document.getElementById('error-message').style.display = 'block';

      // Hacer que el mensaje desaparezca después de 3 segundos
      setTimeout(() => {
        document.getElementById('error-message').style.display = 'none';
      }, 3000); // 3000 milisegundos = 3 segundos
      
    } else {
      // Si la respuesta es exitosa, redirigir a la página principal
      window.location.href = data.redirect;
    }

  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    // Si ocurre un error en la comunicación con el servidor
    document.getElementById('error-message').textContent = 'Hubo un error al procesar la solicitud';
    document.getElementById('error-message').style.display = 'block';
  }
});

registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    //captura de valores de formulario de registro
    const username = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    //perticion al servidor con los datos del formulario
    try {
        // Enviar datos al backend usando fetch
        const response = await fetch('/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password})
        });

    //esperar la respuesta del servidor
    const data = await response.json();

    // Si la respuesta no es exitosa (status !== 200), mostrar mensaje de error
    if (response.status !== 200) {
        document.getElementById('error-message-register').textContent = data.message;
        document.getElementById('error-message-register').style.display = 'block';
  
        // Desaparecer el mensaje después de 3 segundos
        setTimeout(() => {
          document.getElementById('error-message-register').style.display = 'none';
        }, 3000);
  
    } else {
      // Si la respuesta es exitosa, redirigir a la página principal
      window.location.href = data.redirect;
    }

      
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Si ocurre un error en la comunicación con el servidor
        document.getElementById('error-message-register').textContent = 'Hubo un error al procesar el registro';
        document.getElementById('error-message-register').style.display = 'block';
    
        setTimeout(() => {
          document.getElementById('error-message-register').style.display = 'none';
        }, 3000);
      }
    
    showLoginForm();
});