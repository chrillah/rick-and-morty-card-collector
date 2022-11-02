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
const displayContainer = document.querySelector('#display-container')
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

    const cityItemContainer = document.createElement('div')
    cityItemContainer.classList.add('city-item-container')
    displayContainer.appendChild(cityItemContainer)

    const itemSelectContainer = document.createElement('div')
    itemSelectContainer.classList.add('item-select-container')
    cityItemContainer.appendChild(itemSelectContainer)

    const editButton = document.createElement('input')
    editButton.type = 'button'
    editButton.value = 'Edit'

    const deleteButton = document.createElement('input')
    deleteButton.type = 'button'
    deleteButton.value = 'Ta bort'


    const exitButton = document.createElement('input')
    exitButton.type = 'button'
    exitButton.value = 'Avbryt'

    // ja och nej knapper till delete
    const yesRemove = document.createElement('input')
    yesRemove.type = 'button'
    yesRemove.value = 'Ja'

    const noRemove = document.createElement('input')
    noRemove.type = 'button'
    noRemove.value = 'Nej'

    itemSelectContainer.appendChild(editButton)
    itemSelectContainer.appendChild(deleteButton)
    itemSelectContainer.appendChild(exitButton)
    itemSelectContainer.appendChild(yesRemove)
    itemSelectContainer.appendChild(noRemove)

    exitButton.style.display = 'none'
    yesRemove.style.display = 'none'
    noRemove.style.display = 'none'
    
    const cityName = document.createElement('h3')
    const cityPopulation = document.createElement('p')
    cityName.classList.add('city-item')
    cityPopulation.classList.add('city-item')
    cityItemContainer.appendChild(cityName)
    cityItemContainer.appendChild(cityPopulation)


    // NÄR MAN GÅR IN I EDIT
    const editCityContainer = document.createElement('div')
    cityItemContainer.appendChild(editCityContainer)
    editCityContainer.style.display = 'none'

    //const enterChangeSection = document.createElement('input')
    //editCityContainer.appendChild(enterChangeSection)
    //enterChangeSection.type = 'button'
    //enterChangeSection.value = 'Ändra'

    const changeSection = document.createElement('div')
    const newNameInput = document.createElement('input')
    const newPopulationInput = document.createElement('input')
    const patchCity = document.createElement('input')


    
    
    
    editCityContainer.appendChild(changeSection)

    //
    changeSection.appendChild(newNameInput)
    changeSection.appendChild(newPopulationInput)
    changeSection.appendChild(patchCity)

    changeSection.style.display = 'none'
    
    patchCity.type = 'button'
    patchCity.value = 'Skicka in ändring'

    cityName.textContent = data.name
    cityPopulation.textContent = data.population
    newNameInput.placeholder = data.name
    newPopulationInput.placeholder = data.population

    // går in i edit-mode
    editButton.addEventListener('click',()=>{
        console.log('Enter Edit')
        editButton.style.display = 'none'
        exitButton.style.display = 'block'

        
        editCityContainer.style.display = 'block'
        deleteButton.style.display = 'none'
        cityName.style.display = 'none'
        cityPopulation.style.display = 'none'
        changeSection.style.display = 'block'
        //enterChangeSection.style.display = 'none'
    })

    // lämnar edit-mode
    exitButton.addEventListener('click', ()=>{
        console.log('Lämnar Edit')
        editButton.style.display = 'block'
        editCityContainer.style.display = 'none'
        changeSection.style.display = 'none'
        //enterChangeSection.style.display = 'inline-block'
        cityName.style.display = 'inline-block'
        cityPopulation.style.display = 'inline-block'
        deleteButton.style.display = 'block'
        exitButton.style.display = 'none'
    })

    // Går in i för att ändra värden i namn och invånare
    // enterChangeSection.addEventListener('click', ()=>{
    //     cityName.style.display = 'none'
    //     cityPopulation.style.display = 'none'
    //     changeSection.style.display = 'block'
    //     enterChangeSection.style.display = 'none'
    // })

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
        changeSection.style.display = 'none'
        //enterChangeSection.style.display = 'inline-block'
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

// delete function

function deleteCity(data){
    fetch(`https://avancera.app/cities/${data.id}`,{
        method:'DELETE'
        }).then(response=>{
            console.log(response)
            refresh()
        })
}