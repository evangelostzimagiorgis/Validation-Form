
const form = document.querySelector('form');
const modal = document.querySelector('.modal-wrapper');
const modalsubmit = document.querySelector('.modal-submit');


// Patterns with Regular Expressions

const patterns = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    username: /^[a-z0-9]{6,12}$/,
    password: /^[\w@-]{8,20}$/,
    telephone: /^\d{10}$/
};


// Status for the fields

let status = {
    email: false,
    username: false,
    password: false,
    telephone: false
};


// Validate Function for the fields

const validate = (key, field, result) => {
    if (result === true){
        form[field].className = 'success';
        status[field] = true;
    } else if (key == ""){
        form[field].classList.remove('error');
        form[field].className = 'form-control';
        status[field] = false;
    } else {
        form[field].className = 'error';
        status[field] = false;
    }
}


// Event Listener every time we are typing in the fields

form.addEventListener('keyup', e => {
    if(e.target.classList[0] === 'btn') {
        return null
    }
    const key = e.target.value;
    const field = e.target.id;
    const result = patterns[field].test(key);
    validate(key, field, result);
})


// Modal after the validation

form.addEventListener('submit', e => {
    e.preventDefault(); 

    modal.style.display = 'block';
    const btn = `<button class="close-modal btn-primary" style="border-radius: 5px; padding: .375rem .75rem;" onClick='closeModal()'>Close</button>`
    modalsubmit.innerHTML = (status.email && status.username && status.password && status.telephone)?(`
        <div style="color:green">
            <h5> The form complited successfully! </h5>
            <hr>
            <p>Email: ${form.email.value}</p>
            <p>username: ${form.username.value}</p>
            <p>Password: *********</p>
            <p>Telepone: ${form.telephone.value}</p>
            <hr>
            ${btn}
        </div>
        `):(`
        <div style="color: red">
            <h5> The form has not validated! </h5>
            <p> There are problems with the following fields</p>
            <hr>
            ${status.email?(""):(`<p>Email: ${form.email.value}</p>`)}
            ${status.username?(""):(`<p>Username: ${form.username.value}</p>`)}
            ${status.password?(""):(`<p>Password: ${form.password.value}</p>`)}
            ${status.telephone?(""):(`<p>telephone: ${form.telephone.value}</p>`)}
            <hr>
            ${btn}
        </div>
    `)
})


// Close modal when we press the button 'close'

const closeModal = () => {
    modal.style.display = 'none';
    if(status.email && status.username && status.password && status.telephone) {
        resetForm();
    }
}


// Close modal when we press outside the modal

modal.addEventListener('click', (e) => {
    if(e.target.classList.value === 'modal-wrapper'){
        modal.style.display = 'none';
        if(status.email && status.username && status.password && status.telephone) {
            resetForm();
        }
    }
    
})

// Reset form 

const resetForm = () => {
    status = {
        email: false,
        username: false,
        password: false,
        telephone: false
    };

    form.email.classList.remove('success');
    form.email.className = 'form-control';

    form.username.classList.remove('success');
    form.username.className = 'form-control';

    form.password.classList.remove('success');
    form.password.className = 'form-control';

    form.telephone.classList.remove('success');
    form.telephone.className = 'form-control';

    form.reset();
}
