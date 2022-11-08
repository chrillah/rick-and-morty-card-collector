const displayGameResult = document.querySelector('#display-game-result')

fetch('https://www.cheapshark.com/api/1.0/games?id=612')
.then(resp=>resp.json())
.then(data=>{
    console.log(data)
    console.log(data.info.thumb)
    console.log(data.cheapestPriceEver.price)
    console.log(data.info.title)
})