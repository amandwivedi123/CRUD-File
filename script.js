
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const genderSelect = document.getElementById('gender');
const occupationInput = document.getElementById('occupation');
const submitBtn = document.getElementById('submit');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopup');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');

let transportRadioButtons = document.querySelectorAll('input[name="transport"]');
console.log(transportRadioButtons)

let educationRadioButtons = document.querySelectorAll('input[name="education"]');



let data = [];


function createData() {
    const dataObject = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
        gender: genderSelect.value,
        occupation: occupationInput.value,
    };
    return dataObject;
}

submitBtn.addEventListener('click', () => {
    const dataObject = createData();
    data.push(dataObject);
    displayData(dataObject);
    popup.style.display = 'none';
});

function displayData(dataObject) {
    const popupName = document.getElementById('popupName');
    const popupEmail = document.getElementById('popupEmail');
    const popupPhone = document.getElementById('popupPhone');
    const popupAddress = document.getElementById('popupAddress');
    const popupGender = document.getElementById('popupGender');
    const popupOccupation = document.getElementById('popupOccupation');



    popupName.textContent = dataObject.name;
    popupEmail.textContent = dataObject.email;
    popupPhone.textContent = dataObject.phone;
    popupAddress.textContent = dataObject.address;
    popupGender.textContent = dataObject.gender;
    popupOccupation.textContent = dataObject.occupation;
}
editBtn.addEventListener('click', () => {
    const dataObject = data[data.length - 1];
    editData(dataObject);
    popup.style.display = 'none';
});

closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});
function editData(dataObject) {
    nameInput.value = dataObject.name;
    emailInput.value = dataObject.email;
    phoneInput.value = dataObject.phone;
    addressInput.value = dataObject.address;
    genderSelect.value = dataObject.gender;
    occupationInput.value = dataObject.occupation;
}

function deleteData(dataObject) {
    const index = data.indexOf(dataObject);
    if (index !== -1) {
        data.splice(index, 1);
    }
    popup.style.display = 'none';
}

deleteBtn.addEventListener('click', () => {
    const dataObject = data[data.length - 1];
    deleteData(dataObject);
});

closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});


function getSelectedTransport() {
    let selectedTransport = "";
    transportRadioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            selectedTransport = radioButton.value;
        }
    });
    return selectedTransport;
}

function getSelectedEducation() {
    let selectedEducation = '';
    educationRadioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            selectedEducation = radioButton.value;
        }
    });
    return selectedEducation;
}


function getSelectedTransport() {
    for (let i = 0; i < transportRadioButtons.length; i++) {
        if (transportRadioButtons[i].checked) {
            return transportRadioButtons[i].value;
        }
    }
}

// Function to get the selected education value
function getSelectedEducation() {
    for (let i = 0; i < educationRadioButtons.length; i++) {
        if (educationRadioButtons[i].checked) {
            return educationRadioButtons[i].value;
        }
    }
}

function displayValues() {
    document.getElementById('popupTransport').textContent = getSelectedTransport();
    document.getElementById('popupEducation').textContent = getSelectedEducation();


    let popupTransportRadioButtons = document.querySelectorAll('.popup-transport input[name="popupTransport"]');
    let popupEducationRadioButtons = document.querySelectorAll('.popup-education input[name="popupEducation"]');

    for (let i = 0; i < popupTransportRadioButtons.length; i++) {
        if (popupTransportRadioButtons[i].value === getSelectedTransport()) {
            popupTransportRadioButtons[i].checked = true;
        }
    }

    for (let i = 0; i < popupEducationRadioButtons.length; i++) {
        if (popupEducationRadioButtons[i].value === getSelectedEducation()) {
            popupEducationRadioButtons[i].checked = true;
        }
    }
}

// Function to create a new popup
function createNewPopup(dataObject) {
    const popupContainer = document.getElementById('popup-container');
    const newPopup = document.createElement('div');
    newPopup.classList.add('popup');
    newPopup.style.display = 'block'; // Show the popup by default
    newPopup.innerHTML = `
        
        <p>Name: <span id="popupName">${dataObject.name}</span></p>
        <p>Email: <span id="popupEmail">${dataObject.email}</span></p>
        <p>Phone: <span id="popupPhone">${dataObject.phone}</span></p>
        <p>Address: <span id="popupAddress">${dataObject.address}</span></p>
        <p>Gender: <span id="popupGender">${dataObject.gender}</span></p>
        <p>Occupation: <span id="popupOccupation">${dataObject.occupation}</span></p>
        <p>Transport: <span id="popupTransport"></span></p>
        <p>Education: <span id="popupEducation"></span></p>
      
        <button id="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button id="deleteBtn"><i class="fa-solid fa-trash"></i></button>
    `;
    popupContainer.appendChild(newPopup);



    const newPopupTransport = newPopup.querySelector('#popupTransport');
    const newPopupEducation = newPopup.querySelector('#popupEducation');
    const newEditBtn = newPopup.querySelector('#editBtn');
    const newDeleteBtn = newPopup.querySelector('#deleteBtn');


    newEditBtn.addEventListener('click', () => {
        editData(dataObject);
        newPopup.style.display = 'none';
    });
    newDeleteBtn.addEventListener('click', () => {
        deleteData(dataObject);
        newPopup.style.display = 'none';
    });

    // Display the transport and education values
    newPopupTransport.textContent = getSelectedTransport();
    newPopupEducation.textContent = getSelectedEducation();

    // Position the new popup beside the old one
    const previousPopup = popupContainer.children[popupContainer.children.length - 2];
    if (previousPopup) {
        newPopup.style.top = previousPopup.offsetTop + 'px';
        newPopup.style.left = (previousPopup.offsetLeft + previousPopup.offsetWidth) + 'px';
    }
}

// Update the submit button event listener to create a new popup
submitBtn.addEventListener('click', () => {
    const dataObject = createData();
    data.push(dataObject);
    createNewPopup(dataObject);
});
let submit = document.getElementById('submit')
submit.addEventListener('click', displayValues);