const WEBSITE_ADDRESS = "http://localhost/tutorialsWebsite/";

let signBloc = document.querySelector('.signBloc');

let signIn = signBloc.querySelector('.signIn');
let signUp = signBloc.querySelector('.signUp');

let signSwitch = signBloc.querySelector('.touchSwitch');

let inputs = document.querySelectorAll('input');

//Custom label for all inputs
for(let i = 0; i < inputs.length ; i++) {
    let element = inputs[i];
    let title = element.dataset.title;

    if(title == undefined) continue;

    let label = document.querySelector(`.${element.dataset.class}`);

    element.addEventListener('focusin', () => {
        label.classList.add('active');
    })

    element.addEventListener('focusout', () => {
        if(element.value == "") {
            label.classList.remove('active');
        }
    })
}

//Switch between sign in and sign up
let switchSignBloc = () => {

    if(signIn.classList.contains('active')) {
        signIn.classList.remove('active')
        signUp.classList.add('active');
    } else {
        signIn.classList.add('active');
        signUp.classList.remove('active');
    }

    signIn.reset();
    signUp.reset();

    if(signSwitch.classList.contains('active')) {
        signSwitch.classList.remove('active');
    }

}

signSwitch.addEventListener('click', switchSignBloc);

//Forms submition
//Sign in
signIn.addEventListener('submit', (e) => {

    e.preventDefault();
    let email = signIn.querySelector('#signin_email').value;
    let password = signIn.querySelector('#signin_password').value;

    let errorMsg = "";

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {

        //Email given is invalid
        errorMsg = "- Email given is invalid";
    }

    if(password.length < 8) {

        //Password given too short
        errorMsg = errorMsg == "" ? "- Password should be at least 8 characters long" : errorMsg + "<br>" + "- Password should be at least 8 characters long";
    }

    if(email.length == 0 || password.length == 0) errorMsg = "- Please fill all the fields";

    if(errorMsg != "") {

        let modal = signBloc.querySelector('.modal .errors').parentElement.parentElement;
        modal.classList.add('active');
        modal.querySelector('.errorText').innerHTML = errorMsg;

    } else {

        let loader = document.querySelector('.loader').parentElement.parentElement;
        loader.classList.add('active');

        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4 && xhr.status == 200) {

                let data = JSON.parse(xhr.responseText);
                
                let code = data['code'];
                let result = data['result'];

                if(code == '003') {

                    //User logged in
                    setTimeout(() => {
                        
                        loader.classList.remove('active');

                        loader.addEventListener('transitionend', () => {

                            window.location.replace('./test.php');
                        })


                    }, 2000);

                } else {

                    setTimeout(() => {
                        
                        loader.classList.remove('active');

                        loader.addEventListener('transitionend', () => {

                            let modal = signBloc.querySelector('.modal .errors').parentElement.parentElement;
                            modal.classList.add('active');
                            modal.querySelector('.errorText').innerHTML = '- '+ result;
                        })


                    }, 1000);

                }

                
            }
        }

        xhr.open("POST", WEBSITE_ADDRESS + "api/user/signin.php" );
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('user_email='+ email +'&user_password='+ password); 

    }

})

//Sign up
signUp.addEventListener('submit', (e) => {

    e.preventDefault();
    let name = signUp.querySelector('#signup_name').value;
    let email = signUp.querySelector('#signup_email').value;
    let password = signUp.querySelector('#signup_password').value;

    let errorMsg = "";
    
    if(name.length < 6) {

        //Password given too short
        errorMsg = "- Name given is too short";
    }

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {

        //Email given is invalid
        errorMsg = errorMsg == "" ? "- Email given is invalid" : errorMsg + "<br>" + "- Email given is invalid";
    }

    if(password.length < 8) {

        //Password given too short
        errorMsg = errorMsg == "" ? "- Password should be at least 8 characters long" : errorMsg + "<br>" + "- Password should be at least 8 characters long";
    }

    if(name.length == 0 || email.length == 0 || password.length == 0) errorMsg = "Please fill all the fields";

    if(errorMsg != "") {

        let modal = signBloc.querySelector('.modal .errors').parentElement.parentElement;
        modal.classList.add('active');
        modal.querySelector('.errorText').innerHTML = errorMsg;

    } else {

        let loader = document.querySelector('.loader').parentElement.parentElement;
        loader.classList.add('active');

        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4 && xhr.status == 200) {

                let data = JSON.parse(xhr.responseText);
                
                let code = data['code'];
                let result = data['result'];

                if(code == '004') {

                    //User registered
                    setTimeout(() => {
                        
                        loader.classList.remove('active');

                        loader.addEventListener('transitionend', () => {

                            window.location.replace('./test.php');
                        })


                    }, 2000);

                } else {

                    setTimeout(() => {
                        
                        loader.classList.remove('active');

                        loader.addEventListener('transitionend', () => {

                            let modal = signBloc.querySelector('.modal .errors').parentElement.parentElement;
                            modal.classList.add('active');
                            modal.querySelector('.errorText').innerHTML = '- '+ result;
                        })


                    }, 1000);

                }

                
            }
        }

        xhr.open("POST", WEBSITE_ADDRESS + "api/user/signup.php" );
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('user_name='+ name +'&user_email='+ email +'&user_password='+ password); 

    }

})

//MODALS
//Close modals by clicking on button or esc key

let closeModals = () => {
    document.querySelectorAll('.modal').forEach(modal => {
        if(modal.querySelector('.loader') == null) {
            modal.classList.remove('active');
        }
    })
};

let closeModalsLoaders = () => {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    })
};

document.querySelectorAll('.modal .close').forEach(button => {
    button.addEventListener('click', () => {
        closeModals();
    })
});

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 27) closeModals();
});