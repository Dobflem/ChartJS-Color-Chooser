$(document).ready(function() {
    Chart.defaults.global.defaultFontColor = "#FFF";    
    var Options = {
        line: {
            hexColor: "#FF0000",
            rgbColor: {
                r: 255,
                g: 0,
                b: 0,
                a: 1
            },
            opacity: "0.2",
            previousRGB: {
                r: 255,
                g: 0,
                b: 0,
                a: 1
            },
            previousHex: "#FF0000",
            points: true
        }
    };
    
    var ctx = $("#lineChart");
    var bgColor = "rgba(255, 0, 0, 0.2)";
    var borderColor = "rgba(255, 0, 0, 1)";
    var lineColorChooser = document.getElementById("line-color-chooser");
    var lineColor = document.getElementById("lineColor");
    lineColor.style.backgroundColor = Options.line.hexColor;
    
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
    
    $("#line-opacity").val(Options.line.opacity);
    
    function getTextColor() {
        var or = Options.line.rgbColor.r | Options.line.rgbColor.g | Options.line.rgbColor.b;
        var and = Options.line.rgbColor.r & Options.line.rgbColor.g & Options.line.rgbColor.b;
        
        if (or === 255) {
            return "#000";
        } else if (and === Options.line.rgbColor.r) {
            return (and > 127) ? "#000" : "#FFF";
        } return "#FFF";
    }
    
    function getOffset(el) {
        el = el.getBoundingClientRect();
        return {
            x: el.left + window.scrollX,
            y: el.top + window.scrollY
        }
    }
    
    function updateLineChart() {
        var color = Options.line.rgbColor;
        var c = "rgba("+color.r+","+color.g+","+color.b+",";
        var fill = c + Options.line.opacity + ")"; // Make it lighter color
        var stroke = c + "1)"; // Make it normal color
        var el = lineChart.config.options.elements;
        lineColor.innerHTML = Options.line.hexColor;
        lineColor.style.backgroundColor = Options.line.hexColor;
        lineColor.style.color = getTextColor();
        lineChart.data.datasets[0].backgroundColor = fill;
        lineChart.data.datasets[0].borderColor = stroke;
        lineChart.config.options.elements.backgroundColor = "rgba(0,0,0,0)";
        lineChart.config.options.elements.borderColor = "rgba(0,0,0,0)";
        if(Options.line.points) {
            el.point.borderWidth = 1;
            el.point.hoverBorderWidth = 2;
            el.point.hoverRadius = 4;
            el.point.radius = 3;
        } else {
            el.point.borderWidth = 0;
            el.point.hoverBorderWidth = 0;
            el.point.hoverRadius = 0;
            el.point.radius = 0;
        }
        lineChart.update();
    }
    
    function setLineColorChooserPosition() {
        var offsets = $("#lineColor").position();
        lineColorChooser.style.top = (offsets.top - 93) + "px";
        lineColorChooser.style.left = (offsets.left + 193) + "px";
    }
    
    $(".spectrum").spectrum({
        color: '#F00',
        flat: true,
        move: function(color) {
            Options.line.rgbColor = color.toRgb();
            Options.line.hexColor = "#" + color.toHex().toUpperCase();
            updateLineChart();
        }
    });
    
    $("#line-opacity").bind('keyup mouseup', function () {
        Options.line.opacity = $(this).val();
        updateLineChart();
    });
    
    $(".line-item").on('click', function() {
        $("#line-btn").html($(this).html());
    });

    $("#lineColor").on('click', function() {
        $("#line-color-chooser").show();
    });
    
    $("#linePoints").change(function() {
        Options.line.points = $(this).is(":checked");
        updateLineChart();
    });
    
    $("#btn-line-color-save").on('click', function() {
        Options.line.previousRGB = Options.line.rgbColor;
        Options.line.previousHex = Options.line.hexColor;
        $("#line-color-chooser").hide();
    });
    
    $("#btn-line-color-cancel").on('click', function() {
        Options.line.rgbColor = Options.line.previousRGB;
        Options.line.hexColor = Options.line.previousHex;
        updateLineChart();
        $("#line-color-chooser").hide();
    });
    
    $(window).resize(function() {
        setLineColorChooserPosition();
    });
    
    $("#linePoints").prop("checked", true);
    setLineColorChooserPosition();
    updateLineChart();
    
});
