'use strict'

class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    get city() {
        return this.#city;
    }

    get email() {
        return this.#email;
    }

    isEqual(otherContact) {
        return (
            this.#name === otherContact.name &&
            this.#city === otherContact.city &&
            this.#email === otherContact.email
        );
    }
}

let contacts = [];

function addContact() {
    const input = document.querySelector('.contactIn').value;
    const errorMessage = document.querySelector('.errorMes');
    errorMessage.innerText = 'Please input comma-separated values';
    errorMessage.classList.remove('error'); 

    const [name, city, email] = input.split(',').map(item => item.trim());

    if (!name || !validateName(name)) {
        errorMessage.innerText = 'Please enter a valid name (letters, spaces, hyphens, and apostrophes allowed).';
        errorMessage.classList.add('error');
        return;
    }

    if (!city || !validateCity(city)) {
        errorMessage.innerText = 'Please enter a valid city (letters, spaces, hyphens, and apostrophes allowed).';
        errorMessage.classList.add('error');
        return;
    }

    if (!email || !validateEmail(email)) {
        errorMessage.innerText = 'Please enter a valid email address.';
        errorMessage.classList.add('error');
        return;
    }

    const newContact = new Contact(name, city, email);

    if (isDuplicateContact(newContact)) {
        errorMessage.innerText = 'This contact already exists.';
        errorMessage.classList.add('error');
        return;
    }

    contacts.unshift(newContact);
    document.querySelector('.contactIn').value = '';
    listContacts();
}

function isDuplicateContact(newContact) {
    return contacts.some(contact => contact.isEqual(newContact));
}

function listContacts() {
    const container = document.querySelector('.contact-list');
    container.innerHTML = '';  

    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact-card';
        contactDiv.innerHTML = `
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>City:</strong> ${contact.city}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
        `;

        contactDiv.addEventListener('click', () => {
            contactDiv.classList.add('deleted');
            deleteContact(index, contactDiv);  
        });

        container.appendChild(contactDiv);
    });

    updateContactCount();
}

function updateContactCount() {
    const countElement = document.querySelector('.contact-Count');
    if (contacts.length === 0) {
        countElement.innerText = 'No contacts saved.';
    } else {
        countElement.innerText = `Number of saved contacts: ${contacts.length}`;
    }
}

function deleteContact(index, contactDiv) {
    contactDiv.classList.add('deleted');  
    
    setTimeout(() => {
        contacts.splice(index, 1);

        contactDiv.remove();

        updateContactCount();
        
        listContacts();
    }, 300);  
}

function validateName(name) {
    const nameRegex = /^[a-zA-Zàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿāāēēīīōōūū' -]+$/;
    return nameRegex.test(name);
}

function validateCity(city) {
    const cityRegex = /^[a-zA-Zàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿāāēēīīōōūū' -]+$/;
    return cityRegex.test(city);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
