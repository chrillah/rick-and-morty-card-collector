console.log('TEST AREA')

const topListFromServer = []

//const gameUrl = `https://opencritic-api.p.rapidapi.com/game/`

//const urlGame = ``

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'b4fd525005mshf0bd09f7f6ae404p17e6f4jsneae6145e15d1',
//         'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
//     }
// };

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '67f6cf233dmsh8f82c4ed50ef23cp14dc22jsnf20013bdf071',
		'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
	}
};

const displayTopListContainer = document.querySelector('#display-top-list-container')

const displayUpcomingListContainer = document.querySelector('#display-upcoming-list-container')

// // topplista spel POPULAR
// fetch(gameUrl+'popular', options)
// .then(response => response.json())
// .then(data => {


//     toplistItemCreator(data)
//     for (let i = 0; i < data.length; i++){
//         console.log(data[i].id)
//         //topListFromServer.push(data[i])
//     }
//     //localStorage.setItem('topListGames', JSON.stringify(topListFromServer))
// })
// .catch(err => console.error(err));

//SPARAR TOPLISTGAMES
//const topListGames = JSON.parse(localStorage.getItem('topGameList'))







// Skriver ut topGameList
// skriver ut från
//toplistItemCreator(topListGames)
function toplistItemCreator(data){

        // bilder - funkar ej?
        // console.log(data[i].images.box)
        // console.log(data[i])
        // console.log(data[i].name)
        // console.log('id '+data[i].id)
        // console.log(data[i].topCriticScore)

    for(let i = 0; i < data.length; i++){
        const listItem = document.createElement('li')
        listItem.innerHTML=
        `<li>
            <p class="top-list-name">${data[i].name}</p>
            <p class="top-list-critic"> Score: ${data[i].topCriticScore}
            </p>
            <p class="game-id"> id: ${data[i].id}
            </p>
        </li>`
        displayTopListContainer.appendChild(listItem)
    }
}


// Kommande releases UPCOMING
// fetch(gameUrl+'upcoming', options)
// .then(response => response.json())
// .then(data => {
//     let fromToday = new Date()
//     console.log(fromToday.toString())
//     for( let i = 0; i < data.length; i++){
//         // console.log(data[i].name)
//         // console.log(data[i].firstReleaseDate)
//         let date = data[i].firstReleaseDate
//         console.log(date)

//         const listItem = document.createElement('li')
//         listItem.innerHTML=
//         `<li>
//             <p class="upcoming-list-name">${data[i].name}</p>
//             <p class="upcoming-list-release">Release Date: ${date}
//             </p>
//         </li>`
//         displayUpcomingListContainer.appendChild(listItem)
//     }
// })
// .catch(err => console.error(err));

// kommande releaser
function upcomingListItemCreator(data){
    // bilder - funkar ej?
    // console.log(data[i].images.box)
    // console.log(data[i])
    // console.log(data[i].name)
    // console.log('id '+data[i].id)
    // console.log(data[i].topCriticScore)

    for(let i = 0; i < data.length; i++){
        const listItem = document.createElement('li')
        listItem.innerHTML=
        `<li class="game-list-item">
            <p class="upcoming-list-name">${data[i].name}</p>
            <p class="upcoming-list-release">Releasedate: ${data[i].firstReleaseDate}
            </p>
            <p class="test-game-id">${data[i].id}</p>
            <p class="game-id"> id: ${data[i].id}
            </p>
        </li>`
        displayUpcomingListContainer.appendChild(listItem)
    }
}


// get a game via id

let testId = 0

//${testId}

fetch(gameUrl+'463', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));