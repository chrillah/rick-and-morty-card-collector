// URL
const url = `https://www.boredapi.com/api/`


//fetch a random activity
// fetch(url+"activity/")
// .then(response=>response.json())
// .then(data =>{
//     console.log('Activity '+data.activity)
//     console.log('Type '+data.type)
//     console.log('Participants '+data.participants)
//     console.log("Price "+data.price)
//     console.log(data.key)
// })

// fetch(url+"/activity?key=8203595")
// .then(response=>response.json())
// .then(data =>{
//     console.log(data)
//     console.log('Activity '+data.activity)
//     console.log('Type '+data.type)
//     console.log('Participants '+data.participants)
//     console.log("Price "+data.price)
//     console.log(data.key)
// })


// Hämtar ett aktivitet med "key" värdet efter key ordet
// fetch("http://www.boredapi.com/api/activity?key=4379552")
// .then(response=>response.json())
// .then(data =>{
//     console.log(data)
//     console.log('Activity '+data.activity)
//     console.log('Type '+data.type)
//     console.log('Participants '+data.participants)
//     console.log("Price "+data.price)
//     console.log(data.key)
// })


// Hämtar typer 
fetch("http://www.boredapi.com/api/activity?type=recreational")
.then(response=>response.json())
.then(data =>{
    console.log(data)
    console.log('Activity '+data.activity)
    //console.log('Type '+data.type)
    console.log('Participants '+data.participants)
    console.log("Price "+data.price)
    console.log(data.key)
})


