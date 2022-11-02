const url = `https://avancera.app/cities/`

// Functions
function refresh(){
    location.reload()
}

// Select option container
const addNewElement = document.querySelector('#add-new-city-element')
const backFromAddNew = document.querySelector('#back-from-add-new')
const searchAfterCities = document.querySelector('#search-after-cities')
const backFromSearch = document.querySelector('#back-from-search')
backFromAddNew.style.display = 'none'
backFromSearch.style.display = 'none'

// Form section
const formPost = document.querySelector('#form-post')
const nameInput = document.querySelector('#name-input')
const populationInput = document.querySelector('#population-input')
nameInput.classList.add('user-input')
populationInput.classList.add('user-input')
const send = document.querySelector('#send')
send.classList.add('btn')
formPost.style.display = 'none'
send.disabled = true

// Search after a city
const formSearch = document.querySelector('#form-search')
const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')
searchInput.classList.add('user-input')
formSearch.style.display = 'none'
searchButton.disabled = true

/* TEST AREA */
const displayContainer = document.querySelector('#display-container')
const getCities = document.querySelector('#get-cities')
const refreshButton = document.querySelector('#refresh-button')
const errorMessage = document.querySelector('#error-message')
errorMessage.style.display = 'none'
const nameError = document.querySelector('#name-error')
const populationError = document.querySelector('#population-error')


// Start conditions
let inputName = ''
let inputPopulation = ''

/* USER-INPUT */
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
function inputPopulationValue(){
    inputPopulation = parseInt(populationInput.value)
}
function inputNameValue(){
    inputName = nameInput.value
}
/* GUARDFUNCTION */
function isNameInputPass(){
    if(nameInput.value === ''){
        nameError.style.display = 'block'
    }
    if(nameInput.value){
        nameError.style.display = 'none'
    }
}
function isPopulationInputPass(){
    if(!inputPopulation){
        populationError.style = 'block'
    }
    if(inputPopulation){
        populationError.style.display = 'none'
    }
}
function displayErrorMessage(){
    if(populationError.style.display === 'none' && nameError.style.display === 'none'){
        errorMessage.style.display = 'none'
        send.disabled = false
    }
    else{
        errorMessage.style.display = 'block'
        send.disabled = true
    }
}

// city element create function
function cityElementObjectCreator(data){

    const cityItemContainer = document.createElement('div')
    cityItemContainer.classList.add('city-item-container')
    displayContainer.appendChild(cityItemContainer)

    const itemSelectContainer = document.createElement('div')
    itemSelectContainer.classList.add('item-select-container')
    cityItemContainer.appendChild(itemSelectContainer)

    const editButton = document.createElement('input')
    editButton.classList.add('btn')
    editButton.type = 'button'
    editButton.value = 'Edit'

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
    yesRemove.type = 'button'
    yesRemove.value = 'Ja'

    const noRemove = document.createElement('input')
    noRemove.classList.add('btn')
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
    const cityName = document.createElement('h3')
    cityName.classList.add('city-item')
    cityInformationContainer.appendChild(cityName)
    cityName.textContent = data.name

    const cityPopulation = document.createElement('p')
    cityPopulation.classList.add('city-item')
    cityInformationContainer.appendChild(cityPopulation)
    cityPopulation.textContent = data.population


    // NÄR MAN GÅR IN I EDIT
    const editCityContainer = document.createElement('div')
    cityItemContainer.appendChild(editCityContainer)
    editCityContainer.style.display = 'none'

    // Input field from user
    const newNameInput = document.createElement('input')
    //newNameInput.classList.add('new-input-information')
    newNameInput.classList.add('user-input')
    editCityContainer.appendChild(newNameInput)
    const newPopulationInput = document.createElement('input')
    //newPopulationInput.classList.add('new-input-information')
    newPopulationInput.classList.add('user-input')
    editCityContainer.appendChild(newPopulationInput)
    

    const patchCity = document.createElement('input')
    patchCity.classList.add('btn')
    patchCity.type = 'button'
    patchCity.value = 'Skicka in ändring'
    editCityContainer.appendChild(patchCity)

    newNameInput.placeholder = data.name
    newPopulationInput.placeholder = data.population

    // går in i edit-mode
    editButton.addEventListener('click',()=>{
        console.log('Enter Edit')
        // Displays
        exitButton.style.display = 'block'
        editCityContainer.style.display = 'block'

        // None-display
        editButton.style.display = 'none'
        deleteButton.style.display = 'none'
        cityName.style.display = 'none'
        cityPopulation.style.display = 'none'
    })

    // lämnar edit-mode
    exitButton.addEventListener('click', ()=>{
        console.log('Lämnar Edit')
        // Displays
        editButton.style.display = 'block'
        cityName.style.display = 'inline-block'
        cityPopulation.style.display = 'inline-block'
        deleteButton.style.display = 'block'

        // None-display
        editCityContainer.style.display = 'none'
        exitButton.style.display = 'none'
    })

    // FUNKAR
    deleteButton.addEventListener('click', ()=>{
        deleteButton.style.display = 'none'
        editButton.style.display = 'none'
        yesRemove.style.display = 'block'
        noRemove.style.display = 'block'
    })

    yesRemove.addEventListener('click',()=>{
        console.log(data.id)
        fetch(`https://avancera.app/cities/${data.id}`,{
        method:'DELETE'
        }).then(response=>{
            console.log(response)
            refresh()
        })
    })

    noRemove.addEventListener('click', ()=>{
        deleteButton.style.display = 'block'
        editButton.style.display = 'block'
        yesRemove.style.display = 'none'
        noRemove.style.display = 'none'
    })

    patchCity.addEventListener('click', ()=>{
        // LÄgg in input från användaren


        // SE ÖVER
        // let newName = ''
        // let newPopulation = null

        // if(newNameInput){
        //     newName = newNameInput.value
        // } if(newNameInput === null && newNameInput === '') {
        //     newName = cityName.textContent
        // }if(parseInt(newPopulationInput.value)){
        //     newPopulation = parseInt(newPopulationInput.value)
        // } if(parseInt(newPopulationInput.value) === null) {
        //     newPopulation = cityPopulation.textContent
        // }

        let newName = newNameInput.value
        let newPopulation = parseInt(newPopulationInput.value)

        // PATCH
        fetch(url+`${data.id}`,{
        body : JSON.stringify({
            name : newName ,
            population : newPopulation
        }),
            headers : {'Content-Type' : 'application/json'},
            method : 'PATCH'
        }).then(response=>{
            console.log(response)
        })
        console.log('PATCH')

        editButton.style.display = 'block'
        editCityContainer.style.display = 'none'
        cityName.style.display = 'inline-block'
        cityPopulation.style.display = 'inline-block'

        // NYA UPPGIFTER
        cityName.textContent = newName
        cityPopulation.textContent = newPopulation
    })
}

// Add new element btn
addNewElement.addEventListener('click',()=>{
    formPost.style.display = 'block'
    backFromAddNew.style.display = 'block'
    errorMessage.style.display = 'block'

    addNewElement.style.display = 'none'
    searchAfterCities.style.display = 'none'
    getCities.style.display = 'none'
    refreshButton.style.display = 'none'
})

backFromAddNew.addEventListener('click', ()=>{
    getCities.style.display = 'inline-block'
    addNewElement.style.display = 'inline-block'
    searchAfterCities.style.display = 'inline-block'
    refreshButton.style.display = 'inline-block'

    formPost.style.display = 'none'
    backFromAddNew.style.display = 'none'
    errorMessage.style.display = 'none'
})

// Search after cities
searchAfterCities.addEventListener('click', ()=>{
    formSearch.style.display = 'block'
    backFromSearch.style.display = 'block'

    addNewElement.style.display = 'none'
    searchAfterCities.style.display = 'none'
    getCities.style.display = 'none'
    refreshButton.style.display = 'none'
})

backFromSearch.addEventListener('click', ()=>{
    getCities.style.display = 'inline-block'
    addNewElement.style.display = 'inline-block'
    searchAfterCities.style.display = 'inline-block'
    refreshButton.style.display = 'inline-block'

    formSearch.style.display = 'none'
    backFromSearch.style.display = 'none'
})

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
    })
    console.log('POST')
})

/* GET-ANROP Hämtar alla cities*/
getCities.addEventListener('click', ()=>{
    fetch(url)
    .then(resp=>resp.json())
    .then(result=>{
        console.log('GET')
        result.forEach(element => {
            cityElementObjectCreator(element)
        })
    })
})

/* SEARCH CITY */
function searchInputPass(){
    if(searchInput){
        searchButton.disabled = false
    }
    if(!searchInput){
        searchButton.disabled = true
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
}

searchInput.addEventListener('input', ()=>{
    inputPopulationValue()
    searchInputPass()
})

searchButton.addEventListener('click', ()=>{
    getCity(searchInput.value)
})

// delete function

function deleteCity(data){
    fetch(`https://avancera.app/cities/${data.id}`,{
        method:'DELETE'
        }).then(response=>{
            console.log(response)
            refresh()
        })
}