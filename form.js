const url = `https://avancera.app/cities/`

// Functions
function refresh(){
    location.reload()
}

// Form section
const formPost = document.querySelector('#form-post')
const nameInput = document.querySelector('#name-input')
const populationInput = document.querySelector('#population-input')
const send = document.querySelector('#send')

// Search after a city
const formSearch = document.querySelector('#form-search')
const searchButton = document.querySelector('#search-button')
const searchInput = document.querySelector('#search-input')

/* TEST AREA */
const displayResult = document.querySelector('#display-result')
const getCities = document.querySelector('#get-cities')
const errorMessage = document.querySelector('#error-message')
const nameError = document.querySelector('#name-error')
const populationError = document.querySelector('#population-error')


// Start conditions
send.disabled = true
searchButton.disabled = true
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

    const cityElement = document.createElement('div')

    const cityName = document.createElement('h3')
    const cityPopulation = document.createElement('p')
    const editButton = document.createElement('input')

    const editCitySection = document.createElement('div')
    const exitButton = document.createElement('input')
    const deleteButton = document.createElement('input')
    const enterChangeSection = document.createElement('input')

    const changeSection = document.createElement('div')
    const newNameInput = document.createElement('input')
    const newPopulationInput = document.createElement('input')
    const patchCity = document.createElement('input')

    editCitySection.style.display = 'none'

    cityElement.classList.add('result-container')
    cityElement.appendChild(cityName)
    cityElement.appendChild(cityPopulation)
    displayResult.appendChild(cityElement)
    cityElement.appendChild(editCitySection)
    cityElement.appendChild(editButton)
    editCitySection.appendChild(exitButton)
    editCitySection.appendChild(enterChangeSection)
    editCitySection.appendChild(changeSection)
    changeSection.appendChild(newNameInput)
    changeSection.appendChild(newPopulationInput)
    changeSection.appendChild(patchCity)
    changeSection.appendChild(deleteButton)

    changeSection.style.display = 'none'
    
    editButton.type = 'button'
    editButton.value = 'Edit'
    exitButton.type = 'button'
    exitButton.value = 'Avbryt'
    deleteButton.type = 'button'
    deleteButton.value = 'Ta bort'
    enterChangeSection.type = 'button'
    enterChangeSection.value = 'Ändra'
    patchCity.type = 'button'
    patchCity.value = 'Skicka in ändring'

    cityName.textContent = data.name
    cityPopulation.textContent = data.population
    newNameInput.placeholder = data.name
    newPopulationInput.placeholder = data.population

    // går in i edit-mode
    editButton.addEventListener('click',()=>{
        editButton.style.display = 'none'
        editCitySection.style.display = 'block'
    })

    // lämnar edit-mode
    exitButton.addEventListener('click', ()=>{
        editButton.style.display = 'block'
        editCitySection.style.display = 'none'
        changeSection.style.display = 'none'
        enterChangeSection.style.display = 'inline-block'
        cityName.style.display = 'inline-block'
        cityPopulation.style.display = 'inline-block'
    })

    // Går in i för att ändra värden i namn och invånare
    enterChangeSection.addEventListener('click', ()=>{
        cityName.style.display = 'none'
        cityPopulation.style.display = 'none'
        changeSection.style.display = 'block'
        enterChangeSection.style.display = 'none'
    })

    // FUNKAR
    deleteButton.addEventListener('click', ()=>{
        console.log(data.id)
        fetch(`https://avancera.app/cities/${data.id}`,{
        method:'DELETE'
        }).then(response=>{
            console.log(response)
            refresh()
        })
    })

    patchCity.addEventListener('click', ()=>{
        // LÄgg in input från användaren


        // SE ÖVER
        // let newName = ''
        // let newPopulation = null

        // if(newNameInput.value){
        //     newName = newNameInput.value
        // } else {
        //     newName = cityName.textContent
        // }if(newPopulationInput.value){
        //     newPopulation = parseInt(newPopulationInput.value)
        // } else {
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
        editCitySection.style.display = 'none'
        changeSection.style.display = 'none'
        enterChangeSection.style.display = 'inline-block'
        cityName.style.display = 'inline-block'
        cityPopulation.style.display = 'inline-block'

        // NYA UPPGIFTER
        cityName.textContent = newName
        cityPopulation.textContent = newPopulation
    })
}

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