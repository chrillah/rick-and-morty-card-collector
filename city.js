/* GLOBAL VARIABLES */

const addNewElement = document.querySelector('#add-new-city-element')
const backFromAddNew = document.querySelector('#back-from-add-new')
const searchAfterCities = document.querySelector('#search-after-cities')
const backFromSearch = document.querySelector('#back-from-search')

const formPost = document.querySelector('#form-post')
const nameInput = document.querySelector('#name-input')
const populationInput = document.querySelector('#population-input')

const send = document.querySelector('#send')

const formSearch = document.querySelector('#form-search')
const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')

// DISPLAY RESULT CONTAINER
const displayCityContainer = document.querySelector('#display-city-container')
const displayListContainer = document.querySelector('#display-list-container')
const displayCityList = document.querySelector('#display-city-list')

// ERROR MESSAGE
const errorMessage = document.querySelector('#error-message')
const addErrorMessage = document.querySelector('#add-error-message')
const nameError = document.querySelector('#name-error')
const populationError = document.querySelector('#population-error')

// CITY LIST
const cities = []
listFromStorage = []

/* ------------------------------- */

/* CLASSLIST */
nameInput.classList.add('user-input')
populationInput.classList.add('user-input')
send.classList.add('btn')

searchButton.classList.add('btn')
searchInput.classList.add('user-input')

/* ------------------------------- */

/* START CONDITIONS */
backFromAddNew.style.display = 'none'
backFromSearch.style.display = 'none'
formPost.style.display = 'none'
send.style.opacity = 0;

formSearch.style.display = 'none'
searchButton.style.opacity = 0

addErrorMessage.style.display = 'none'

/* ------------------------------- */

/* API */
const url = `https://avancera.app/cities/`

// FILL LOCALSTORAGE WITH CITIES
fetch(url).then(response => response.json()).then(data => {
    for (let i = 0; i < data.length; i++){
        cities.push(data[i])
    }

    localStorage.setItem('city-element', JSON.stringify(cities))
})
listFromStorage = JSON.parse(localStorage.getItem('city-element'))

/* ------------------------------- */

/* FUNCTIONS */
function refresh(){
    location.reload()
}

// CITY OBJECT CREATOR
function cityElementObjectCreator(data){

    const cityItemContainer = document.createElement('div')
    cityItemContainer.classList.add('city-item-container')
    displayCityContainer.appendChild(cityItemContainer)

    const itemSelectContainer = document.createElement('div')
    itemSelectContainer.classList.add('item-select-container')
    cityItemContainer.appendChild(itemSelectContainer)
    itemSelectContainer.style.opacity = 0;

    const editButton = document.createElement('input')
    editButton.classList.add('btn')
    editButton.type = 'button'
    editButton.value = 'Ändra'

    const deleteButton = document.createElement('input')
    deleteButton.classList.add('btn')
    deleteButton.type = 'button'
    deleteButton.value = 'Ta bort'


    const exitButton = document.createElement('input')
    exitButton.classList.add('btn')
    exitButton.type = 'button'
    exitButton.value = 'Avbryt'

    // ja och nej knapper till delete
    const yesRemove = document.createElement('input')
    yesRemove.classList.add('btn')
    yesRemove.classList.add('yes')
    yesRemove.type = 'button'
    yesRemove.value = 'Ja'

    const noRemove = document.createElement('input')
    noRemove.classList.add('btn')
    noRemove.classList.add('no')
    noRemove.type = 'button'
    noRemove.value = 'Nej'

    // lägger till knapparna i select-avdelningen
    itemSelectContainer.appendChild(editButton)
    itemSelectContainer.appendChild(deleteButton)
    itemSelectContainer.appendChild(exitButton)
    itemSelectContainer.appendChild(yesRemove)
    itemSelectContainer.appendChild(noRemove)

    // start condition
    exitButton.style.display = 'none'
    yesRemove.style.display = 'none'
    noRemove.style.display = 'none'
    
    // city-information
    const cityInformationContainer = document.createElement('div')
    cityItemContainer.appendChild(cityInformationContainer)
    cityInformationContainer.classList.add('city-information-container')
    const cityName = document.createElement('p')
    //cityName.classList.add('city-item')
    cityName.classList.add('city-header')
    cityInformationContainer.appendChild(cityName)
    cityName.textContent = data.name

    const cityPopulation = document.createElement('p')
    cityPopulation.classList.add('city-item')
    cityInformationContainer.appendChild(cityPopulation)
    cityPopulation.textContent = 'Invånare: '+data.population

    cityItemContainer.addEventListener('mouseover',()=>{
        itemSelectContainer.style.opacity = 1;
    })

    cityItemContainer.addEventListener('mouseout',()=>{
        itemSelectContainer.style.opacity = 0;
    })

    // NÄR MAN GÅR IN I EDIT
    const editCityContainer = document.createElement('div')
    editCityContainer.classList.add('edit-city-container')
    cityItemContainer.appendChild(editCityContainer)
    editCityContainer.style.display = 'none'

    // Input field from user
    const newNameInput = document.createElement('input')
    newNameInput.classList.add('user-input')
    editCityContainer.appendChild(newNameInput)
    const newPopulationInput = document.createElement('input')
    newPopulationInput.classList.add('user-input')
    editCityContainer.appendChild(newPopulationInput)
    

    const patchCity = document.createElement('input')
    patchCity.classList.add('btn')
    patchCity.type = 'button'
    patchCity.value = 'Uppdatera'
    editCityContainer.appendChild(patchCity)

    newNameInput.placeholder = data.name
    newPopulationInput.placeholder = data.population

    let newName = ''
    let newPopulation = 0

    // går in i edit-mode
    editButton.addEventListener('click',()=>{
        // Displays
        exitButton.style.display = 'grid'
        editCityContainer.style.display = 'grid'

        // None-display
        editButton.style.display = 'none'
        deleteButton.style.display = 'none'
        cityInformationContainer.style.display = 'none'
    })

    // lämnar edit-mode
    function exitEdit(){
        // Displays
        editButton.style.display = 'grid'
        cityInformationContainer.style.display = 'grid'
        deleteButton.style.display = 'block'

        // None-display
        editCityContainer.style.display = 'none'
        exitButton.style.display = 'none'
    }
    exitButton.addEventListener('click', exitEdit)

    newNameInput.addEventListener('input',()=>{
        if(newNameInput){
            newName = newNameInput.value
        } 
    })

    newPopulationInput.addEventListener('input',()=>{
        if(newPopulationInput.value){
            newPopulation = parseInt(newPopulationInput.value)
        }
    })

    // FIXA!!! innerHtml
    patchCity.addEventListener('click', ()=>{

        let listName = childFromDisplayListName(data)
        function documentations(){
            if(newPopulation && !newName){
                cityPopulation.textContent = 'Invånare: '+newPopulation
                return JSON.stringify({
                    population : newPopulation
                })
            }
            if(newName && !newPopulation){
                cityName.textContent = newName
                listName.textContent = newName
                return JSON.stringify({
                    name : newName ,
                })
            }
            if(newName && newPopulation){
                cityName.textContent = newName
                cityPopulation.textContent = newPopulation
                listName.textContent = newName
                return JSON.stringify({
                    name : newName ,population : newPopulation
                })
            }
        }
        fetch(url+data.id,{
            body : documentations(),
            headers : {'Content-Type' : 'application/json'},
            method : 'PATCH'
        })
        // .then(response=>{
        //     console.log(response)
        // })
        console.log('PATCH')
        exitEdit()
    })

    // FUNKAR
    deleteButton.addEventListener('click', ()=>{
        deleteButton.style.display = 'none'
        editButton.style.display = 'none'
        yesRemove.style.display = 'block'
        noRemove.style.display = 'block'
    })
    
    yesRemove.addEventListener('click',()=>{
        displayCityContainer.removeChild(cityItemContainer)
        for(let i = 0; i < listFromStorage.length; i++){
            if(listFromStorage[i].name === data.name){
                listFromStorage.splice(i, data.name)
            }
        }

        fetch(url+data.id,{
        method:'DELETE'
        }).then(response=>{
            console.log(response)
            refresh()
        })
        console.log('DELETE')
    })
    
    noRemove.addEventListener('click', ()=>{
        deleteButton.style.display = 'block'
        editButton.style.display = 'block'
        yesRemove.style.display = 'none'
        noRemove.style.display = 'none'
    })
}

/* ------------------------------- */


/* EVENTS */




/* ------------------------------- */





/* KOLLA UPP SECTIONS! */
let inputName = ''
let inputPopulation = 0

function inputPopulationValue(){
    inputPopulation = parseInt(populationInput.value)
}
function inputNameValue(){
    inputName = nameInput.value
}

// FUNKAR EJ
/* GUARDFUNCTION */
function isNameInputPass(){
    if(nameInput.value === ''){
        nameError.style.display = 'inline-block'
    }
    if(nameInput.value){
        nameError.style.display = 'none'
    }
}
function isPopulationInputPass(){
    if(!inputPopulation){
        populationError.style = 'inline-block'
    }
    if(inputPopulation){
        populationError.style.display = 'none'
    }
}

// FUNKAR EJ?
function displayErrorMessage(){
    if(populationError.style.display === 'none' && nameError.style.display === 'none'){
        addErrorMessage.style.display = 'none'
        send.style.opacity = 1;
    }
    if(populationError.style.display === 'inline-block' || nameError.style.display === 'inline-block'){
        addErrorMessage.style.display = 'block'
        send.style.opacity = 0;
    }
}

nameInput.addEventListener('input', ()=>{
    displayErrorMessage()
    inputNameValue()
    isNameInputPass()
})
populationInput.addEventListener('input',()=>{
    displayErrorMessage()
    inputPopulationValue()
    isPopulationInputPass()
})

// Form section

// Search after a city

/* display */
//const getCities = document.querySelector('#get-cities')
//const refreshButton = document.querySelector('#refresh-button')



// TODO! KOLLA FÖRST VAD MAN FÅR FÖR VÄRDE FRÅN INPUT
// Error message




// Start conditions


/* USER-INPUT */


// city element create function

// POST - New city

function addNewMode(){
    removeAllCityObjects()
    formPost.style.display = 'grid'
    backFromAddNew.style.display = 'block'
    addErrorMessage.style.display = 'block'

    addNewElement.style.display = 'none'
    searchAfterCities.style.display = 'none'
    //getCities.style.display = 'none'
    //refreshButton.style.display = 'none'
}

addNewElement.addEventListener('click', addNewMode)

function defaultFromAdd(){
    //getCities.style.display = 'inline-block'
    addNewElement.style.display = 'inline-block'
    searchAfterCities.style.display = 'inline-block'
    //refreshButton.style.display = 'inline-block'

    formPost.style.display = 'none'
    backFromAddNew.style.display = 'none'
    addErrorMessage.style.display = 'none'
}

backFromAddNew.addEventListener('click', defaultFromAdd)

// Remove all city object elements
function removeAllCityObjects(){
    while(displayCityContainer.firstChild){
        displayCityContainer.firstChild.remove()
    }
}

// Remove all in list
function removeAllInList(){
    while(displayCityList.firstChild){
        displayCityList.firstChild.remove()
    }
}

// Search after cities
function searchMode(){
    removeAllCityObjects()
    // while(displayCityContainer.firstChild){
    //     displayCityContainer.firstChild.remove()
    // }

    formSearch.style.display = 'grid'
    backFromSearch.style.display = 'block'

    addNewElement.style.display = 'none'
    searchAfterCities.style.display = 'none'
    //getCities.style.display = 'none'
    refreshButton.style.display = 'none'
}
searchAfterCities.addEventListener('click', searchMode)

function defaultFromSearch(){
    //getCities.style.display = 'inline-block'
    addNewElement.style.display = 'inline-block'
    searchAfterCities.style.display = 'inline-block'
    //refreshButton.style.display = 'inline-block'

    formSearch.style.display = 'none'
    backFromSearch.style.display = 'none'
}

backFromSearch.addEventListener('click', defaultFromSearch)

/* POST */
formPost.addEventListener('submit',(event)=>{
    event.preventDefault()
    fetch(url,{
        body: JSON.stringify({
            name : inputName,
            population : inputPopulation
        }),
        headers : {'Content-Type' : 'application/json'},
        method : 'POST'
    }).then(resp => resp.json()).then(data =>{
        for(let i = 0; i < data.length; i++){
            if(data[i].name === inputName){
                createCityListItem(data)
            }
        }
    })
    console.log('POST')
    defaultFromAdd()
})

/* GET-ANROP Hämtar alla cities*/
// getCities.addEventListener('click', ()=>{
//     fetch(url)
//     .then(resp=>resp.json())
//     .then(result=>{
//         result.forEach(element => {
//             cityElementObjectCreator(element)
//         })
//     })
//     console.log('GET')
// })

/* SEARCH CITY */
function searchInputPass(){
    if(searchInput){
        searchButton.style.opacity = 1
    }
    if(!searchInput.value){
        searchButton.style.opacity = 0
    }
}

function getCity(value){
    fetch(url+`?name=${value}`)
    .then(response => response.json())
    .then(result =>{
        console.log('GET')
        result.forEach(element => {
            cityElementObjectCreator(element)
        })
    })
    .catch(()=>{
        errorMessage.innerHTML = `
        <p class="get-error">Oops! Kunde inte hitta ${value}</p`
    })
    defaultFromSearch()
}

searchInput.addEventListener('input', ()=>{
    inputPopulationValue()
    searchInputPass()
})

searchButton.addEventListener('click', ()=>{
    getCity(searchInput.value)
})

// TODO get fetch
// display-city-list-item
function createCityListItem(){
    removeAllInList()
    fetch(url).then(response=>response.json())
    .then(data=>{
        for (let i = 0; i < data.length;i++){
            const cityListItem = document.createElement('li')
            // fixa detta för patchCity strong delen funkar inte
            cityListItem.innerHTML = `
            <li class="city-list-item list-btn">
                <p class="list-name">${data[i].name}</p>
            </li>`
    
            displayCityList.appendChild(cityListItem)
    
            cityListItem.addEventListener('click',()=>{
                removeAllCityObjects()
                cityElementObjectCreator(data[i])
            })
        }
    })
}
createCityListItem()

// ORIGINAL
// function createCityListItem(data){
//     for (let i = 0; i < data.length;i++){
//         const cityListItem = document.createElement('li')
//         cityListItem.innerHTML = `
//         <li class="city-list-item list-btn">${data[i].name}</li>`

//         displayCityList.appendChild(cityListItem)

//         cityListItem.addEventListener('click',()=>{
//             removeAllCityObjects()
//             cityElementObjectCreator(data[i])
//         })
//     }
// }
// createCityListItem(listFromStorage)


// find children from displayCityList -- funkar inte....
function childFromDisplayListPopulation(data){
    let child
    for (let i = 0; i <displayCityList.querySelectorAll('.list-population').length;i++){
        if(displayCityList.querySelectorAll('.list-population')[i].textContent === data.population){
            child = displayCityList.querySelectorAll('.list-population')[i]
            console.log(child.textContent)
        }
    }
    return child
}

//Fixa Strong delen
function childFromDisplayListName(data){
    let child
    for (let i = 0; i <displayCityList.querySelectorAll('.list-name').length;i++){
        if(displayCityList.querySelectorAll('.list-name')[i].textContent === data.name){
            child = displayCityList.querySelectorAll('.list-name')[i]
            console.log(child.textContent)
        }
    }
    return child
}

function removeChildFromList(child){
    displayCityList.removeChild(child)
}

