// // Get elements
// const nameInput = document.getElementById('name');
// const emailInput = document.getElementById('email');
// const phoneInput = document.getElementById('phone');
// const addressInput = document.getElementById('address');
// const genderSelect = document.getElementById('gender');
// const occupationInput = document.getElementById('occupation');
// const transportRadioButtons = document.querySelectorAll('input[name="transport"]');
// const educationRadioButtons = document.querySelectorAll('input[name="education"]');
// const submitBtn = document.getElementById('submit');
// const popupContainer = document.getElementById('popup-container');
// const searchInput = document.getElementById('search-input');
// const searchBtn = document.getElementById('search-btn');

// // Initialize data array
// let data = [];

// // Function to create data object
// function createData() {
//     const dataObject = {
//         name: nameInput.value,
//         email: emailInput.value,
//         phone: phoneInput.value,
//         address: addressInput.value,
//         gender: genderSelect.value,
//         occupation: occupationInput.value,
//         transport: getSelectedTransport(),
//         education: getSelectedEducation(),
//     };
//     return dataObject;
// }

// // Function to get selected transport value
// function getSelectedTransport() {
//     for (let i = 0; i < transportRadioButtons.length; i++) {
//         if (transportRadioButtons[i].checked) {
//             return transportRadioButtons[i].value;
//         }
//     }
// }

// // Function to get selected education value
// function getSelectedEducation() {
//     for (let i = 0; i < educationRadioButtons.length; i++) {
//         if (educationRadioButtons[i].checked) {
//             return educationRadioButtons[i].value;
//         }
//     }
// }

// // Function to create new popup
// function createNewPopup(dataObject) {
//     const newPopup = document.createElement('div');
//     newPopup.classList.add('popup');
//     newPopup.style.display = 'block';
//     newPopup.innerHTML = `
//         <p>Name: <span id="popupName">${dataObject.name}</span></p>
//         <p>Email: <span id="popupEmail">${dataObject.email}</span></p>
//         <p>Phone: <span id="popupPhone">${dataObject.phone}</span></p>
//         <p>Address: <span id="popupAddress">${dataObject.address}</span></p>
//         <p>Gender: <span id="popupGender">${dataObject.gender}</span></p>
//         <p>Occupation: <span id="popupOccupation">${dataObject.occupation}</span></p>
//         <p>Transport: <span id="popupTransport">${dataObject.transport}</span></p>
//         <p>Education: <span id="popupEducation">${dataObject.education}</span></p>
//         <button id="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
//         <button id="deleteBtn"><i class="fa-solid fa-trash"></i></button>
//     `;
//     popupContainer.appendChild(newPopup);

//     const newEditBtn = newPopup.querySelector('#editBtn');
//     const newDeleteBtn = newPopup.querySelector('#deleteBtn');
//     newDeleteBtn.addEventListener('click', () => {
//         deleteData(dataObject);
//         newPopup.style.display = 'none';
//     });

//     newEditBtn.addEventListener('click', () => {
//         editPopup(dataObject);
//     });
// }

// // Function to edit popup
// function editPopup(dataObject) {
//     // Populate input fields with data
//     nameInput.value = dataObject.name;
//     emailInput.value = dataObject.email;
//     phoneInput.value = dataObject.phone;
//     addressInput.value = dataObject.address;
//     genderSelect.value = dataObject.gender;
//     occupationInput.value = dataObject.occupation;

//     // Check the corresponding transport radio button
//     transportRadioButtons.forEach((radioButton) => {
//         if (radioButton.value === dataObject.transport) {
//             radioButton.checked = true;
//         }
//     });

//     // Check the corresponding education radio button
//     educationRadioButtons.forEach((radioButton) => {
//         if (radioButton.value === dataObject.education) {
//             radioButton.checked = true;
//         }
//     });

//     // Scroll to the basic form
//     const formContainer = document.querySelector('.container');
//     formContainer.scrollIntoView({ behavior: 'smooth' });
// }

// // Function to delete data
// function deleteData(dataObject) {
//     const storedData = retrieveDataFromLocalStorage();
//     const index = storedData.findIndex((data) => {
//         return (
//             data.name === dataObject.name &&
//             data.email === dataObject.email &&
//             data.phone === dataObject.phone &&
//             data.address === dataObject.address &&
//             data.gender === dataObject.gender &&
//             data.occupation === dataObject.occupation
//         );
//     });
//     if (index !== -1) {
//         storedData.splice(index, 1);
//         storeDataInLocalStorage(storedData);
//     }
// }

// // Function to filter data
// function filterData(searchTerm) {
//     const filteredData = data.filter((dataObject) => {
//         return (
//             dataObject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             dataObject.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             dataObject.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             dataObject.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             dataObject.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             dataObject.occupation.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     });
//     return filteredData;
// }

// // Function to display filtered data
// function displayFilteredData(filteredData) {
//     popupContainer.innerHTML = '';
//     filteredData.forEach((dataObject) => {
//         createNewPopup(dataObject);

//     });
// }

// // Function to store data in local storage
// function storeDataInLocalStorage(data) {
//     localStorage.setItem('data', JSON.stringify(data));
// }

// // Function to retrieve data from local storage
// function retrieveDataFromLocalStorage() {
//     const storedData = localStorage.getItem('data');
//     if (storedData) {
//         return JSON.parse(storedData);
//     } else {
//         return [];
//     }
// }

// // Function to clear input fields
// function clearInputFields() {
//     nameInput.value = '';
//     emailInput.value = '';
//     phoneInput.value = '';
//     addressInput.value = '';
//     genderSelect.value = '';
//     occupationInput.value = '';
//     transportRadioButtons.forEach((radioButton) => {
//         radioButton.checked = false;
//     });
//     educationRadioButtons.forEach((radioButton) => {
//         radioButton.checked = false;
//     });
// }

// // Event listeners
// submitBtn.addEventListener('click', () => {
//     const dataObject = createData();
//     data.push(dataObject);
//     storeDataInLocalStorage(data);
//     createNewPopup(dataObject);
//     clearInputFields();
// });



// searchInput.addEventListener('keyup', () => {
//     const searchTerm = searchInput.value.trim();
//     if (searchTerm) {
//         const filteredData = filterData(searchTerm);
//         displayFilteredData(filteredData);
//     } else {
//         const storedData = retrieveDataFromLocalStorage();
//         displayFilteredData(storedData);
//     }
// });

// // Retrieve data from local storage when the page loads
// const storedData = retrieveDataFromLocalStorage();
// if (storedData.length > 0) {
//     storedData.forEach((data) => {
//         createNewPopup(data);
//     });
// }
// // Function to display all popups
// function displayAllPopups() {
//     const storedData = retrieveDataFromLocalStorage();
//     if (storedData.length > 0) {
//         storedData.forEach((dataObject) => {
//             createNewPopup(dataObject);
//         });
//     }
// }

// // Event listeners
// window.addEventListener('load', () => {
//     displayAllPopups();
// });

// // Function to delete data
// function deleteData(dataObject) {
//     const storedData = retrieveDataFromLocalStorage();
//     const index = storedData.findIndex((data) => {
//         return (
//             data.name === dataObject.name &&
//             data.email === dataObject.email &&
//             data.phone === dataObject.phone &&
//             data.address === dataObject.address &&
//             data.gender === dataObject.gender &&
//             data.occupation === dataObject.occupation
//         );
//     });
//     if (index !== -1) {
//         storedData.splice(index, 1);
//         storeDataInLocalStorage(storedData);
//         popupContainer.innerHTML = '';
//         displayAllPopups();
//     }
// }

// // // Function to display filtered popups
// // function displayFilteredPopups(filteredData) {
// //     popupContainer.innerHTML = '';
// //     filteredData.forEach((dataObject) => {
// //         createNewPopup(dataObject);
// //     });
// // }

// // Event listeners
// searchInput.addEventListener('input', () => {
//     const searchTerm = searchInput.value.trim().toLowerCase();
//     if (searchTerm) {
//         const storedData = retrieveDataFromLocalStorage();
//         const filteredData = storedData.filter((dataObject) => {
//             if (dataObject) {
//                 return (
//                     dataObject.name?.toLowerCase().includes(searchTerm) ||
//                     dataObject.email?.toLowerCase().includes(searchTerm) ||
//                     dataObject.phone?.toLowerCase().includes(searchTerm) ||
//                     dataObject.address?.toLowerCase().includes(searchTerm) ||
//                     dataObject.gender?.toLowerCase().includes(searchTerm) ||
//                     dataObject.occupation?.toLowerCase().includes(searchTerm) ||
//                     dataObject.transport?.toLowerCase().includes(searchTerm) ||
//                     dataObject.education?.toLowerCase().includes(searchTerm)
//                 );
//             } else {
//                 return false;
//             }
//         });
//         displayFilteredData(filteredData);
//     } else {
//         const storedData = retrieveDataFromLocalStorage();
//         displayFilteredData(storedData);
//     }
// });





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

// Initialize data array
let data = [];

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

// Event listeners
submitBtn.addEventListener('click', () => {
    const dataObject = createData();
    data.push(dataObject);
    storeDataInLocalStorage(data);
    createNewPopup(dataObject);
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
        const storedData = retrieveDataFromLocalStorage();
        popupContainer.innerHTML = '';
        storedData.forEach((dataObject) => {
            createNewPopup(dataObject);
        });
    }
});

// Retrieve data from local storage when the page loads
const storedData = retrieveDataFromLocalStorage();
if (storedData.length > 0) {
    storedData.forEach((data) => {
        createNewPopup(data);
    });
}