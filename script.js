
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
    popup.style.display = 'block';
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