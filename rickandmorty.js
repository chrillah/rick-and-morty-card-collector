// hämtar alla avsnitt

const url = 'https://rickandmortyapi.com/api'

// SKA HÄMTA ALLA EPISODER MEN GÖR INTE DET....
// fetch(url+'/episode')
// .then(response=>response.json())
// .then(data=>{
//     let array = []
//     console.log(data.results[2])

//     // VARFÖR INTE SKRIVA UT ALLA I EN LISTA???
//     for (let i = 0; i < data.length; i++){
//         //array.push(data[i])
//         console.log(data)
//     }

//     console.log(array)
// })

//episode object
// fetch(url+'/episode/3')
// .then(response => response.json())
// .then(data => {
//     console.log(data)
// })




const displayTest = document.querySelector('#display-test')
const img = document.createElement('img')
// karaktärer
fetch(url+'/character/1')
.then(response => response.json())
.then(data => {
    img.src = data.image
    console.log(data)
    console.log(data.name)
    console.log(data)
})

displayTest.appendChild(img)