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
searchButton.classList.add('btn')
const searchInput = document.querySelector('#search-input')
searchInput.classList.add('user-input')
formSearch.style.display = 'none'
searchButton.disabled = true

/* display */
const displayContainer = document.querySelector('#display-container')
const getCities = document.querySelector('#get-cities')
const refreshButton = document.querySelector('#refresh-button')


// Error message
const errorMessage = document.querySelector('#error-message')
const addErrorMessage = document.querySelector('#add-error-message')
addErrorMessage.style.display = 'none'
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
        console.log('noll input namn')
        nameError.style.display = 'inline-block'
    }
    if(nameInput.value){
        console.log('input namn')
        nameError.style.display = 'none'
    }
}
function isPopulationInputPass(){
    if(!inputPopulation){
        console.log('noll input population')
        populationError.style = 'inline-block'
    }
    if(inputPopulation){
        console.log('input population')
        populationError.style.display = 'none'
    }
}
function displayErrorMessage(){
    if(populationError.style.display === 'none' && nameError.style.display === 'none'){
        addErrorMessage.style.display = 'none'
        send.disabled = false
    }
    if(populationError.style.display === 'inline-block' || nameError.style.display === 'inline-block'){
        addErrorMessage.style.display = 'block'
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
    const cityName = document.createElement('h1')
    cityName.classList.add('city-item')
    cityName.classList.add('city-header')
    cityInformationContainer.appendChild(cityName)
    cityName.textContent = data.name

    const cityPopulation = document.createElement('p')
    cityPopulation.classList.add('city-item')
    cityInformationContainer.appendChild(cityPopulation)
    cityPopulation.textContent = data.population


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
    patchCity.value = 'Skicka in ändring'
    editCityContainer.appendChild(patchCity)

    newNameInput.placeholder = data.name
    newPopulationInput.placeholder = data.population

    let newName = ''
    let newPopulation = 0

    // går in i edit-mode
    editButton.addEventListener('click',()=>{
        console.log('Enter Edit')
        // Displays
        exitButton.style.display = 'block'
        editCityContainer.style.display = 'block'

        // None-display
        editButton.style.display = 'none'
        deleteButton.style.display = 'none'
        cityInformationContainer.style.display = 'none'
    })

    // lämnar edit-mode
    exitButton.addEventListener('click', ()=>{
        console.log('Lämnar Edit')
        // Displays
        editButton.style.display = 'block'
        cityInformationContainer.style.display = 'block'
        deleteButton.style.display = 'block'

        // None-display
        editCityContainer.style.display = 'none'
        exitButton.style.display = 'none'
    })

    newNameInput.addEventListener('input',()=>{
        if(newNameInput){
            newName = newNameInput.value
            console.log(newName)
        } 
    })

    newPopulationInput.addEventListener('input',()=>{
        if(newPopulationInput.value){
            newPopulation = parseInt(newPopulationInput.value)
            console.log(newPopulation)
        }
    })

    patchCity.addEventListener('click', ()=>{
        function documentations(){
            if(newPopulation && !newName){
                cityPopulation.textContent = newPopulation
                return JSON.stringify({
                    population : newPopulation
                })
            }
            if(newName && !newPopulation){
                cityName.textContent = newName
                return JSON.stringify({
                    name : newName ,
                })
            }
            if(newName && newPopulation){
                cityName.textContent = newName
                cityPopulation.textContent = newPopulation
                return JSON.stringify({
                    name : newName ,population : newPopulation
                })
            }
        }
        fetch(url+data.id,{
            body : documentations(),
            headers : {'Content-Type' : 'application/json'},
            method : 'PATCH'
        }).then(response=>{
            console.log(response)
        })
        console.log('PATCH')

        cityInformationContainer.style.display = 'block'
        editButton.style.display = 'block'
        deleteButton.style.display = 'block'

        exitButton.style.display = 'none'
        editCityContainer.style.display = 'none'
    })

    // FUNKAR
    deleteButton.addEventListener('click', ()=>{
        deleteButton.style.display = 'none'
        editButton.style.display = 'none'
        yesRemove.style.display = 'block'
        noRemove.style.display = 'block'
    })
    
    yesRemove.addEventListener('click',()=>{
        //console.log(data.id)
        //displayContainer.removeChild(this)
        fetch(url+data.id,{
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
}

// Add new element btn
addNewElement.addEventListener('click',()=>{
    formPost.style.display = 'grid'
    backFromAddNew.style.display = 'block'
    addErrorMessage.style.display = 'block'

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
    addErrorMessage.style.display = 'none'
})

// Search after cities
searchAfterCities.addEventListener('click', ()=>{
    formSearch.style.display = 'grid'
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
    }).then(resp => resp.json()).then(data =>{
        for(let i = 0; i < data.length; i++){
            if(data[i].name === inputName){
                cityElementObjectCreator(data[i])
            }
        }
    })
    console.log('POST')

    // getCities.style.display = 'inline-block'
    // addNewElement.style.display = 'inline-block'
    // searchAfterCities.style.display = 'inline-block'
    // refreshButton.style.display = 'inline-block'

    // formSearch.style.display = 'none'
    // backFromSearch.style.display = 'none'
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
    .catch(()=>{
        errorMessage.innerHTML = `
        <p class="get-error">Oops! Kunde inte hitta ${value}</p`
    })
}

searchInput.addEventListener('input', ()=>{
    inputPopulationValue()
    searchInputPass()
})

searchButton.addEventListener('click', ()=>{
    getCity(searchInput.value)
})