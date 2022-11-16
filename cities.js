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


formSearch.style.display = 'none'
searchButton.style.opacity = 0
searchButton.disabled = true

addErrorMessage.style.display = 'none'

/* ------------------------------- */

/* API */
const url = `https://avancera.app/cities/`

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
    const displayMessage = document.createElement('div')

    const cityInformationContainer = document.createElement('div')
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
    cityInformationContainer.appendChild(displayMessage)

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

    displayMessage.style.display = 'none'

    editCityContainer.style.display = 'grid'

    // TYPES AND VALUES //
    editButton.type = 'button'
    editButton.value = 'Edit'
    
    deleteButton.type = 'button'
    deleteButton.value = 'Nuke em'
    
    exitButton.type = 'button'
    exitButton.value = 'Close'

    yesRemove.type = 'button'
    yesRemove.value = 'Ok'

    noRemove.type = 'button'
    noRemove.value = 'No'

    patchCity.type = 'button'
    patchCity.value = 'Update'

    newNameInput.placeholder = data.name
    newPopulationInput.placeholder = data.population

    // FUNCTION //
    // EXIT EDIT MODE
    function exitEdit(){
        displayCityContainer.removeChild(cityItemContainer)
        const btnPressed = displayCityList.querySelectorAll('.list-btn-pressed')
        btnPressed.forEach(btn=>{
            btn.classList.remove('list-btn-pressed')
        })
    }
    
    // ENTERING EDIT MODE
    editButton.addEventListener('click',()=>{
        exitButton.style.display = 'grid'
        editCityContainer.style.display = 'grid'
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
        
        fetch(url+data.id,{
        body : JSON.stringify({
        id : data.id, name : newName , population : newPopulation
        }),
            headers : {'Content-Type':'application/json'},
            method : 'PUT'
        })
        .then(response=>{
            console.log(response)
            createCityListItem()
        })
        patchCity.style.display = 'none'
    })

    // ENTERING DELETE MODE
    deleteButton.addEventListener('click', ()=>{
        exitButton.style.display = 'none'
        deleteButton.style.display = 'none'
        editButton.style.display = 'none'
        yesRemove.style.display = 'block'
        noRemove.style.display = 'block'
        cityInformationContainer.style.display = 'grid'
        displayMessage.style.display = 'grid'

        displayMessage.innerHTML = 
        `<h1 class="nuke-message">Nuke ${data.name}?</h1>`

        editCityContainer.style.display = 'none'
        editCityContainer.disabled = true;
    })
    
    // DELETE AND EXIT DELETE MODE
    yesRemove.addEventListener('click',()=>{
        displayCityContainer.removeChild(cityItemContainer)

        fetch(url+data.id,{
        method:'DELETE'
        }).then(response=>{
            console.log(response)
            createCityListItem()
            const cityItemContainer = document.createElement('div')
            const messageText = document.createElement('p')
            cityItemContainer.appendChild(messageText)
            displayCityContainer.appendChild(cityItemContainer)
            cityItemContainer.classList.add('city-item-container')
            messageText.innerHTML = `<p class="city-message-text" > Nice! <span>${data.name}</span> has been destroyed and <span>${data.population}</span> citizen have "moved"</p>`


        })
        console.log('DELETE')
    })
    
    // EXIT DELETE MODE
    noRemove.addEventListener('click', ()=>{
        editCityContainer.style.display = 'grid'
        displayMessage.style.display = 'none'
        cityInformationContainer.style.display = 'none'
        deleteButton.style.display = 'block'
        exitButton.style.display = 'block'
        editButton.style.display = 'none'
        yesRemove.style.display = 'none'
        noRemove.style.display = 'none'
    })
}


// ENTER ADD NEW CITY MODE
function addNewMode(){
    const btnPressed = displayCityList.querySelectorAll('.list-btn-pressed')
    btnPressed.forEach(btn=>{
        btn.classList.remove('list-btn-pressed')
    })
    removeAllCityObjects()
    formPost.style.display = 'grid'
    backFromAddNew.style.display = 'block'
    addErrorMessage.style.display = 'grid'

    addNewElement.style.display = 'none'
    searchAfterCities.style.display = 'none'
}

// EXIT ADD NEW MODE
function defaultFromAdd(){
    addNewElement.style.display = 'inline-block'
    searchAfterCities.style.display = 'inline-block'

    formPost.style.display = 'none'
    backFromAddNew.style.display = 'none'
    addErrorMessage.style.display = 'none'
}

// ENTER SEARCH CITY MODE
function searchMode(){
    removeAllCityObjects()
    const btnPressed = displayCityList.querySelectorAll('.list-btn-pressed')
    btnPressed.forEach(btn=>{
        btn.classList.remove('list-btn-pressed')
    })

    formSearch.style.display = 'grid'
    backFromSearch.style.display = 'block'

    addNewElement.style.display = 'none'
    searchAfterCities.style.display = 'none'
}

// EXIT SEARCH MODE
function defaultFromSearch(){
    addNewElement.style.display = 'inline-block'
    searchAfterCities.style.display = 'inline-block'

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

    .catch(()=>{
        console.log('ERROR')
        let errorMess = document.createElement('h5')
        displayCityContainer.appendChild(errorMess)
        errorMess.innerHTML = `
        <h5 class="get-error">Oops! Kunde inte hitta ${value}</h5>`
    })
    defaultFromSearch()
}

function childFromDisplayListName(data){
    let child
    for (let i = 0; i <displayCityList.querySelectorAll('.list-name').length;i++){
        if(displayCityList.querySelectorAll('.list-name')[i].textContent === data.name){
            child = displayCityList.querySelectorAll('.list-name')[i]
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

            cityListItem.textContent = data[i].name
            // cityListItem.innerHTML = `
            // <li class="list-btn">
            //     ${data[i].name}
            // </li>`
            cityListItem.classList.add('list-btn')
            displayCityList.appendChild(cityListItem)
    
            cityListItem.addEventListener('click',()=>{
                const btnPressed = displayCityList.querySelectorAll('.list-btn-pressed')
                btnPressed.forEach(btn=>{
                    btn.classList.remove('list-btn-pressed')
                })
                cityListItem.classList.add('list-btn-pressed')

                removeAllCityObjects()
                cityElementObjectCreator(data[i])
            })
        }
    })
}

function removeChildFromList(child){
    displayCityList.removeChild(child)
}

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

/* ------------------------------- */

/* EVENTS */
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

populationInput.addEventListener('input',()=>{
    if(parseInt(populationInput.value)){
        populationError.style.display = 'none'
        displayPostCity()
    } if(!parseInt(populationInput.value)){
        populationError.style.display = 'grid'
        displayPostCity()
    }
})

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


