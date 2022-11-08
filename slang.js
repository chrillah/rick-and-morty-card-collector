const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '67f6cf233dmsh8f82c4ed50ef23cp14dc22jsnf20013bdf071',
        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com' }
};
    
fetch('https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=wat', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));