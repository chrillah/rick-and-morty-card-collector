/* GLOBAL VARIABLES */
const url = 'https://rickandmortyapi.com/api'

// 001 
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

const humanCardsList = []
const alienCardsList = []
const mythicalCreatureCardsList = []

// List container
const displayEpisodeList = document.querySelector('#display-episode-list')
const displayCharacterList = document.querySelector('#display-character-list')

// object container
const displayEpisodeObject = document.querySelector('#display-episode-object')
const displayOnePlaycardObject = document.querySelector('#display-one-playcard-object')
const displayPlaycardsContainer = document.querySelector('#display-playcards-container')
const charactersStats = document.querySelector('#characters-stats')

const mainCharacterGalleryContainer = document.querySelector('#main-character-gallery-container')

const favoriteHeader = document.querySelector('#favorite-header')
const cardMessageContainer = document.querySelector('#card-message-container')
const cardSortText = document.querySelector('#card-sort-text')

let statsCharacterID = ''
const cardMessage = document.createElement('h1')
cardMessage.classList.add('main-header')
cardSortText.classList.add('main-text')
cardMessageContainer.appendChild(cardMessage)

const season1 = document.querySelector('#season-1')
const season2 = document.querySelector('#season-2')
const season3 = document.querySelector('#season-3')
const season4 = document.querySelector('#season-4')
const season5 = document.querySelector('#season-5')

// START CONDITION
let arrayFromLocalStorage = []
arrayFromLocalStorage = JSON.parse(localStorage.getItem('favorite'))
startMessadeDisplayer()

if (arrayFromLocalStorage) {
    cardMessageDisplayer()
    for (let i = 0; i < arrayFromLocalStorage.length; i++) {
        playcardMakerFromFavoriteList(arrayFromLocalStorage[i])
    }
    displayPlaycardsContainer.style.gridTemplateColumns = `repeat(${arrayFromLocalStorage.length}, 100px)`
}

/* FUNCTIONS */
function startMessadeDisplayer(){
    const messageContainer = document.createElement('div')
    displayEpisodeList.appendChild(messageContainer)
    messageContainer.innerHTML = `
    <p class="message-text">Pick a season between 1 - 5 and start scrolling through 
        <br>
        the episodes! 
        <br>
        <br>
        Don't forget to hit that heart!
    </p>`
}
function noCards(){
    const messageContainer = document.createElement('div')
    displayPlaycardsContainer.appendChild(messageContainer)
    messageContainer.innerHTML = `
    <p class="message-text">
        Yeah, why not collect? Go to the "episode scroll finder thingy"...
    </p>`
}


// 002
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

// 003
// makes an episode-list-item
function episodeListMaker(data) {
    removePlaycardObject()
    removeEpisodeObject()
    removeAllInList()

    for (let i = 0; i < data.length; i++) {
        const listItem = document.createElement('li')
        const itemInformation = document.createElement('p')
        listItem.classList.add('episode-btn')

        itemInformation.style.padding = '0'
        itemInformation.style.margin = '0'
        listItem.style.margin = '0'
        listItem.style.padding = '0'

        listItem.innerHTML =
            `<li><p style=" font-weight: bold" >${data[i].name}</p></li>`
        itemInformation.innerHTML =
            `<p class="episode-information" >Episode: <span>${data[i].episode}</span></p>`

        listItem.appendChild(itemInformation)
        displayEpisodeList.appendChild(listItem)

        listItem.addEventListener('click', () => {
            const btnPressed = displayEpisodeList.querySelectorAll('.episode-btn-pressed')
            btnPressed.forEach(btn => {
                btn.classList.remove('episode-btn-pressed')
            })
            listItem.classList.add('episode-btn-pressed')
            removePlaycardObject()
            removeEpisodeObject()
            episodeObjectMaker(data[i])
        })
    }
}


// SKAPAR EPISODEOBJECT
// Makes an episode object
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

    episodeTitle.classList.add('episode-name')
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

    // SKICKAR IN EN LISTA MED KARAKTÄRER
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
            characterListFromEpisode(data)
        })
}

// KORTDESIGN
// MAKES PLAYCARDS TO FAVORITE-CONTAINER
function playcardMakerFromFavoriteList(data) {

    const characterContainer = document.createElement('div')
    const characterTopContainer = document.createElement('div')

    const removeFromFavoriteButton = document.createElement('button')

    const infoContainer = document.createElement('div')
    const playcardLogoContainer = document.createElement('div')
    const characterImg = document.createElement('img')
    const playcardLogo = document.createElement('img')
    const heartSymbol = document.createElement('img')
    const imgCharacterContainer = document.createElement('div')

    const characterName = document.createElement('h3')

    const characterSpecies = document.createElement('p')
    const characterGender = document.createElement('p')
    const characterStatus = document.createElement('p')

    characterContainer.classList.add('character-container')
    characterTopContainer.classList.add('character-top-container')

    infoContainer.classList.add('character-info-container')
    imgCharacterContainer.classList.add('img-character-container')
    heartSymbol.classList.add('heart-symbol')
    removeFromFavoriteButton.classList.add('playcard-btn')
    playcardLogoContainer.classList.add('playcard-logo-container')
    characterName.classList.add('character-name-header')
    playcardLogo.classList.add('playcard-logo')
    characterImg.classList.add('character-img')

    displayPlaycardsContainer.appendChild(characterContainer)
    characterContainer.appendChild(characterTopContainer)
    characterContainer.appendChild(imgCharacterContainer)
    characterContainer.appendChild(infoContainer)
    characterTopContainer.appendChild(removeFromFavoriteButton)
    removeFromFavoriteButton.appendChild(heartSymbol)
    characterTopContainer.appendChild(playcardLogoContainer)
    playcardLogoContainer.appendChild(playcardLogo)

    imgCharacterContainer.appendChild(characterImg)
    infoContainer.appendChild(characterName)
    infoContainer.appendChild(characterSpecies)
    infoContainer.appendChild(characterGender)
    infoContainer.appendChild(characterStatus)

    heartSymbol.src = 'img/heart_symbol.png'

    if (data.species === 'Alien') {
        characterContainer.style.backgroundColor = '#6050A1'
        infoContainer.style.backgroundColor = '#C07D2B'
        characterContainer.style.border = '5px solid #C07D2B'
        imgCharacterContainer.style.border = '5px solid #C07D2B'
    }

    if (data.species === 'Mythological Creature') {
        characterContainer.style.backgroundColor = '#1C4589'
        infoContainer.style.backgroundColor = '#D49CC6'
        characterContainer.style.border = '5px solid #D49CC6'
        imgCharacterContainer.style.border = '5px solid #D49CC6'
    }

    if (data.species === 'Robot') {
        characterContainer.style.backgroundColor = '#F59492'
        characterContainer.style.border = '5px solid #F3CC15'
        imgCharacterContainer.style.border = '5px solid #F3CC15'
        infoContainer.style.backgroundColor = '#F3CC15'
    }

    if (data.species === 'Animal') {
        characterContainer.style.backgroundColor = '#BCB0BF'
        characterContainer.style.border = '5px solid #F3CC15'
        imgCharacterContainer.style.border = '5px solid #F3CC15'
        infoContainer.style.backgroundColor = '#F3CC15'
    }
    if (data.species !== 'Animal' && data.species !== 'Human' && data.species !== 'Robot' && data.species !== 'Mythological Creature' && data.species !== 'Alien') {
        characterContainer.style.background = 'rgb(238,174,202)'
        characterContainer.style.background = 'linear-gradient(140deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
        characterContainer.style.border = '5px solid #D49CC6'
        imgCharacterContainer.style.border = '5px solid #D49CC6'
        infoContainer.style.backgroundColor = '#D49CC6'
    }

    removeFromFavoriteButton.style.margin = '0'
    removeFromFavoriteButton.style.padding = '0'

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

    removeFromFavoriteButton.addEventListener('click', () => {
        displayPlaycardsContainer.removeChild(characterContainer)
        let favorite = []
        favorite = JSON.parse(localStorage.getItem('favorite'))
        let newArray = []
        for (let i = 0; i < favorite.length; i++) {
            if (favorite[i].id !== data.id) {
                newArray.push(favorite[i])
            }
        }
        localStorage.setItem('favorite', JSON.stringify(newArray))
        removePlaycardObject()
        cardMessageDisplayer()
        getAllInFavoriteList()
    })
}

// Adds character from episodeObject to list-item
function characterListFromEpisode(data) {
    const listItem = document.createElement('li')
    listItem.classList.add('character-list-item')

    listItem.classList.add('character-btn')
    listItem.textContent = data.name
    displayCharacterList.appendChild(listItem)
    listItem.addEventListener('click', () => {
        const btnPressed = displayCharacterList.querySelectorAll('.character-btn-pressed')
        btnPressed.forEach(btn => {
            btn.classList.remove('character-btn-pressed')
        })
        listItem.classList.add('character-btn-pressed')

        playcardObjectMaker(data)
    })
}

// Presentation gallery, needs to receive on data-object
function characterPresentationMaker(data) {

    const characterCardContainer = document.createElement('div')
    const characterImgContainer = document.createElement('div')
    const cardImg = document.createElement('img')
    const characterCardInformationContainer = document.createElement('div')
    const characterHeader = document.createElement('p')

    characterCardContainer.classList.add('presentation-container')
    characterImgContainer.classList.add('presentation-img-container')
    cardImg.classList.add('card-img')
    characterCardInformationContainer.classList.add('presentation-information-container')
    characterHeader.classList.add('presentation-header')

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

// MAKES ONE PLAYCARD IN EPISODE OBJECT
function playcardObjectMaker(data) {
    removePlaycardObject()

    const characterContainer = document.createElement('div')
    const characterTopContainer = document.createElement('div')

    const favoriteButton = document.createElement('button')
    const removeFromFavoriteButton = document.createElement('button')

    const infoContainer = document.createElement('div')
    const playcardLogoContainer = document.createElement('div')
    const characterImg = document.createElement('img')
    const playcardLogo = document.createElement('img')
    const heartSymbol = document.createElement('img')
    const noHeartSymbol = document.createElement('img')
    const imgCharacterContainer = document.createElement('div')

    const characterName = document.createElement('h3')

    const characterSpecies = document.createElement('p')
    const characterGender = document.createElement('p')
    const characterStatus = document.createElement('p')

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
    heartSymbol.classList.add('heart-symbol')
    noHeartSymbol.classList.add('heart-symbol')

    displayOnePlaycardObject.appendChild(characterContainer)
    characterContainer.appendChild(characterTopContainer)
    characterContainer.appendChild(imgCharacterContainer)
    characterContainer.appendChild(infoContainer)
    characterTopContainer.appendChild(favoriteButton)
    characterTopContainer.appendChild(removeFromFavoriteButton)
    favoriteButton.appendChild(noHeartSymbol)
    removeFromFavoriteButton.appendChild(heartSymbol)
    characterTopContainer.appendChild(playcardLogoContainer)
    playcardLogoContainer.appendChild(playcardLogo)

    imgCharacterContainer.appendChild(characterImg)
    infoContainer.appendChild(characterName)
    infoContainer.appendChild(characterSpecies)
    infoContainer.appendChild(characterGender)
    infoContainer.appendChild(characterStatus)

    heartSymbol.src = 'img/heart_symbol.png'
    noHeartSymbol.src = 'img/no_heart_symbol.png'

    // KORTDESIGN
    if (data.species === 'Alien') {
        characterContainer.style.backgroundColor = '#6050A1'
        infoContainer.style.backgroundColor = '#C07D2B'
        characterContainer.style.border = '5px solid #C07D2B'
        imgCharacterContainer.style.border = '5px solid #C07D2B'
    }

    if (data.species === 'Mythological Creature') {
        characterContainer.style.backgroundColor = '#1C4589'
        infoContainer.style.backgroundColor = '#D49CC6'
        characterContainer.style.border = '5px solid #D49CC6'
        imgCharacterContainer.style.border = '5px solid #D49CC6'
    }

    if (data.species === 'Robot') {
        characterContainer.style.backgroundColor = '#F59492'
        characterContainer.style.border = '5px solid #F3CC15'
        imgCharacterContainer.style.border = '5px solid #F3CC15'
        infoContainer.style.backgroundColor = '#F3CC15'
    }

    if (data.species === 'Animal') {
        characterContainer.style.backgroundColor = '#BCB0BF'
        characterContainer.style.border = '5px solid #F3CC15'
        imgCharacterContainer.style.border = '5px solid #F3CC15'
        infoContainer.style.backgroundColor = '#F3CC15'
    }

    if (data.species !== 'Animal' && data.species !== 'Human' && data.species !== 'Robot' && data.species !== 'Mythological Creature' && data.species !== 'Alien') {
        characterContainer.style.background = 'rgb(238,174,202)'
        characterContainer.style.background = 'linear-gradient(140deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
        characterContainer.style.border = '5px solid #D49CC6'
        imgCharacterContainer.style.border = '5px solid #D49CC6'
        infoContainer.style.backgroundColor = '#D49CC6'
    }

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

    removeFromFavoriteButton.style.display = 'none'

    favoriteButton.addEventListener('click', () => {
        let arrayFromLocalStorage = []
        arrayFromLocalStorage = JSON.parse(localStorage.getItem('favorite'))

        if (arrayFromLocalStorage) {
            arrayFromLocalStorage.push(data)
            localStorage.setItem('favorite', JSON.stringify(arrayFromLocalStorage))
        } if (!arrayFromLocalStorage) {
            let favorite = []
            favorite.push(data)
            localStorage.setItem('favorite', JSON.stringify(favorite))
        }

        favoriteButton.style.display = 'none'
        removeFromFavoriteButton.style.display = 'grid'
        getAllInFavoriteList()
        cardMessageDisplayer()
    })

    // If the card already is in the list, the favorite-button note visible
    let arrayFromLocalStorage = []
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('favorite'))
    if (arrayFromLocalStorage) {
        for (let i = 0; i < arrayFromLocalStorage.length; i++) {
            if (arrayFromLocalStorage[i].id === data.id) {
                favoriteButton.style.display = 'none'
                removeFromFavoriteButton.style.display = 'grid'
            }
        }
    }
    removeFromFavoriteButton.addEventListener('click', () => {
        let favorite = []
        favorite = JSON.parse(localStorage.getItem('favorite'))
        let newArray = []
        for (let i = 0; i < favorite.length; i++) {
            if (favorite[i].id !== data.id) {
                newArray.push(favorite[i])
            }
        }
        favoriteButton.style.display = 'grid'
        removeFromFavoriteButton.style.display = 'none'
        localStorage.setItem('favorite', JSON.stringify(newArray))
        getAllInFavoriteList()
        cardMessageDisplayer()
    })
}

// Adds cards to container
function getAllInFavoriteList() {

    clearCardContainer()

    let arrayFromLocalStorage = []
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('favorite'))
    if (arrayFromLocalStorage) {
        for (let i = 0; i < arrayFromLocalStorage.length; i++) {
            playcardMakerFromFavoriteList(arrayFromLocalStorage[i])
        }
        displayPlaycardsContainer.style.gridTemplateColumns = `repeat(${arrayFromLocalStorage.length}, 100px)`
    }
}

function removePlaycardObject() {
    while (displayOnePlaycardObject.firstChild) {
        displayOnePlaycardObject.firstChild.remove()
    }

}

function clearCardContainer() {
    while (displayPlaycardsContainer.firstChild) {
        displayPlaycardsContainer.firstChild.remove()
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

// Displays numnber of cards
function cardMessageDisplayer() {

    let arrayFromLocalStorage = []
    arrayFromLocalStorage = JSON.parse(localStorage.getItem('favorite'))

    if ((arrayFromLocalStorage.length) < 1) {
        cardMessage.innerHTML = `<h1 class="main-header">You have currently <span>${arrayFromLocalStorage.length}</span> card in your collection, why not collect?</h1>`
        noCards()
    }

    if ((arrayFromLocalStorage.length) > 0) {
        cardMessage.innerHTML = `<h1 class="main-header">You have currently only <span>${arrayFromLocalStorage.length}</span> card in your collection, why not collect more?</h1>`
    }

    if ((arrayFromLocalStorage.length) > 1) {
        cardMessage.innerHTML = `You have currently <span>${arrayFromLocalStorage.length}</span> cards in your collection</h1>`
    }

}

/* FETCH */

// Fetch and Displays characters in the main intro
fetch(url + '/character/244, 47, 154, 598, 2,744, 752, 329').then(response => response.json())
    .then(data => {
        data.forEach(character => {
            characterPresentationMaker(character)
        });
    })


let input = 'Someone'
fetch(url + '/character/1,2,3,4,5,47,154,118, 242' + statsCharacterID)
    .then(response => response.json())
    .then(result => {

        const ctx = document.getElementById('myChart').getContext('2d')

        const data = [],
            labels = []

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
                        'rgba(212, 156, 198, 0.2)',
                        'rgba(28, 69, 137, 0.2)',
                        'rgba(10, 116, 106, 0.2)',
                        'rgba(192, 125, 43, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(190, 37, 39, 0.2)'
                    ],
                    borderColor: [
                        'rgba(212, 156, 198, 1)',
                        'rgba(28, 69, 137, 1)',
                        'rgba(10, 116, 106, 1)',
                        'rgba(192, 125, 43, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(190, 37, 39, 1)'
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
    const statsWrapper = document.createElement('div')
    const statsImgContainer = document.createElement('div')
    const statsImg = document.createElement('img')
    const statsHeaderContainer = document.createElement('div')
    const statsHeader = document.createElement('p')

    statsWrapper.classList.add
        ('stats-wrapper')
    statsImgContainer.classList.add('stats-img-container')
    statsImg.classList.add('stats-img')

    statsHeaderContainer.classList.add('stats-header-container')
    statsHeader.classList.add('stats-header')

    charactersStats.appendChild(statsWrapper)
    statsWrapper.appendChild(statsImgContainer)
    statsImgContainer.appendChild(statsImg)
    statsWrapper.appendChild(statsHeaderContainer)
    statsHeaderContainer.appendChild(statsHeader)

    statsImg.src = data.image
    statsHeader.innerHTML =
        `<p class="stats-header">${data.name}</p>`
}

