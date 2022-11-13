/* GLOBAL VARIABLES */
const addNewElement = document.querySelector('#add-new-city-element')
const backFromAddNew = document.querySelector('#back-from-add-new')
const searchAfterCities = document.querySelector('#search-after-cities')
const backFromSearch = document.querySelector('#back-from-search')

const formPost = document.querySelector('#form-post')
const nameInput = document.querySelector('#name-input')
const populationInput = document.querySelector('#population-input')

const postCity = document.querySelector('#post-city')

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
// const cities = []
// listFromStorage = []


// REMOVE WHEN FINISHED //////////////////////////////////////////
//const getCities = document.querySelector('#get-cities')
//const refreshButton = document.querySelector('#refresh-button')
/* KOLLA UPP SECTIONS! */
//let inputName = ''
// let inputPopulation = 0

// function inputPopulationValue(){
//     inputPopulation = parseInt(populationInput.value)
// }

// TAR EMOT VÄRDE FRÅN ANVÄNDAREN
// function inputNameValue(){
//     if(nameInput){
//         nameError.style.display = 'none'
//     }
//     //inputName = nameInput.value
// }

// FUNKAR EJ
/* GUARDFUNCTION */
// function isNameInputPass(){
//     if(nameInput.value === ''){
//         nameError.style.display = 'inline-block'
//     }
// }
// function isPopulationInputPass(){
//     if(!inputPopulation){
//         populationError.style = 'inline-block'
//     }
//     if(inputPopulation){
//         populationError.style.display = 'none'
//     }
// }

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

// TODO get fetch
// display-city-list-item


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
/////////////////////////////////////////////////////////////////////



/* ------------------------------- */

/* CLASSLIST */
nameInput.classList.add('user-input')
populationInput.classList.add('user-input')
postCity.classList.add('btn')

searchButton.classList.add('btn')
searchInput.classList.add('user-input')

/* ------------------------------- */

/* START CONDITIONS */
backFromAddNew.style.display = 'none'
backFromSearch.style.display = 'none'
formPost.style.display = 'none'
postCity.style.display = 'none'
//postCity.style.opacity = 1
//postCity.disabled = true

formSearch.style.display = 'none'

// TESTAR SEARCH
searchButton.style.opacity = 0
searchButton.disabled = true

addErrorMessage.style.display = 'none'

/* ------------------------------- */

/* API */
const url = `https://avancera.app/cities/`

// FILL LOCALSTORAGE WITH CITIES
// fetch(url).then(response => response.json()).then(data => {
//     for (let i = 0; i < data.length; i++){
//         cities.push(data[i])
//     }

//     //localStorage.setItem('city-element', JSON.stringify(cities))
// })
//listFromStorage = JSON.parse(localStorage.getItem('city-element'))

/* ------------------------------- */

/* FUNCTIONS */
function refresh(){
    location.reload()
}

// CITY OBJECT CREATOR
function cityElementObjectCreator(data){

    // VARIABLES //
    const cityItemContainer = document.createElement('div')
    const itemSelectContainer = document.createElement('div')

    const editButton = document.createElement('input')
    const deleteButton = document.createElement('input')
    const exitButton = document.createElement('input')
    const yesRemove = document.createElement('input')
    const noRemove = document.createElement('input')

    const cityInformationContainer = document.createElement('div')
    const cityName = document.createElement('p')
    const cityPopulation = document.createElement('p')
    const editCityContainer = document.createElement('div')
    // EDITinput //
    const newNameInput = document.createElement('input')
    const newPopulationInput = document.createElement('input')
    const patchCity = document.createElement('input')

    let newName = ''
    let newPopulation = 0

    // CLASSLIST //
    cityItemContainer.classList.add('city-item-container')
    itemSelectContainer.classList.add('item-select-container')

    editButton.classList.add('btn')
    deleteButton.classList.add('btn')
    exitButton.classList.add('btn')

    yesRemove.classList.add('btn')
    yesRemove.classList.add('yes')
    noRemove.classList.add('btn')
    noRemove.classList.add('no')

    cityInformationContainer.classList.add('city-information-container')

    // SE ÖVER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!cityName////////////////////////////////////////////////////////////////////////////////////////
    cityName.classList.add('city-header')
    //cityName.classList.add('city-item')
    cityPopulation.classList.add('city-item')

    editCityContainer.classList.add('edit-city-container')
    newNameInput.classList.add('user-input')
    newPopulationInput.classList.add('user-input')

    patchCity.classList.add('btn')
    // APPEND //
    displayCityContainer.appendChild(cityItemContainer)

    cityItemContainer.appendChild(itemSelectContainer)
    itemSelectContainer.appendChild(editButton)
    itemSelectContainer.appendChild(exitButton)
    itemSelectContainer.appendChild(deleteButton)
    itemSelectContainer.appendChild(yesRemove)
    itemSelectContainer.appendChild(noRemove)

    cityItemContainer.appendChild(cityInformationContainer)
    cityInformationContainer.appendChild(cityName)
    cityInformationContainer.appendChild(cityPopulation)

    cityItemContainer.appendChild(editCityContainer)
    editCityContainer.appendChild(newNameInput)
    editCityContainer.appendChild(newPopulationInput)
    editCityContainer.appendChild(patchCity)

    // START CONDITIONS //
    itemSelectContainer.style.opacity = 1;
    exitButton.style.display = 'grid'
    yesRemove.style.display = 'none'
    noRemove.style.display = 'none'
    cityInformationContainer.style.display = 'none'
    editButton.style.display = 'none'
    patchCity.style.display = 'none'
    
    // editCityContainer.style.display = 'none'
    editCityContainer.style.display = 'grid'

    // TYPES AND VALUES //
    editButton.type = 'button'
    editButton.value = 'Edit'
    
    deleteButton.type = 'button'
    deleteButton.value = 'Remove'
    
    exitButton.type = 'button'
    exitButton.value = 'Exit'

    yesRemove.type = 'button'
    yesRemove.value = 'Yes'

    noRemove.type = 'button'
    noRemove.value = 'No'

    patchCity.type = 'button'
    patchCity.value = 'Update'

    cityName.textContent = data.name
    cityPopulation.textContent = 'Invånare: '+data.population

    newNameInput.placeholder = data.name
    newPopulationInput.placeholder = data.population

    // FUNCTION //
    // EXIT EDIT MODE
    function exitEdit(){
        displayCityContainer.removeChild(cityItemContainer)
        // Displays
        // editButton.style.display = 'grid'
        // cityInformationContainer.style.display = 'grid'
        // deleteButton.style.display = 'block'

        // // None-display
        // editCityContainer.style.display = 'none'
        // exitButton.style.display = 'none'
    }
    
    // EVENTS //
    // SE ÖVER DETTA!
    // cityItemContainer.addEventListener('mouseover',()=>{
    //     itemSelectContainer.style.opacity = 1;
    // })

    // cityItemContainer.addEventListener('mouseout',()=>{
    //     itemSelectContainer.style.opacity = 0;
    // })

    // ENTERING EDIT MODE
    editButton.addEventListener('click',()=>{
        // Displays
        exitButton.style.display = 'grid'
        editCityContainer.style.display = 'grid'

        // None-display
        editButton.style.display = 'none'
        deleteButton.style.display = 'none'
        cityInformationContainer.style.display = 'none'
    })

    exitButton.addEventListener('click', exitEdit)

    newNameInput.addEventListener('input',()=>{
        updateReady()
        if(newNameInput){
            newName = newNameInput.value
            newNameInput.placeholder = newName
        }
    })

    newPopulationInput.addEventListener('input',()=>{
        updateReady()
        if(newPopulationInput.value){
            newPopulation = parseInt(newPopulationInput.value)
            newPopulationInput.placeholder = newPopulation
        }
    })

    function updateReady(){
        if(newNameInput && parseInt(newPopulationInput.value)){
            patchCity.style.display = 'grid'
        }
        if(!newNameInput.value || !parseInt(newPopulationInput.value)){
            patchCity.style.display = 'none'
        }
    }

    // PUT
    patchCity.addEventListener('click', ()=>{

        let listName = childFromDisplayListName(data)
        listName.textContent = newName
        
        fetch(url+data.id,{
        body : JSON.stringify({
        id : data.id, name : newName , population : newPopulation
        }),
            headers : {'Content-Type':'application/json'},
            method : 'PUT'
        })
        .then(response=>{
            console.log(response)
            console.log('PUT That in my mouth')
            createCityListItem()
        })


        // OG
        // function documentations(){
        //     if(newPopulation && !newName){
        //         cityPopulation.textContent = 'Invånare: '+newPopulation
        //         return JSON.stringify({
        //             population : newPopulation
        //         })
        //     }
        //     if(newName && !newPopulation){
        //         cityName.textContent = newName
        //         listName.textContent = newName
        //         return JSON.stringify({
        //             name : newName ,
        //         })
        //     }
        //     if(newName && newPopulation){
        //         cityName.textContent = newName
        //         cityPopulation.textContent = newPopulation
        //         listName.textContent = newName
        //         return JSON.stringify({
        //             name : newName ,population : newPopulation
        //         })
        //     }
        // }
        // fetch(url+data.id,{
        //     body : documentations(),
        //     headers : {'Content-Type' : 'application/json'},
        //     method : 'PATCH'
        // })
        // console.log('PATCH')
        //exitEdit()

        patchCity.style.display = 'none'
        //createCityListItem()
        //refresh()
    })

    // ENTERING DELETE MODE
    deleteButton.addEventListener('click', ()=>{
        exitButton.style.display = 'none'
        deleteButton.style.display = 'none'
        editButton.style.display = 'none'
        yesRemove.style.display = 'block'
        noRemove.style.display = 'block'

        editCityContainer.style.opacity = .2
        editCityContainer.disabled = true;
    })
    
    // DELETE AND EXIT DELETE MODE
    yesRemove.addEventListener('click',()=>{
        displayCityContainer.removeChild(cityItemContainer)
        // for(let i = 0; i < listFromStorage.length; i++){
        //     if(listFromStorage[i].name === data.name){
        //         listFromStorage.splice(i, data.name)
        //     }
        // }

        fetch(url+data.id,{
        method:'DELETE'
        }).then(response=>{
            console.log(response)
            createCityListItem()
            //refresh()
        })
        console.log('DELETE')
    })
    
    // EXIT DELETE MODE
    noRemove.addEventListener('click', ()=>{
        editCityContainer.style.opacity = 1
        deleteButton.style.display = 'block'
        exitButton.style.display = 'block'
        editButton.style.display = 'none'
        yesRemove.style.display = 'none'
        noRemove.style.display = 'none'
    })
}


// ENTER ADD NEW CITY MODE
function addNewMode(){
    removeAllCityObjects()
    formPost.style.display = 'grid'
    backFromAddNew.style.display = 'block'
    addErrorMessage.style.display = 'grid'

    addNewElement.style.display = 'none'
    searchAfterCities.style.display = 'none'
    //getCities.style.display = 'none'
    //refreshButton.style.display = 'none'
}

// EXIT ADD NEW MODE
function defaultFromAdd(){
    //getCities.style.display = 'inline-block'
    addNewElement.style.display = 'inline-block'
    searchAfterCities.style.display = 'inline-block'
    //refreshButton.style.display = 'inline-block'

    formPost.style.display = 'none'
    backFromAddNew.style.display = 'none'
    addErrorMessage.style.display = 'none'
}

// ENTER SEARCH CITY MODE
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
    //refreshButton.style.display = 'none'
}

// EXIT SEARCH MODE
function defaultFromSearch(){
    //getCities.style.display = 'inline-block'
    addNewElement.style.display = 'inline-block'
    searchAfterCities.style.display = 'inline-block'
    //refreshButton.style.display = 'inline-block'

    formSearch.style.display = 'none'
    backFromSearch.style.display = 'none'
}

// REMOVES ALL CITY OBJECTS
function removeAllCityObjects(){
    while(displayCityContainer.firstChild){
        displayCityContainer.firstChild.remove()
    }
}

// REMOVE ALL CITIES IN LIST
function removeAllInList(){
    while(displayCityList.firstChild){
        displayCityList.firstChild.remove()
    }
}

function getCity(value){
    fetch(url+`?name=${value}`)
    .then(response => response.json())
    .then(result =>{
        console.log('GET')
        result.forEach(element => {
            if(element){
                cityElementObjectCreator(element)
            }
            if(!element){
                const cityItemContainer = document.createElement('div')
                displayCityContainer.appendChild(cityItemContainer)
                cityItemContainer.innerHTML = 
                `<h5 class="get-error">Oops! Nothing with ${value} here.... </h5>`
            }
        })
    })

    // SYNS INTE
    .catch(()=>{
        console.log('ERROR')
        let errorMess = document.createElement('h5')
        displayCityContainer.appendChild(errorMess)
        errorMess.innerHTML = `
        <h5 class="get-error">Oops! Kunde inte hitta ${value}</h5>`
    })
    defaultFromSearch()
}

// find children from displayCityList -- funkar inte....
// function childFromDisplayListPopulation(data){
//     let child
//     for (let i = 0; i <displayCityList.querySelectorAll('.list-population').length;i++){
//         if(displayCityList.querySelectorAll('.list-population')[i].textContent === data.population){
//             child = displayCityList.querySelectorAll('.list-population')[i]
//             console.log(child.textContent)
//         }
//     }
//     return child
// }

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

function removeChildFromList(child){
    displayCityList.removeChild(child)
}

/* ------------------------------- */

/* EVENTS */
// TAR EMOT ETT NAMN, VISAR EJ ERROR OM DET FINNS ETT VÄRDE
nameInput.addEventListener('input', ()=>{
    if(nameInput.value){
        nameError.style.display = 'none'
        displayPostCity()
    }
    if(!nameInput.value){
        nameError.style.display = 'grid'
        displayPostCity()
    }
})

// TAR EMOT ETT NAMN, VISAR EJ ERROR OM DET FINNS ETT VÄRDE
populationInput.addEventListener('input',()=>{
    if(parseInt(populationInput.value)){
        populationError.style.display = 'none'
        displayPostCity()
    } if(!parseInt(populationInput.value)){
        populationError.style.display = 'grid'
        displayPostCity()
    }
})

function displayPostCity(){
    if(populationError.style.display === 'none' && nameError.style.display === 'none'){
        postCity.style.display = 'grid'
    }
    if(populationError.style.display === 'grid'){
        postCity.style.display = 'none'
    }
    if(nameError.style.display === 'grid'){
        postCity.style.display = 'none'
    }
}

searchAfterCities.addEventListener('click', searchMode)
backFromSearch.addEventListener('click', defaultFromSearch)
addNewElement.addEventListener('click', addNewMode)
backFromAddNew.addEventListener('click', defaultFromAdd)

/* POST */
formPost.addEventListener('submit',(event)=>{
    event.preventDefault()
    let   name = nameInput.value
    let   population = parseInt(populationInput.value)

    fetch(url,{
        body: JSON.stringify({
            name : name ,
            population : population
        }),
        headers : {'Content-Type' : 'application/json'},
        method : 'POST'
    }).then(resp => resp.json()).then(data =>{
        for(let i = 0; i < data.length; i++){
            if(data[i].name === name){
                createCityListItem(data)
            }
        }
    })
    console.log('POST')
    defaultFromAdd()
})

searchInput.addEventListener('input', ()=>{

    if(searchInput.value){
        searchButton.disabled = false
        searchButton.style.opacity = 1
    }
    if(!searchInput.value){
        searchButton.disabled = true
        searchButton.style.opacity = 0
    }
})

searchButton.addEventListener('click', ()=>{
    getCity(searchInput.value)
})

/* ------------------------------- */

// FUNCTION CALLS
createCityListItem()


