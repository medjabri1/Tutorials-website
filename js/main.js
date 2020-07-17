let signBloc = document.querySelector('.signBloc');

let signIn = signBloc.querySelector('.signIn');
let signUp = signBloc.querySelector('.signUp');

let signSwitch = signBloc.querySelector('.touchSwitch');

let inputs = document.querySelectorAll('input');

for(let i = 0; i < inputs.length ; i++) {
    let element = inputs[i];
    let title = element.dataset.title;

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