/* GLOBAL VARIABLES */
const url = 'https://rickandmortyapi.com/api'

const seasonOne = '/episode/1,2,3,4,5,6,7,8,9,10,11'
const seasonTwo = '/episode/12,13,14,15,16,17,18,19,20,21'
const seasonThree = '/episode/22,23,24,25,26,27,28,29,30,31'
const seasonFour = '/episode/32,33,34,35,36,37,38,39,40,41'
const seasonFive = '/episode/42,43,44,45,46,47,48,49,50,51'


const episodeListSEOne = []
const episodeListSETwo = []
const episodeListSEThree = []
const episodeListSEFour = []
const episodeListSEFive = []
const episodeListSESix = []

// SAVES FAVOURITE CHARACTERS / EPISODES
let favorite = []



// List container
const displayEpisodeList = document.querySelector('#display-episode-list')
const displayCharacterList = document.querySelector('#display-character-list')

// object container
const displayEpisodeObject = document.querySelector('#display-episode-object')
const displayCharacterObject = document.querySelector('#display-character-object')

const mainCharacterGalleriContainer = document.querySelector('#main-character-galleri-container')

/* FUNCTIONS */
function seasonOneList(){
    removeAllCharacterInList()
    fetch(url+seasonOne).then(response => response.json())
    .then(data=>{
        episodeListMaker(data)
    })
}
function seasonTwoList(){
    removeAllCharacterInList()
    fetch(url+seasonTwo).then(response => response.json())
    .then(data=>{
        episodeListMaker(data)
    })
}
function seasonThreeList(){
    removeAllCharacterInList()
    fetch(url+seasonThree).then(response => response.json())
    .then(data=>{
        episodeListMaker(data)
    })
}
function seasonFourList(){
    removeAllCharacterInList()
    fetch(url+seasonFour).then(response => response.json())
    .then(data=>{
        episodeListMaker(data)
    })
}
function seasonFiveList(){
    removeAllCharacterInList()
    fetch(url+seasonFive).then(response => response.json())
    .then(data=>{
        episodeListMaker(data)
    })
}

function episodeListMaker(data){
    removeCharacterObject()
    removeEpisodeObject()
    removeAllInList()

    for(let i = 0; i < data.length; i++){

        const listItem = document.createElement('li')
        const itemInformation = document.createElement('p')
        listItem.classList.add('episode-btn')
        itemInformation.classList.add('episode-information')

        listItem.textContent = data[i].name
        itemInformation.textContent = 'Episode '+data[i].episode
        listItem.appendChild(itemInformation)
        displayEpisodeList.appendChild(listItem)

        listItem.addEventListener('click',()=>{
            removeCharacterObject()
            removeEpisodeObject()
            episodeObjectMaker(data[i])
        })
    }
}

// EPO
function episodeObjectMaker(data){

    const episodeContainer = document.createElement('div')
    const episodeTop = document.createElement('div')
    const episodeBottom = document.createElement('div')
    const episodeNameInformation = document.createElement('h4')
    const episodeName = document.createElement('p')
    const episodeAirDate = document.createElement('p')

    const charactersContainer = document.createElement('ul')

    episodeContainer.classList.add('episode-container')
    episodeBottom.classList.add('episode-container-bottom')
    episodeTop.classList.add('episode-container-top')
    episodeNameInformation.classList.add('episode-name-information')
    episodeName.classList.add('episode-name')
    episodeAirDate.classList.add('episode-airdate')

    charactersContainer.id = 'characters-container-in-epo'

    displayEpisodeObject.appendChild(episodeContainer)
    episodeContainer.appendChild(episodeTop)
    episodeContainer.appendChild(episodeBottom)
    episodeTop.appendChild(episodeNameInformation)
    episodeTop.appendChild(episodeName)
    episodeBottom.appendChild(episodeAirDate)
    episodeBottom.appendChild(charactersContainer)

    episodeNameInformation.textContent = data.name
    episodeName.textContent = data.episode
    episodeAirDate.textContent = data.air_date

    removeAllCharacterInList()
    charactersListFromEpisode(data.characters)
}

// LOOPS THROUGH CHARACTER LIST FROM EPISODE
function charactersListFromEpisode(data){
    for(let i = 0; i < data.length;i++){
        characterFinder(data[i])
    }
}

localStorage.setItem('favorite', JSON.stringify(favorite))

function characterFinder(characterUrl){
    fetch(characterUrl)
    .then(response => response.json())
    .then(data => {
        //characterObjectMaker(data)
        characterListFromEpisode(data)
    })
}

// Adds character from episodeObject
function characterListFromEpisode(data){
    const listItem = document.createElement('li')
    listItem.classList.add('character-list-item')
    // TEST!/////////////////////
    listItem.classList.add('character-btn')
    //const itemInformation = document.createElement('p')
    listItem.textContent = data.name
    displayCharacterList.appendChild(listItem)
    listItem.addEventListener('click', ()=> {
        characterObjectMaker(data)
    })
}

function characterCardMaker(data){
    // Create
    const characterCardContainer = document.createElement('div')
    const characterImgContainer = document.createElement('div')
    const cardImg = document.createElement('img')
    const characterCardInformationContainer = document.createElement('div')
    const characterHeader = document.createElement('p')
    const genderText = document.createElement('p')
    const statusText = document.createElement('p')

    // Classlist
    characterCardContainer.classList.add('character-card-container')
    characterImgContainer.classList.add('character-img-container')
    cardImg.classList.add('card-img')
    characterCardInformationContainer.classList.add('character-card-information-container')
    characterHeader.classList.add('character-name-header')
    genderText.classList.add('card-text')
    statusText.classList.add('card-text')

    // Append
    mainCharacterGalleriContainer.appendChild(characterCardContainer)
    characterCardContainer.appendChild(characterImgContainer)
    characterImgContainer.appendChild(cardImg)
    characterCardContainer.appendChild(characterCardInformationContainer)
    characterCardInformationContainer.appendChild(characterHeader)
    characterCardInformationContainer.appendChild(genderText)
    characterCardInformationContainer.appendChild(statusText)

    cardImg.src = data.image
    // cardImg.innerHTML = 
    // `<img src=${data.image} alt="" class="card-img" >`
    characterHeader.innerHTML = 
    `<h3 class="character-name-header">${data.name}</h3>`
    // genderText.innerHTML = 
    // `<p class="card-text"><span>Gender: </span>${data.gender}</p>`
    // statusText.innerHTML = 
    // `<p class="card-text"><span>Status: </span>${data.status}</p>`
}

function characterObjectMaker(data){
    removeCharacterObject()

    const characterContainer = document.createElement('div')
    const infoContainer = document.createElement('div')
    const imgCharacterContainer = document.createElement('div')
    const characterImg = document.createElement('img')
    const characterName = document.createElement('h3')

    const characterGender = document.createElement('p')
    const characterStatus = document.createElement('p')

    characterContainer.classList.add('character-container')
    infoContainer.classList.add('character-info-container')
    imgCharacterContainer.classList.add('img-character-container')
    characterName.classList.add('character-name')

    characterGender.classList.add('character-info')
    characterStatus.classList.add('character-info')

    displayCharacterObject.appendChild(characterContainer)
    characterContainer.appendChild(infoContainer)
    characterContainer.appendChild(imgCharacterContainer)
    imgCharacterContainer.appendChild(characterImg)
    infoContainer.appendChild(characterName)
    infoContainer.appendChild(characterGender)
    infoContainer.appendChild(characterStatus)

    characterName.textContent = data.name
    characterImg.src = data.image
    characterGender.textContent = data.gender
    characterStatus.textContent = data.status
    
}


function removeCharacterObject(){
    while(displayCharacterObject.firstChild){
        displayCharacterObject.firstChild.remove()
    }
}

function removeEpisodeObject(){
    while(displayEpisodeObject.firstChild){
        displayEpisodeObject.firstChild.remove()
    }
}

function removeAllInList(){
    while(displayEpisodeList.firstChild){
        displayEpisodeList.firstChild.remove()
    }
}

function removeAllCharacterInList(){
    while(displayCharacterList.firstChild){
        displayCharacterList.firstChild.remove()
    }
}

// fetch("https://rickandmortyapi.com/api/character")
// .then(response => response.json())
// .then(data => makeCards(data.results))

// function makeCards(charactersArray){
//     const cardContainer = document.querySelector('#card-container')

//     // DEN HÄR ITERERAR
//     charactersArray.forEach(character => {
//         characterObjectMaker(character)
//     });
// }

// DISPLAYS THE 4 mOST POPULAR CHARACTERS

fetch(url+'/character/244,47,282, 154, 598, 252, 171,2').then(response => response.json())
.then(data =>{
    data.forEach(character => {
        characterCardMaker(character)
    });
})

