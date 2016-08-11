$(document).ready(function() {
    // Chart.defaults.global.defaultFontColor = "#000";
    Chart.defaults.global.defaultFontColor = "#FFF";    


    var ctx = $("#lineChart");
    var bgColor = "rgba(255, 0, 0, 0.2)";
    var borderColor = "rgba(255, 0, 0, 1)";
    var lineColor = document.getElementById("lineColor");
    
    var data = {
        labels: ["Demo", "Demo", "Demo", "Demo", "Demo"],
        datasets: [
            {
                label: "Demo Dataset",
                backgroundColor: bgColor,
                borderColor: borderColor,
                data: [10, 20, 5, 15, 20]
            }
        ]
    };

    var lineChart = new Chart(ctx, {
        type: 'line',
        data: data
    });
    
    function updateChartColor(col) {
        var color = col.toRgb();
        var c = "rgba("+color.r+","+color.g+","+color.b+",";
        var fill = c + "0.2)"; // Make it lighter color
        var stroke = c + "1)"; // Make it normal color
        var hex = col.toHex().toUpperCase();
        lineColor.innerHTML = '#' + hex;
        lineChart.data.datasets[0].backgroundColor = fill;
        lineChart.data.datasets[0].borderColor = stroke;
        lineChart.update();
    }
    
    $(".spectrum").spectrum({
        color: '#F00',
        flat: true,
        move: function(color) {
            updateChartColor(color);
        }
    });
});
