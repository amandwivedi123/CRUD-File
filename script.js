
// Get elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const genderSelect = document.getElementById('gender');
const occupationInput = document.getElementById('occupation');
const transportRadioButtons = document.querySelectorAll('input[name="transport"]');
const educationRadioButtons = document.querySelectorAll('input[name="education"]');
const submitBtn = document.getElementById('submit');
const popupContainer = document.getElementById('popup-container');
const searchInput = document.getElementById('search-input');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageLinks = document.querySelectorAll('.page-link');

// Initialize data array
let data = [];
let currentPage = 1;
let itemsPerPage = 3;

// Function to create data object
function createData() {
    const dataObject = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
        gender: genderSelect.value,
        occupation: occupationInput.value,
        transport: getSelectedTransport(),
        education: getSelectedEducation(),
    };
    return dataObject;
}

// Function to get selected transport value
function getSelectedTransport() {
    for (let i = 0; i < transportRadioButtons.length; i++) {
        if (transportRadioButtons[i].checked) {
            return transportRadioButtons[i].value;
        }
    }
}

// Function to get selected education value
function getSelectedEducation() {
    for (let i = 0; i < educationRadioButtons.length; i++) {
        if (educationRadioButtons[i].checked) {
            return educationRadioButtons[i].value;
        }
    }
}

// Function to create new popup
function createNewPopup(dataObject) {
    const newPopup = document.createElement('div');
    newPopup.classList.add('popup');
    newPopup.style.display = 'block';
    newPopup.innerHTML = `
        <p>Name: <span id="popupName">${dataObject.name}</span></p>
        <p>Email: <span id="popupEmail">${dataObject.email}</span></p>
        <p>Phone: <span id="popupPhone">${dataObject.phone}</span></p>
        <p>Address: <span id="popupAddress">${dataObject.address}</span></p>
        <p>Gender: <span id="popupGender">${dataObject.gender}</span></p>
        <p>Occupation: <span id="popupOccupation">${dataObject.occupation}</span></p>
        <p>Transport: <span id="popupTransport">${dataObject.transport}</span></p>
        <p>Education: <span id="popupEducation">${dataObject.education}</span></p>
         <button id="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button id="deleteBtn"><i class="fa-solid fa-trash"></i></button>
    `;
    popupContainer.appendChild(newPopup);

    const newDeleteBtn = newPopup.querySelector('#deleteBtn');
    newDeleteBtn.addEventListener('click', () => {
        deleteData(dataObject);
        newPopup.style.display = 'none';
    });

    const editBtn = newPopup.querySelector('#editBtn');

    editBtn.addEventListener('click', () => {
        editPopup(dataObject);
    });
}

// Function to edit popup
function editPopup(dataObject) {
    // Populate input fields with data
    nameInput.value = dataObject.name;
    emailInput.value = dataObject.email;
    phoneInput.value = dataObject.phone;
    addressInput.value = dataObject.address;
    genderSelect.value = dataObject.gender;
    occupationInput.value = dataObject.occupation;

    // Check the corresponding transport radio button
    transportRadioButtons.forEach((radioButton) => {
        if (radioButton.value === dataObject.transport) {
            radioButton.checked = true;
        }
    });

    // Check the corresponding education radio button
    educationRadioButtons.forEach((radioButton) => {
        if (radioButton.value === dataObject.education) {
            radioButton.checked = true;
        }
    });

    // Scroll to the basic form
    const formContainer = document.querySelector('.container');
    formContainer.scrollIntoView({ behavior: 'smooth' });

    // Delete the old card
    deleteData(dataObject);
}

// Function to delete data
function deleteData(dataObject) {
    const storedData = retrieveDataFromLocalStorage();
    const index = storedData.findIndex((data) => {
        return (
            data.name === dataObject.name ||
            data.email === dataObject.email ||
            data.phone === dataObject.phone ||
            data.address === dataObject.address ||
            data.gender === dataObject.gender ||
            data.occupation === dataObject.occupation
        );
    });
    if (index !== -1) {
        storedData.splice(index, 1);
        storeDataInLocalStorage(storedData);
    }
}

// Function to store data in local storage
function storeDataInLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

// Function to retrieve data from local storage
function retrieveDataFromLocalStorage() {
    const storedData = localStorage.getItem('data');
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return [];
    }
}

// Function to clear input fields
function clearInputFields() {
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    addressInput.value = '';
    genderSelect.value = '';
    occupationInput.value = '';
    transportRadioButtons.forEach((radioButton) => {
        radioButton.checked = false;
    });
    educationRadioButtons.forEach((radioButton) => {
        radioButton.checked = false;
    });
}

// Function to display popups based on current page
function displayPopups() {
    const storedData = retrieveDataFromLocalStorage();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = storedData.slice(startIndex, endIndex);
    popupContainer.innerHTML = '';
    paginatedData.forEach((dataObject) => {
        createNewPopup(dataObject);
    });
}

// Function to update pagination buttons
function updatePaginationButtons() {
    const storedData = retrieveDataFromLocalStorage();
    const totalPages = Math.ceil(storedData.length / itemsPerPage);
    pageLinks.forEach((link) => {
        link.style.display = 'none';
    });
    for (let i = 1; i <= totalPages; i++) {
        const link = document.querySelector(`.page-link[data-page="${i}"]`);
        if (link) {
            link.style.display = 'block';
        } else {
            const newLink = document.createElement('a');
            newLink.classList.add('page-link');
            newLink.href = '#';
            newLink.dataset.page = i;
            newLink.textContent = i;
            pagination.appendChild(newLink);
        }
    }
    const currentPageLink = document.querySelector(`.page-link[data-page="${currentPage}"]`);
    currentPageLink.classList.add('active');
}

// Event listeners
submitBtn.addEventListener('click', () => {
    const dataObject = createData();
    data.push(dataObject);
    storeDataInLocalStorage(data);
    displayPopups();
    updatePaginationButtons();
    clearInputFields();
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        const storedData = retrieveDataFromLocalStorage();
        const filteredData = storedData.filter((dataObject) => {
            if (dataObject) {
                return (
                    dataObject.name?.toLowerCase().includes(searchTerm) ||
                    dataObject.email?.toLowerCase().includes(searchTerm) ||
                    dataObject.phone?.toLowerCase().includes(searchTerm) ||
                    dataObject.address?.toLowerCase().includes(searchTerm) ||
                    dataObject.gender?.toLowerCase().includes(searchTerm) ||
                    dataObject.occupation?.toLowerCase().includes(searchTerm) ||
                    dataObject.transport?.toLowerCase().includes(searchTerm) ||
                    dataObject.education?.toLowerCase().includes(searchTerm)
                );
            } else {
                return false;
            }
        });
        popupContainer.innerHTML = '';
        filteredData.forEach((dataObject) => {
            createNewPopup(dataObject);
        });
    } else {
        displayPopups();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPopups();
        updatePaginationButtons();
    }
});

nextBtn.addEventListener('click', () => {
    const storedData = retrieveDataFromLocalStorage();
    const totalPages = Math.ceil(storedData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayPopups();
        updatePaginationButtons();
    }
});

pageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = parseInt(link.dataset.page);
        displayPopups();
        updatePaginationButtons();
    });
});

prevBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (currentPage > 1) {
        currentPage--;
        displayPopups();
        updatePaginationButtons();
        const previousPageLink = document.querySelector(`.page-link[data-page="${currentPage}"]`);
        previousPageLink.classList.add('active');
        const previousPageLinkSibling = document.querySelector(`.page-link[data-page="${currentPage + 1}"]`);
        previousPageLinkSibling.classList.remove('active');
    }
});

nextBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (currentPage > 1) {
        currentPage++;
        displayPopups();
        updatePaginationButtons();
        const previousPageLink = document.querySelector(`.page-link[data-page="${currentPage}"]`);
        previousPageLink.classList.add('active');
        const previousPageLinkSibling = document.querySelector(`.page-link[data-page="${currentPage + 1}"]`);
        previousPageLinkSibling.classList.remove('active');
    }
});
function changePage(newPage) {
    if (newPage >= 1 && newPage <= Math.ceil(data.length / itemsPerPage)) {
        currentPage = newPage;
        displayPopups();
        updatePaginationButtons();
        const currentPageLink = document.querySelector(`.page-link[data-page="${currentPage}"]`);
        pageLinks.forEach((link) => {
            link.classList.remove('active');
        });
        currentPageLink.classList.add('active');
    }
}

prevBtn.addEventListener('click', () => {
    changePage(currentPage - 1);
});
// Retrieve data from local storage when the page loads
const storedData = retrieveDataFromLocalStorage();
if (storedData.length > 0) {
    data = storedData;
    displayPopups();
    updatePaginationButtons();
}







