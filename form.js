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
const result = document.querySelector('#result')
const getCities = document.querySelector('#get-cities')
const errorMessage = document.querySelector('#error-message')
const nameError = document.querySelector('#name-error')
const populationError = document.querySelector('#population-error')

// errorMessage.style.display = 'none'
// nameError.style.display = 'none'
send.disabled = true

/* TEST AREA */

/* variabler till databasen*/
let inputName = ''
let inputPopulation = ''

// todo Göra ett naken form för att ta emot ett värde från användaren
/* 

Fetch

PATCH-anrop */


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

// city element create funtion

function cityElementObjectCreator(){
    let cityElement = document.createElement('div')
    cityElement.classList.add('result-container')
    result.appendChild(cityElement)
    cityElement.innerHTML = `<p class="testP">${inputName}</p> <p class="testP">${inputPopulation}</p>`
}

/* POST */
formPost.addEventListener('submit',(event)=>{
    event.preventDefault()

    fetch('https://avancera.app/cities/',{
        body: JSON.stringify({
            name : inputName,
            population : inputPopulation
        }),
        headers : {'Content-Type' : 'application/json'},
        method : 'POST'
    })
    console.log('POST')

    /* TESTNING */
    cityElementObjectCreator()
    /* TESTNING */
})


/* GET-ANROP */
getCities.addEventListener('click', ()=>{
    fetch('https://avancera.app/cities/')
    .then(resp=>resp.json())
    .then(result=>{
        localStorage.setItem('cities', JSON.stringify(result))
    })

    let arrayOfCities = []
    arrayOfCities = JSON.parse(localStorage.getItem('cities'))

    arrayOfCities.forEach(element => {
        let cityElement = document.createElement('div')
        let idContainer = document.createElement('p')
        cityElement.classList.add('result-container')
        result.appendChild(cityElement)
        cityElement.appendChild(idContainer)
        cityElement.innerHTML = `<p class="testP">${element.name}</p> <p class="testP">${element.population}</p>`
        idContainer.textContent = element.id
        idContainer.style.display = 'none'
    })
})


/* SEARCH CITY */
searchButton.disabled = true

function searchInputPass(){
    if(searchInput){
        searchButton.disabled = false
    }
    if(!searchInput){
        searchButton.disabled = true
    }
}

searchInput.addEventListener('input', ()=>{
    inputPopulationValue()
    searchInputPass()
    console.log(searchInput.value)
})


// FRÅGA RICHARD / MAGNUS VARFÖR FUNKAR INTE DET HÄR?!?!
// formSearch.addEventListener('submit', (event)=>{
//     event.preventDefault()
//     fetch(`https://avancera.app/cities/?name=${searchInput.value}`)
//     .then(response => response.json())
//     .then(result =>{
//         console.log(result)
//     })

//     console.log('GET')
// })

searchButton.addEventListener('click', ()=>{
    fetch(`https://avancera.app/cities/?name=${searchInput.value}`)
    .then(response => response.json())
    .then(result =>{
        localStorage.setItem('citiesSearched', JSON.stringify(result))
    })

    let arrayOfCities = []
    arrayOfCities = JSON.parse(localStorage.getItem('citiesSearched'))

    arrayOfCities.forEach(element => {
        let cityElement = document.createElement('div')
        let idContainer = document.createElement('p')
        cityElement.classList.add('result-container')
        result.appendChild(cityElement)
        cityElement.appendChild(idContainer)
        cityElement.innerHTML = `<p class="testP">${element.name}</p> <p class="testP">${element.population}</p>`
        idContainer.textContent = element.id
        idContainer.style.display = 'none'
    })
})
/* EDIT CITY */

/* DELETE CITY */




// testobject
// let testObjekt = [
//     {
//         name: 'Christopher',
//         age : 37
//     }
//     ,
//     {
//         name: 'Linda',
//         age : 36
//     }
//     ,
//     {
//         name: 'Jimmy',
//         age : 33
//     }
//     ,
//     {
//         name: 'Maritha',
//         age : 59
//     }
// ]

// for(let i = 0; i <testObjekt.length;i++){
//     //console.log(testObjekt[i])
//     let testElement3 = document.createElement('div')
//     document.body.appendChild(testElement3)
//     testElement3.style = 'height: 80px; width: 200px; background-color: green; margin: 1rem 0; padding: 1rem'
//     testElement3.innerHTML = `<h3>${testObjekt[i].name}</h3>`
//     const secretContainer1 = document.createElement('div')
//     testElement3.appendChild(secretContainer1)
//     secretContainer1.textContent = `${testObjekt[i].age}`
//     secretContainer1.style.display = "none"

//     testElement3.addEventListener('click', ()=>{
//         console.log(secretContainer1.textContent)
//     })
// }