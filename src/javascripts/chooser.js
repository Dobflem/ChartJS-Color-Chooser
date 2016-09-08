$(document).ready(function() {
    Chart.defaults.global.defaultFontColor = "#FFF";    
    var Options = {
        currentDataset: 0,
        global: {
            points: true
        },
        line: [
            {
                hexColor: "#FF0000",
                rgbColor: {
                    r: 255,
                    g: 0,
                    b: 0,
                    a: 1
                },
                opacity: "0.5",
                previousRGB: {
                    r: 255,
                    g: 0,
                    b: 0,
                    a: 1
                },
                previousHex: "#FF0000"
            },
            {
                hexColor: "#FF0000",
                rgbColor: {
                    r: 255,
                    g: 0,
                    b: 0,
                    a: 1
                },
                opacity: "0.5",
                previousRGB: {
                    r: 255,
                    g: 0,
                    b: 0,
                    a: 1
                },
                previousHex: "#FF0000"
            }    
        ]
    };
    
    var ctx = $("#lineChart");
    var bgColor = "rgba(255, 0, 0, 0.2)";
    var borderColor = "rgba(255, 0, 0, 1)";
    var lineColorChooser = document.getElementById("line-color-chooser");
    var lineColor = document.getElementById("lineColor");
    lineColor.style.backgroundColor = Options.line[Options.currentDataset].hexColor;
    
    var data = {
        labels: ["Demo", "Demo", "Demo", "Demo", "Demo"],
        datasets: [
            {
                label: "Dataset One",
                backgroundColor: bgColor,
                borderColor: borderColor,
                data: [10, 20, 5, 15, 20]
            },
            {
                label: "Dataset Two",
                backgroundColor: bgColor,
                borderColor: borderColor,
                data: [16, 18, 10, 17, 16]
            }
        ]
    };

    var lineChart = new Chart(ctx, {
        type: 'line',
        data: data
    });
    
    $("#line-opacity").val(Options.line[Options.currentDataset].opacity);
    
    function getTextColor() {
        var rgb = Options.line[Options.currentDataset].rgbColor;
        var or = rgb.r | rgb.g | rgb.b;
        var and = rgb.r & rgb.g & rgb.b;
        
        if (or === 255) {
            return "#000";
        } else if (and === rgb.r) {
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
    
    function updatePreferences() {
        var line = Options.line[Options.currentDataset];
        var color = line.hexColor;
        var opacity = line.opacity;
        var points = Options.global.points;
        
        lineColor.innerHTML = color;
        lineColor.style.backgroundColor = color;
        $("#line-opacity").val(opacity);
        $(".spectrum").spectrum("set", color);
    }
    
    function updateLineChart() {
        var line = Options.line[Options.currentDataset];
        var color = line.rgbColor;
        var c = "rgba("+color.r+","+color.g+","+color.b+",";
        var fill = c + line.opacity + ")";
        var stroke = c + "1)";
        var el = lineChart.config.options.elements;
        
        /* Set the options */
        lineColor.innerHTML = Options.line[Options.currentDataset].hexColor;
        lineColor.style.backgroundColor = line.hexColor;
        lineColor.style.color = getTextColor();
        lineChart.data.datasets[Options.currentDataset].backgroundColor = fill;
        lineChart.data.datasets[Options.currentDataset].borderColor = stroke;
        lineChart.config.options.elements.backgroundColor = "rgba(0,0,0,0)";
        lineChart.config.options.elements.borderColor = "rgba(0,0,0,0)";
        
        /* Turn points on lines on/off */
        if(Options.global.points) {
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
        
        /* The magic method call */
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
            var line = Options.line[Options.currentDataset];
            line.rgbColor = color.toRgb();
            line.hexColor = "#" + color.toHex().toUpperCase();
            updateLineChart();
        }
    });
    
    $("#line-opacity").bind('keyup mouseup', function () {
        if($(this).val()) {
            var line = Options.line[Options.currentDataset];
            line.opacity = $(this).val();
            updateLineChart();
        }
    });
    
    $(".line-item").on('click', function() {
        $("#line-btn").html($(this).html());
    });

    $("#lineColor").on('click', function() {
        $("#line-color-chooser").show();
    });
    
    $("#linePoints").change(function() {
        Options.global.points = $(this).is(":checked");
        updateLineChart();
    });
    
    $("#btn-line-color-save").on('click', function() {
        var line = Options.line[Options.currentDataset];
        line.previousRGB = line.rgbColor;
        line.previousHex = line.hexColor;
        $("#line-color-chooser").hide();
    });
    
    $("#btn-line-color-cancel").on('click', function() {
        var line = Options.line[Options.currentDataset];
        line.rgbColor = line.previousRGB;
        line.hexColor = line.previousHex;
        updateLineChart();
        $("#line-color-chooser").hide();
    });
    
    $("[data-idx]").each(function() {
        $(this).on('click', function() {
            Options.currentDataset = parseInt($(this).data("idx"));
            updatePreferences();
        });
    });
    
    $(window).resize(function() {
        setLineColorChooserPosition();
    });
    
    $("#linePoints").prop("checked", true);
    setLineColorChooserPosition();
    updateLineChart();
    
});
