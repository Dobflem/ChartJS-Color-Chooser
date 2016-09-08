$(document).ready(function() {
    Chart.defaults.global.defaultFontColor = "#FFF";    
    var Options = {
        line: {
            hexColor: "#F00",
            rgbColor: {
                r: 255,
                g: 0,
                b: 0,
                a: 1
            },
            transparency: "0.2"
        }
    };
    
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
    
    $("#line-transparency").val(Options.line.transparency);
    
    function updateLineChart() {
        var color = Options.line.rgbColor;
        var c = "rgba("+color.r+","+color.g+","+color.b+",";
        var fill = c + Options.line.transparency + ")"; // Make it lighter color
        var stroke = c + "1)"; // Make it normal color
        lineColor.innerHTML = Options.line.hexColor;
        lineChart.data.datasets[0].backgroundColor = fill;
        lineChart.data.datasets[0].borderColor = stroke;
        lineChart.update();
    }
    
    $(".spectrum").spectrum({
        color: '#F00',
        flat: true,
        move: function(color) {
            Options.line.rgbColor = color.toRgb();
            Options.line.hexColor = "#" + color.toHex();
            updateLineChart();
        }
    });
    
    $("#line-transparency").bind('keyup mouseup', function () {
        Options.line.transparency = $(this).val();
        updateLineChart();
    });

});
