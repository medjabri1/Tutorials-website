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

        //Everything is okay
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

        //Everything is okay
    }

})

//MODALS
//Close modals by clicking on button or esc key

let closeModals = () => {
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