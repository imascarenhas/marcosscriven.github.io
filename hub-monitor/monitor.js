function run() {
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js').done(
        () => {
            document.body.className = '';
            $("body").html('<canvas id="signalToNoiseRatio" width="400" height="300"></canvas>');
            getData();
            createChart('signalToNoiseRatio');
        }
    );
}

function getData() {
    console.log("Getting data.");
    fetch('walk?oids=1.3.6.1.4.1.4491.2.1.20.1.24.1.1').then(x => {
        return x.json();
    }).then(rawData => {
        var data = [];
        for (key in rawData) {
            var value = rawData[key];
            var integerValue = Number(value);
            if(!Number.isNaN(integerValue)) {
                data.push(integerValue/10);
            }
        };
        console.log("Data:" + data);
    });
}

function createChart(id) {
    console.log("Creating chart.");
    var ctx = document.getElementById(id);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: 'Signal to Noise Ratio',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
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
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}