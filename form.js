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

send.disabled = true

/* TEST AREA */

/* variabler till databasen*/
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

function cityElementObjectCreator(inputName, inputPopulation){
    let cityElement = document.createElement('div')
    cityElement.classList.add('result-container')
    displayResult.appendChild(cityElement)
    cityElement.innerHTML = `<p class="testP">${inputName}</p> <p class="testP">${inputPopulation}</p>`
}

function editSection(){
    const editContainer = document.createElement('div')
    displayResult.appendChild(editContainer)

    const editName = document.createElement('input')
    const editPopulation = document.createElement('input')

    editName.type = 'text'
    editPopulation.type = 'text'

    editName.setAttribute('id','edit-name')
    editPopulation.setAttribute('id','edit-population')

    editContainer.appendChild(editName)
    editContainer.appendChild(editPopulation)

    editContainer.style.display = 'none'
}

function cityObjectCreator(data){
    const cityElement = document.createElement('div')
    const idContainer = document.createElement('p')
    const editButton = document.createElement('input')

    displayResult.appendChild(cityElement)
    displayResult.appendChild(editButton)
    cityElement.appendChild(idContainer)

    editButton.type = 'button'
    editButton.value = 'EDIT'

    cityElement.classList.add('result-container')

    cityElement.innerHTML = `
    <p class="testP">${data.name}</p> 
    <p class="testP">${data.population}</p>`

    idContainer.textContent = data.id
    idContainer.style.display = 'none'

    const editContainer = document.createElement('div')
    cityElement.appendChild(editContainer)

    const editName = document.createElement('input')
    const editPopulation = document.createElement('input')
    const editNewInput = document.createElement('input')
    const deleteButton = document.createElement('input')
    const exitButton = document.createElement('input')

    editName.type = 'text'
    editPopulation.type = 'text'
    deleteButton.type = 'button'
    exitButton.type = 'button'
    editNewInput.type = 'button'

    // editName.setAttribute('id','edit-name')
    // editPopulation.setAttribute('id','edit-population')

    editContainer.appendChild(editName)
    editContainer.appendChild(editPopulation)
    editContainer.appendChild(exitButton)
    editContainer.appendChild(deleteButton)
    editContainer.appendChild(editNewInput)

    editName.placeholder = data.name
    editPopulation.placeholder = data.population
    deleteButton.value = 'TA BORT'
    exitButton.value = 'GÅ TILLBAKS'
    editNewInput.value = 'ÄNDRA'

    editContainer.style.display = 'none'

    editButton.addEventListener('click', ()=>{
        editContainer.style.display = 'block'
        editButton.style.display = 'none'
    })

    exitButton.addEventListener('click', ()=>{
        editContainer.style.display = 'none'
        editButton.style.display = 'block'
    })

    deleteButton.addEventListener('click', ()=>{
        console.log(data.id)
        fetch(`https://avancera.app/cities/${data.id}`,{
        method:'DELETE'
        }).then(response=>{
            console.log(response)
        })
    })

    editNewInput.addEventListener('click', ()=>{
        let newName = editName.value
        let newPopulation = parseInt(editPopulation.value)
        console.log(newName)
        console.log(newPopulation)
        
        fetch(`https://avancera.app/cities/${data.id}`,{
        body : JSON.stringify({
            name : newName ,
            population : newPopulation
        }),
            headers : {'Content-Type' : 'application/json'},
            method : 'PATCH'
        }).then(response=>{
            console.log(response)
        })

        cityElementObjectCreator(newName, newPopulation)
    })
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
    cityElementObjectCreator(inputName, inputPopulation)
    /* TESTNING */
})


/* GET-ANROP */
getCities.addEventListener('click', ()=>{
    fetch('https://avancera.app/cities/')
    .then(resp=>resp.json())
    .then(result=>{
        result.forEach(element => {
            cityObjectCreator(element)
            // let cityElement = document.createElement('div')
            // let idContainer = document.createElement('p')
            // let editButton = document.createElement('input[type="button"]')

            // displayResult.appendChild(cityElement)
            // cityElement.appendChild(idContainer)
            // cityElement.appendChild(editButton)

            // cityElement.classList.add('result-container')
            // editButton.setAttribute('id', 'edit-button')

            // editButton.value = 'Edit'

            // cityElement.innerHTML = `<p class="testP">${element.name}</p> <p class="testP">${element.population}</p>`
            // idContainer.textContent = element.id
            // idContainer.style.display = 'none'
        })
        // localStorage.setItem('cities', JSON.stringify(result))
    })

    // let arrayOfCities = []
    // arrayOfCities = JSON.parse(localStorage.getItem('cities'))

    // arrayOfCities.forEach(element => {
    //     let cityElement = document.createElement('div')
    //     let idContainer = document.createElement('p')
    //     cityElement.classList.add('result-container')
    //     displayResult.appendChild(cityElement)
    //     cityElement.appendChild(idContainer)
    //     cityElement.innerHTML = `<p class="testP">${element.name}</p> <p class="testP">${element.population}</p>`
    //     idContainer.textContent = element.id
    //     idContainer.style.display = 'none'
    // })
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
    
        result.forEach(element => {
            cityObjectCreator(element)
        })

    })
})


/* EDIT CITY */

// CHILLA MED DET HÄR
let documentations = function(){
    // let populationInput
    // let nameInput
    // while(!nameInput || !populationInput){
    //     nameInput = 
    //     populationInput = 

    //     let populationInt = parseInt(populationInput)
        
    //     if(populationInt && !nameInput){
            
    //         return JSON.stringify({
    //             population : populationInt
    //         })
    //     }
    //     if(nameInput && !populationInt){
    //         return JSON.stringify({
    //             name : nameInput ,
    //         })
    //     }
    //     if(nameInput && populationInt){
    //         return JSON.stringify({
    //             name : nameInput ,
    //             population : populationInt
    //         })
    //     }
    // }

    return JSON.stringify({
        // BYT NAMN
        name : nameInput ,
        population : populationInt
    })
}
