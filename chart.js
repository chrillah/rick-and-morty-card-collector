//const url = 
const inputLabel = 'Sveriges städer och invånare'

fetch('https://avancera.app/cities/')
.then(response => response.json())
.then(result => {

    /* Chart.js demo */
    // selecterar id från html
    const ctx = document.getElementById('myChart').getContext('2d')

    // för att få ut alla data från objektet på api/server/lokal jsonfil behöver vi skapa lådor som just nu är tomma men ska fyllas för att sen arbeta längre ner 
    const data = [],
    labels = []
    // vi ska mata in data, enskilt, i våra tomma lådor(arrayer)
    for (let n = 0; n < result.length; n++){
    // skapar en array som vi matar in resultatet som vi får från api, en efter en
    const city = result[n]

    // nu fyller vi in lådorna med information
    data.push(city.population)
    labels.push(city.name)

}
// population
// console.log(data)
// // namn
// console.log(labels)
// kopierat från: https://www.chartjs.org/docs/latest/
const myChart = new Chart(ctx, {
    
    // här kan man byta chart-types 
    // kolla här: https://www.chartjs.org/docs/latest/charts/area.html
    type: 'polarArea',
    data: {
        // lägger till labels -arrayen här
        labels: labels,
        datasets: [{
            label: ``,

            // data-arrayen läggs in här
            data: data,
            backgroundColor: [
                '#108E74',
                '#F3CC16',
                '#EF5C5E',
                '#ffffff'
            ],
            borderColor: [
                '#000000'
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