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
// localStorage.setItem('favorite', JSON.stringify(favorite))



// List container
const displayEpisodeList = document.querySelector('#display-episode-list')
const displayCharacterList = document.querySelector('#display-character-list')

// object container
const displayEpisodeObject = document.querySelector('#display-episode-object')
const displayCharacterObject = document.querySelector('#display-character-object')
const displayCharacterContainer = document.querySelector('#display-character-container')
const charactersStats = document.querySelector('#characters-stats')

const mainCharacterGalleryContainer = document.querySelector('#main-character-gallery-container')

const showMeFavoritButton = document.querySelector('#show-me-favorite-button')

const season1 = document.querySelector('#season-1')
const season2 = document.querySelector('#season-2')
const season3 = document.querySelector('#season-3')
const season4 = document.querySelector('#season-4')
const season5 = document.querySelector('#season-5')

// Start condition
showMeFavoritButton.style.opacity = 0;

if (favorite) {
    showMeFavoritButton.style.opacity = 1
}

// Append to favorite-list-item
const favoriteList = document.querySelector('#favorite-list')

/* FUNCTIONS */
function seasonOneList() {
    season1.classList.add('btn-pressed')
    season2.classList.remove('btn-pressed')
    season3.classList.remove('btn-pressed')
    season4.classList.remove('btn-pressed')
    season5.classList.remove('btn-pressed')
    removeAllCharacterInList()
    fetch(url + seasonOne).then(response => response.json())
        .then(data => {
            episodeListMaker(data)
        })
}

function seasonTwoList() {
    season2.classList.add('btn-pressed')
    season1.classList.remove('btn-pressed')
    season3.classList.remove('btn-pressed')
    season4.classList.remove('btn-pressed')
    season5.classList.remove('btn-pressed')
    removeAllCharacterInList()
    fetch(url + seasonTwo).then(response => response.json())
        .then(data => {
            episodeListMaker(data)
        })
}
function seasonThreeList() {
    season3.classList.add('btn-pressed')
    season1.classList.remove('btn-pressed')
    season2.classList.remove('btn-pressed')
    season4.classList.remove('btn-pressed')
    season5.classList.remove('btn-pressed')
    removeAllCharacterInList()
    fetch(url + seasonThree).then(response => response.json())
        .then(data => {
            episodeListMaker(data)
        })
}
function seasonFourList() {
    season4.classList.add('btn-pressed')
    season1.classList.remove('btn-pressed')
    season2.classList.remove('btn-pressed')
    season3.classList.remove('btn-pressed')
    season5.classList.remove('btn-pressed')
    removeAllCharacterInList()
    fetch(url + seasonFour).then(response => response.json())
        .then(data => {
            episodeListMaker(data)
        })
}
function seasonFiveList() {
    season5.classList.add('btn-pressed')
    season1.classList.remove('btn-pressed')
    season2.classList.remove('btn-pressed') 
    season3.classList.remove('btn-pressed')
    season4.classList.remove('btn-pressed')
    removeAllCharacterInList()
    fetch(url + seasonFive).then(response => response.json())
        .then(data => {
            episodeListMaker(data)
        })
}

function episodeListMaker(data) {
    removeCharacterObject()
    removeEpisodeObject()
    removeAllInList()

    for (let i = 0; i < data.length; i++) {

        const listItem = document.createElement('li')
        const itemInformation = document.createElement('p')
        listItem.classList.add('episode-btn')
        //itemInformation.classList.add('episode-information')


        itemInformation.style.padding = '0'
        itemInformation.style.margin = '0'
        listItem.style.margin = '0'
        listItem.style.padding = '0'

        listItem.innerHTML =
            `<li><p style=" font-weight: bold" >${data[i].name}</p>`
        itemInformation.innerHTML =
            `<p class="episode-information" >Episode: <span>${data[i].episode}</span></p>`

        listItem.appendChild(itemInformation)
        displayEpisodeList.appendChild(listItem)

        listItem.addEventListener('click', () => {
            removeCharacterObject()
            removeEpisodeObject()
            episodeObjectMaker(data[i])
        })
    }
}

// EPO
function episodeObjectMaker(data) {

    const episodeContainer = document.createElement('div')
    const episodeTop = document.createElement('div')
    const episodeBottom = document.createElement('div')
    const episodeNameInformation = document.createElement('h4')
    const episodeName = document.createElement('p')
    const episodeAirDate = document.createElement('p')
    const episodeTitle = document.createElement('p')

    const charactersContainer = document.createElement('ul')

    episodeContainer.classList.add('episode-container')
    episodeBottom.classList.add('episode-container-bottom')
    episodeTop.classList.add('episode-container-top')
    // episodeNameInformation.classList.add('episode-name-information')
    episodeTitle.classList.add('episode-name')
    // episodeAirDate.classList.add('episode-airdate')

    charactersContainer.id = 'characters-container-in-epo'

    displayEpisodeObject.appendChild(episodeContainer)
    episodeContainer.appendChild(episodeTop)
    episodeContainer.appendChild(episodeBottom)
    episodeTop.appendChild(episodeTitle)
    episodeTop.appendChild(episodeNameInformation)
    episodeTop.appendChild(episodeName)
    episodeBottom.appendChild(episodeAirDate)
    episodeBottom.appendChild(charactersContainer)

    episodeTitle.style.padding = '0'
    episodeTitle.style.margin = '0'
    episodeNameInformation.style.padding = '0'
    episodeNameInformation.style.margin = '0'
    episodeName.style.padding = '0'
    episodeName.style.margin = '0'
    episodeAirDate.style.padding = '0'
    episodeAirDate.style.margin = '0'

    episodeTitle.textContent = 'Title'

    episodeNameInformation.innerHTML =
        `<h4 class='episode-name-information' > ${data.name}</h4>`

    episodeName.innerHTML =
        `<p class="episode-name">Episode: <span>${data.episode}</span></p>`

    episodeAirDate.innerHTML =
        `<p class="episode-airdate">Air date: <span>${data.air_date}</span></p>`

    removeAllCharacterInList()
    charactersListFromEpisode(data.characters)
}

// LOOPS THROUGH CHARACTER LIST FROM EPISODE
function charactersListFromEpisode(data) {
    for (let i = 0; i < data.length; i++) {
        characterFinder(data[i])
    }
}



function characterFinder(characterUrl) {
    fetch(characterUrl)
        .then(response => response.json())
        .then(data => {
            //characterObjectMaker(data)
            characterListFromEpisode(data)
        })
}


// Characters from favorite list
// function characterListFromFavorite(data){
//     const listItem = document.createElement('li')
//     listItem.classList.add('character-list-item')
//     // TEST!/////////////////////
//     listItem.classList.add('character-btn')
//     //const itemInformation = document.createElement('p')
//     listItem.textContent = data.name
//     favoriteList.appendChild(listItem)
//     listItem.addEventListener('click', ()=> {
//         console.log(data)
//         // characterObjectMaker(data)
//         // PLAYCARDMAKER
//         playcardMakerFromFavoriteList(data)
//     })
// }


// SAVED CARDS
function playcardMakerFromFavoriteList(data) {
    const characterContainer = document.createElement('div')
    const characterTopContainer = document.createElement('div')

    // CHARACTER-TOP-CONTAINER
    // const favoriteButton = document.createElement('button')
    // const removeFromFavoriteButton = document.createElement('button')

    const infoContainer = document.createElement('div')
    const playcardLogoContainer = document.createElement('div')
    const characterImg = document.createElement('img')
    const playcardLogo = document.createElement('img')
    const imgCharacterContainer = document.createElement('div')

    const characterName = document.createElement('h3')

    const characterSpecies = document.createElement('p')
    const characterGender = document.createElement('p')
    const characterStatus = document.createElement('p')

    // Topp
    characterContainer.classList.add('character-container')
    characterTopContainer.classList.add('character-top-container')

    infoContainer.classList.add('character-info-container')
    imgCharacterContainer.classList.add('img-character-container')
    // favoriteButton.classList.add('playcard-btn')
    // removeFromFavoriteButton.classList.add('playcard-btn')
    playcardLogoContainer.classList.add('playcard-logo-container')
    characterName.classList.add('character-name-header')
    playcardLogo.classList.add('playcard-logo')
    characterImg.classList.add('character-img')

    displayCharacterContainer.appendChild(characterContainer)
    characterContainer.appendChild(characterTopContainer)
    characterContainer.appendChild(imgCharacterContainer)
    characterContainer.appendChild(infoContainer)
    // characterTopContainer.appendChild(favoriteButton)
    // characterTopContainer.appendChild(removeFromFavoriteButton)
    characterTopContainer.appendChild(playcardLogoContainer)
    playcardLogoContainer.appendChild(playcardLogo)

    imgCharacterContainer.appendChild(characterImg)
    infoContainer.appendChild(characterName)
    infoContainer.appendChild(characterSpecies)
    infoContainer.appendChild(characterGender)
    infoContainer.appendChild(characterStatus)

    // removeFromFavoriteButton.innerHTML =
    //     `<button>X</button>`
    // favoriteButton.innerHTML =
    //     `<button>&hearts;</button>`

    // removeFromFavoriteButton.style.margin = '0'
    // removeFromFavoriteButton.style.padding = '0'
    // favoriteButton.style.margin = '0'
    // favoriteButton.style.padding = '0'
    characterGender.style.margin = '0'
    characterStatus.style.margin = '0'
    characterSpecies.style.margin = '0'
    playcardLogo.src = 'img/rickandmorty_logo_og.png'
    characterName.textContent = data.name
    characterImg.src = data.image
    characterStatus.innerHTML =
        `<p class="character-info">Status: <span>${data.status}</span></p>`

    characterSpecies.innerHTML =
        `<p class="character-info">Species: <span>${data.species}</span></p>`

    characterGender.innerHTML =
        `<p class="character-info">Gender: <span>${data.gender}</span></p>`

    // start condition
    // removeFromFavoriteButton.style.display = 'none'
    // favoriteButton.addEventListener('click', () => {
    //     favorite.push(data)
    //     localStorage.setItem('favorite', JSON.stringify(favorite))
    //     favoriteButton.style.display = 'none'
    //     removeFromFavoriteButton.style.display = 'grid'
    // })
    
    // removeFromFavoriteButton.addEventListener('click', () => {
    //     console.log('remove button pressed')
    //     let favorite = []
    //     favorite = JSON.parse(localStorage.getItem('favorite'))
    //     for (let i = 0; i < favorite.length; i++) {
    //         if (favorite[i].id === data.id) {
    //             favorite.pop(data)
    //             console.log('Borttagen')
    //         }
    //     }
    //     favoriteButton.style.display = 'grid'
    //     removeFromFavoriteButton.style.display = 'none'
    //     localStorage.setItem('favorite', JSON.stringify(favorite))
    // })
}

// Adds character from episodeObject
function characterListFromEpisode(data) {
    const listItem = document.createElement('li')
    listItem.classList.add('character-list-item')
    // TEST!/////////////////////
    listItem.classList.add('character-btn')
    //const itemInformation = document.createElement('p')
    listItem.textContent = data.name
    displayCharacterList.appendChild(listItem)
    listItem.addEventListener('click', () => {
        playcardObjectMaker(data)
    })
}


// Presentation gallery
function characterPresentationMaker(data) {
    // Create
    const characterCardContainer = document.createElement('div')
    const characterImgContainer = document.createElement('div')
    const cardImg = document.createElement('img')
    const characterCardInformationContainer = document.createElement('div')
    const characterHeader = document.createElement('p')

    // Classlist
    characterCardContainer.classList.add('presentation-container')
    characterImgContainer.classList.add('presentation-img-container')
    cardImg.classList.add('card-img')
    characterCardInformationContainer.classList.add('presentation-information-container')
    characterHeader.classList.add('presentation-header')

    // Append
    mainCharacterGalleryContainer.appendChild(characterCardContainer)
    characterCardContainer.appendChild(characterImgContainer)
    characterImgContainer.appendChild(cardImg)
    characterCardContainer.appendChild(characterCardInformationContainer)
    characterCardInformationContainer.appendChild(characterHeader)
    characterCardInformationContainer.appendChild

    cardImg.src = data.image
    characterHeader.innerHTML =
        `<h3 class="presentation-header">${data.name}</h3>`
}

// MAKES A PLAYCARD IN EPISODE OBJECT
function playcardObjectMaker(data) {

    removeCharacterObject()

    // TOPP
    const characterContainer = document.createElement('div')
    const characterTopContainer = document.createElement('div')

    // CHARACTER-TOP-CONTAINER
    const favoriteButton = document.createElement('button')
    const removeFromFavoriteButton = document.createElement('button')

    const infoContainer = document.createElement('div')
    const playcardLogoContainer = document.createElement('div')
    const characterImg = document.createElement('img')
    const playcardLogo = document.createElement('img')
    const imgCharacterContainer = document.createElement('div')

    const characterName = document.createElement('h3')

    const characterSpecies = document.createElement('p')
    const characterGender = document.createElement('p')
    const characterStatus = document.createElement('p')

    // Topp
    characterContainer.classList.add('character-container')
    characterTopContainer.classList.add('character-top-container')

    infoContainer.classList.add('character-info-container')
    imgCharacterContainer.classList.add('img-character-container')
    favoriteButton.classList.add('playcard-btn')
    removeFromFavoriteButton.classList.add('playcard-btn')
    playcardLogoContainer.classList.add('playcard-logo-container')
    characterName.classList.add('character-name-header')
    playcardLogo.classList.add('playcard-logo')
    characterImg.classList.add('character-img')

    displayCharacterObject.appendChild(characterContainer)
    characterContainer.appendChild(characterTopContainer)
    characterContainer.appendChild(imgCharacterContainer)
    characterContainer.appendChild(infoContainer)
    characterTopContainer.appendChild(favoriteButton)
    characterTopContainer.appendChild(removeFromFavoriteButton)
    characterTopContainer.appendChild(playcardLogoContainer)
    playcardLogoContainer.appendChild(playcardLogo)

    imgCharacterContainer.appendChild(characterImg)
    infoContainer.appendChild(characterName)
    infoContainer.appendChild(characterSpecies)
    infoContainer.appendChild(characterGender)
    infoContainer.appendChild(characterStatus)

    removeFromFavoriteButton.innerHTML =
        `<button>X</button>`
    favoriteButton.innerHTML =
        `<button>&hearts;</button>`

    removeFromFavoriteButton.style.margin = '0'
    removeFromFavoriteButton.style.padding = '0'
    favoriteButton.style.margin = '0'
    favoriteButton.style.padding = '0'
    characterGender.style.margin = '0'
    characterStatus.style.margin = '0'
    characterSpecies.style.margin = '0'
    playcardLogo.src = 'img/rickandmorty_logo_og.png'
    characterName.textContent = data.name
    characterImg.src = data.image
    characterStatus.innerHTML =
        `<p class="character-info">Status: <span>${data.status}</span></p>`

    characterSpecies.innerHTML =
        `<p class="character-info">Species: <span>${data.species}</span></p>`

    characterGender.innerHTML =
        `<p class="character-info">Gender: <span>${data.gender}</span></p>`

    // start condition
    removeFromFavoriteButton.style.display = 'none'

    favoriteButton.addEventListener('click', () => {
        // Lägger till
        console.log('Lägger till')
        let arrayFromLocalStorage = []
        arrayFromLocalStorage = JSON.parse(localStorage.getItem('favorite'))
        
        if(arrayFromLocalStorage){
            arrayFromLocalStorage.push(data)
            localStorage.setItem('favorite', JSON.stringify(arrayFromLocalStorage))
        }if(!arrayFromLocalStorage){
            let favorite = []
            favorite.push(data)
            localStorage.setItem('favorite', JSON.stringify(favorite))
        }

        favoriteButton.style.display = 'none'
        removeFromFavoriteButton.style.display = 'grid'
    })

    // If the card already is in the list, the favorite-button note visible
    let arrayFromLocalStorage = []
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('favorite'))
    if(arrayFromLocalStorage){
        for (let i = 0; i < arrayFromLocalStorage.length; i++) {
            if (arrayFromLocalStorage[i].id === data.id) {
                favoriteButton.style.display = 'none'
                removeFromFavoriteButton.style.display = 'grid'
            }
        }
    }
    removeFromFavoriteButton.addEventListener('click', () => {
        console.log('remove button pressed')
        let favorite = []
        favorite = JSON.parse(localStorage.getItem('favorite'))
        for (let i = 0; i < favorite.length; i++) {
            if (favorite[i].id === data.id) {
                favorite.pop(data)
                console.log('Borttagen')
            }
        }
        favoriteButton.style.display = 'grid'
        removeFromFavoriteButton.style.display = 'none'
        localStorage.setItem('favorite', JSON.stringify(favorite))
    })
}

showMeFavoritButton.addEventListener('click', ()=>{
    console.log(displayCharacterContainer.querySelectorAll('character-name-header'))
    getAllInFavoriteList()
    showMeFavoritButton.value = 'Update' 
})

function getAllInFavoriteList() {
    clearCardContainer()
    let arrayFromLocalStorage = []
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('favorite'))
    if (arrayFromLocalStorage) {
        for (let i = 0; i < arrayFromLocalStorage.length; i++) {
            playcardMakerFromFavoriteList(arrayFromLocalStorage[i])
        }
    }
}


function removeCharacterObject() {
    while (displayCharacterObject.firstChild) {
        displayCharacterObject.firstChild.remove()
    }

}

function clearCardContainer() {
    while (displayCharacterContainer.firstChild) {
        displayCharacterContainer.firstChild.remove()
    }
}

function removeEpisodeObject() {
    while (displayEpisodeObject.firstChild) {
        displayEpisodeObject.firstChild.remove()
    }
}

function removeAllInList() {
    while (displayEpisodeList.firstChild) {
        displayEpisodeList.firstChild.remove()
    }
}

function removeAllCharacterInList() {
    while (displayCharacterList.firstChild) {
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

fetch(url + '/character/244, 47, 154, 598, 2').then(response => response.json())
    .then(data => {
        data.forEach(character => {
            characterPresentationMaker(character)
        });
    })



///////////////////////////////////////////
// CHART /// HTML UTKOMMENTERAD

// function characterChart(array){

//     let characters = ''

//     for (let i = 0; i < array.length; i++){
//         characters += array[i].id + ','
//         if(array)
//     }

//     let input = 'Someone'

// fetch(url+'/character/1,2,3,4,5')
// .then(response => response.json())
// .then(result => {

//     /* Chart.js demo */
//     // selecterar id från html
//     const ctx = document.getElementById('myChart').getContext('2d')

//     // för att få ut alla data från objektet på api/server/lokal jsonfil behöver vi skapa lådor som just nu är tomma men ska fyllas för att sen arbeta längre ner 
//     const data = [],
//     labels = []


// // vi ska mata in data, enskilt, i våra tomma lådor(arrayer)

// for (let i = 0; i < result.length; i++){

//     const character = result[i]

//     data.push(character.episode.length)
//     labels.push(character.name)

// }

// const myChart = new Chart(ctx, {

//     type: 'polarArea',
//     data: {
//         labels: labels,
//         datasets: [{
//             label: `${input}`,

//             data: data,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

// })

// }


let input = 'Someone'

fetch(url + '/character/1,2,3,4,5')
    .then(response => response.json())
    .then(result => {

        /* Chart.js demo */
        // selecterar id från html
        const ctx = document.getElementById('myChart').getContext('2d')

        // för att få ut alla data från objektet på api/server/lokal jsonfil behöver vi skapa lådor som just nu är tomma men ska fyllas för att sen arbeta längre ner 
        const data = [],
            labels = []


        // vi ska mata in data, enskilt, i våra tomma lådor(arrayer)

        for (let i = 0; i < result.length; i++) {

            const character = result[i]

            data.push(character.episode.length)
            labels.push(character.name)
            characterStats(result[i])
        }

        const myChart = new Chart(ctx, {

            type: 'polarArea',
            data: {
                labels: labels,
                datasets: [{
                    label: `${input}`,

                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    })

// Stats characters
function characterStats(data) {
    // Create

    const statsWrapper = document.createElement('div')
    const statsImgContainer = document.createElement('div')
    const statsImg = document.createElement('img')
    const statsHeaderContainer = document.createElement('div')
    const statsHeader = document.createElement('p')

    // Classlist
    statsWrapper.classList.add
    ('stats-wrapper')
    statsImgContainer.classList.add('stats-img-container')
    statsImg.classList.add('stats-img')

    statsHeaderContainer.classList.add('stats-header-container')
    statsHeader.classList.add('stats-header')

    // Append
    charactersStats.appendChild(statsWrapper)
    statsWrapper.appendChild(statsImgContainer)
    statsImgContainer.appendChild(statsImg)
    statsWrapper.appendChild(statsHeaderContainer)
    statsHeaderContainer.appendChild(statsHeader)

    statsImg.src = data.image
    statsHeader.innerHTML =
        `<p class="stats-header">${data.name}</p>`
}

