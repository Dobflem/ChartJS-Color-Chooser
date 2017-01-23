$(document).ready(function() {
    Chart.defaults.global.defaultFontColor = "#FFF";  

    var ctx = $("#lineChart");
    var lineColorChooser = document.getElementById("line-color-chooser");
    var lineColor = document.getElementById("lineColor");
    
    var Options = {
        currentDataset: 0,
        global: {
            points: true
        },
        line: [
            {
                dataset: {
                    label: "Dataset One",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    borderColor: "rgba(255, 0, 0, 1)",
                    data: [10, 20, 5, 15, 20]
                },
                opacity: "0.5",
                rgbColor: { r: 255, g: 0, b: 0, a: 1 },
                previousRGB: { r: 255, g: 0, b: 0, a: 1 },
                hexColor: "#FF0000",
                previousHex: "#FF0000"
            },
            {
                dataset: {
                    label: "Dataset Two",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    borderColor: "rgba(255, 0, 0, 1)",
                    data: [16, 18, 10, 17, 16]
                },
                opacity: "0.5",
                rgbColor: { r: 255, g: 0, b: 0, a: 1 },
                previousRGB: { r: 255, g: 0, b: 0, a: 1 },
                hexColor: "#FF0000",
                previousHex: "#FF0000"
            }    
        ]
    };
    
    var data = {
        labels: ["Demo", "Demo", "Demo", "Demo", "Demo"],
        datasets: [
            Options.line[0].dataset,
            Options.line[1].dataset
        ]
    };

    var lineChart = new Chart(ctx, {
        type: 'line',
        data: data
    });
    
    lineColor.style.backgroundColor = Options.line[Options.currentDataset].hexColor;
    $("#line-opacity").val(Options.line[Options.currentDataset].opacity);
    
    function recreateLineChart() {
        var data = {
                datasets: []
            },
            j = Options.line.length,
            max = 0;
        
        for (var i = 0; i < j; i++) {
            var size = Options.line[i].dataset.data.length;
            data.datasets[i] = Options.line[i].dataset;
            max = (max > size) ? max : size; 
        }
        
        data.labels = Array(max).fill("Demo");
        
        lineChart.destroy();
        lineChart = new Chart(ctx, {
            type: 'line',
            data: data
        });
    }
    
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
    
    function createDataNodes() {
        var html = "",
            data = Options.line[Options.currentDataset].dataset.data,
            len = data.length;
        
        for(var i = 0; i < len; i++) {
            html += '<input class="input line-data" value="'+data[i]+'" type="text">'
        }
        
        html += '<input class="input line-data" value="" type="text">';
        
        $("#line-data").html(html);
    }
    
    function updatePreferences() {
        var line = Options.line[Options.currentDataset];
        var color = line.hexColor;
        var opacity = line.opacity;
        var points = Options.global.points;
        
        createDataNodes();
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
    
    function updateDataset() {
        var line = Options.line[Options.currentDataset],
            len = line.dataset.data.length,
            data = lineChart.data.datasets[Options.currentDataset].data;
        
        data.length = len;
        for(var i = 0; i < len; i++) {
            data[i] = line.dataset.data[i];
        }
        
        lineChart.update();
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
            $("#btn-line-color-save").click();
            Options.currentDataset = parseInt($(this).data("idx"));
            updatePreferences();
        });
    });
    
    $('.line-data').each(function(idx) {
        $(this).val(Options.line[Options.currentDataset].dataset.data[idx]);
    });
    
    $(lineColor).on('click', function() {
        $(lineColorChooser).show();
    });
    
    $(document).on('input', '.line-data', function() {
        var i = 0,
            arr = [],
            len = Options.line[Options.currentDataset].dataset.data.length;
        
        $('.line-data').each(function() {
            var x = $(this).val();
            if(x) {
                arr[i++] = x;
            }
        });
        
        Options.line[Options.currentDataset].dataset.data = arr;
        (arr.length === len) ? updateDataset() : recreateLineChart();
    });
    
    $(document).on('blur', '.line-data', function() {
        createDataNodes();
    });
    
    $(window).resize(function() {
        setLineColorChooserPosition();
    });
    
    $("#linePoints").prop("checked", true);
    setLineColorChooserPosition();
    updateLineChart();
    createDataNodes();
    
});
