// Form section

const form = document.querySelector('#form')
const nameInput = document.querySelector('#name-input')
const populationInput = document.querySelector('#population-input')
const send = document.querySelector('#send')

/* TEST AREA */
const result = document.querySelector('#result')
const fetcha = document.querySelector('#fetcha')
/* TEST AREA */

/* variabler till databasen*/
let inputName = ''
let inputPopulation = ''

// todo Göra ett naken form för att ta emot ett värde från användaren
/* 
Form 

fånga input från användaren i variabler


konvertera input till population med int.parse

addEventlistiner till input som fångar upp info från användaren


Fetch

när form är klar och den fångar upp värden från användaren, testat så att informationen loggas ut, kolla upp:

POST-anrop från avancera/ anteckningarna
PATCH-anrop */

nameInput.addEventListener('input', ()=>{
    inputNameValue()
})

populationInput.addEventListener('input',()=>{
    inputPopulationValue()
})

form.addEventListener('submit',(event)=>{
    event.preventDefault()

    // let arrayTest = []
    // arrayTest.push
    // (
    //     {
    //         name: inputName,population : inputPopulation
    //     }
    // )
    // localStorage.setItem('array', JSON.stringify(arrayTest))


    // console.log(JSON.parse(localStorage.getItem('array')))

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

    /* TESTNING */
})


function inputPopulationValue(){
    inputPopulation = parseInt(populationInput.value)
}

function inputNameValue(){
    inputName = nameInput.value
}

fetcha.addEventListener('click', ()=>{
    fetch('https://avancera.app/cities/')
    .then(resp=>resp.json())
    .then(res=>{
        console.log(res)
        localStorage.setItem('cities', JSON.stringify(res))
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