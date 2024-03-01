$(()=>{

    $('#login-register').click((event)=>{
        event.preventDefault();

        switch (event.target.id) {
            case 'login-button':
                $('#login').css('display', 'block');
                $('#register').css('display', 'none');
                break;
            case 'register-button':
                $('#login').css('display', 'none');
                $('#register').css('display', 'block');
                break;
            case 'register-submit':
                var username = $("#register [name='username']").val();

                if (localStorage.getItem(username)) {
                    alert('Sorry! This username is already in use. Try a different username');
                } else {
                    var user = {
                        email: $("#register [name='email']").val(),
                        name: $("#register [name='name']").val(),
                        lastname: $("#register [name='lastname']").val(),
                        dni: $("#register [name='dni']").val(),
                        age: $("#register [name='age']").val(),
                        password: $("#register [name='password']").val()
                    };

                    localStorage.setItem(username, JSON.stringify(user));
                    $('#register-form')[0].reset();
                    $('#register').hide();
                    $('#login').show();

                    alert('You have signed up successfully!');

                    location.reload();
                }

                break;

            case 'login-submit':
                let usernameLogin = $("#login [name='username']").val();
                let passwordLogin = $("#login [name='password']").val();
                login(usernameLogin, passwordLogin);
                break;

            default:
                console.log('default');
                break;
        }
    });
});

function login(username, password) {
    let user = JSON.parse(localStorage.getItem(username));
    if (user) {
        if (user.password === password) {
            alert('Login successful');
            localStorage.setItem('currentUsername', username);
            window.location.assign("../html/cats.html");
        } else {
            alert('The password is incorrect. Please try again.');
        }
    } else {
        alert('The username does not exist. Please try again.');
    }
}



function disableNextInput(nextInput) {
    if (!$(nextInput).prop('disabled')) {
        $(nextInput).prop('disabled', true);
    }
}

function validateNextField(inputName, nextInputName) {
    var input = $("#register [name='" + inputName + "']");
    var nextInput = $("#register [name='" + nextInputName + "']");

        if (input[0].validity.typeMismatch) { // Si el tipo de dato no es el correcto
            input[0].setCustomValidity(inputName + ' not valid');
            input[0].reportValidity();
            disableNextInput(nextInput); 
        } else if (input[0].validity.patternMismatch) { // Si no cumple el patrón
            input[0].setCustomValidity(inputName + ' not valid');
            input[0].reportValidity();
            disableNextInput(nextInput);
        } else if (input[0].validity.rangeUnderflow) { // Si el valor es menor que el mínimo (edad)
            input[0].setCustomValidity(inputName + ' not valid');
            input[0].reportValidity();
            disableNextInput(nextInput);
        } else if (input[0].validity.valueMissing) { // Si el campo está vacío
            input[0].setCustomValidity(inputName + ' is required');
            input[0].reportValidity();
            disableNextInput(nextInput);
        }else {
        input[0].setCustomValidity('');
        nextInput.prop('disabled', false);
    }
}

$("#register [name='username']").on('input', () => validateNextField('username', 'email'));
$("#register [name='email']").on('input', () => validateNextField('email', 'name'));
$("#register [name='name']").on('input', () => validateNextField('name', 'lastname'));
$("#register [name='lastname']").on('input', () => validateNextField('lastname', 'dni'));
$("#register [name='dni']").on('input', () => validateNextField('dni', 'age'));
$("#register [name='age']").on('input', () => validateNextField('age', 'password'));
$("#register [name='password']").on('input', () => validateNextField('password', 'submit'));
