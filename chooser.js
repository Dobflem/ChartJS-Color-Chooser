$(document).ready(function(){
    var ctx = $("#lineChart");
    var bgColor = "rgba(255, 0, 0, 0.2)";
    var borderColor = "rgba(255, 0, 0, 1)";
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
    
    function updateChartColor(color) {
        var fill = "rgba("+color.r+","+color.g+","+color.b+", 0.2)";
        var stroke = "rgba("+color.r+","+color.g+","+color.b+", 1)";
        lineChart.data.datasets[0].backgroundColor = fill;
        lineChart.data.datasets[0].borderColor = stroke;
        lineChart.update();
    }
    
    $(".spectrum").spectrum({
        color: '#F00',
        flat: true,
        move: function(color) {
            updateChartColor(color.toRgb());
        }
    });
});