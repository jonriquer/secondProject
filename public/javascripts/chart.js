let theDataArray = document.querySelector(".hideMe").innerHTML
let newDataArray = [];
let theDates = document.querySelector(".hideDates").innerHTML
let datesArray = theDates.split(',');
let tickerLabel = document.querySelector(".hideLabel").innerHTML

// console.log("************** ", theDataArray.split(","));
console.log("************** ", theDates);

theDataArray.split(',').forEach(oneInt => {
  newDataArray.push(Number(oneInt));
})

console.log("the new array +++++++++++++++ ", newDataArray);

// let tickerLabel = theApiInfo.data["Meta Data"]["2. Symbol"].toUpperCase();
let ticker = document.querySelector("#Ticker").value;
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: datesArray,
        datasets: [{
            label: tickerLabel,
            data: newDataArray,
            backgroundColor: [
              'rgba(54, 162, 235, 0.3)'
                // 'rgba(255, 99, 132, 0.4)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                // 'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});
console.log(myChart)

