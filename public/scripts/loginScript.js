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
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Inicio de sesión exitoso');
            // Aquí iría la lógica real de autenticación
        });

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registro exitoso');
            // Aquí iría la lógica real de registro
            // Después del registro, podemos mostrar el formulario de login
            showLoginForm();
        });