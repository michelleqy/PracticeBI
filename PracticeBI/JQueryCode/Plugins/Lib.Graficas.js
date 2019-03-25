(function ($) {
    /*
     PlugIn de gráficas tipo serial 
     amcharts
     03/2019
    */
    $.fn.Grafica = function (opciones) {
        var defaultSettings = {
            titulo: "",
            datos: [],
            nombre_archivo: "",
            contenedor: "",
            tipo:"",
            x: "",
            y: "",
            titleX: "",
            titleY: "",
            bulletSize: "",
            customBullet: "",
            fillAlphas:"",
            lineAlpha: ""
          
        };

        opciones = $.extend(defaultSettings, opciones);
        var fnPrivateCrearGrafica = function ($this) {
            var chart = AmCharts.makeChart(opciones.contenedor, {
                type: "serial",
                autoMargins: true,
                theme: "light",
                titles: [
                    { "text": opciones.titulo, "size": 15 }
                ],
                dataProvider: opciones.datos,
                valueAxes: [{
                    gridColor: "#FFFFFF",
                    gridAlpha: 0.2,
                    dashLength: 0,
                    integersOnly: false,
                    title: opciones.titleY
                }],
                gridAboveGraphs: true,
                startDuration: 1,
                graphs: [{
                    bulletSize: opciones.bulletSize,
                    customBullet: opciones.customBullet,
                    customBulletField: opciones.customBullet,
                    labelText: "[[value]]",
                    fillAlphas: opciones.fillAlphas,
                    lineAlpha: opciones.lineAlpha,
                    type: opciones.tipo,
                    valueField: opciones.y
                
                }],
                chartCursor: {
                    categoryBalloonEnabled: false,
                    cursorAlpha: 0,
                    zoomable: false
                },
                categoryField: opciones.x,
                categoryAxis: {
                    gridPosition: "start",
                    gridAlpha: 0,
                    tickPosition: "start",
                    tickLength: 20,
                    autoRotateAngle: 45,
                    autoRotateCount: 8,
                    title: opciones.titleX
                },        
                chartScrollbar: {
                    updateOnReleaseOnly: true
                },
                export: {
                    exportTitles: true,
                    pageOrientation: 'landscape',
                    pageMargins: 20,
                    fileName: opciones.nombre_archivo,
                    enabled: true,
                    exportFields: [opciones.x, opciones.y],
                    columnNames: { "descripcion": "Descripción", "registros": "Número de registros" },
                    menu: [{
                        class: "export-main",
                        menu: [
                            {
                                label: "Descargar como...",
                                menu: ["PNG", "JPG"]
                            }
                        ]
                    }
                    ]
                }
            });

        };

        return this.each(function () {
            var $this = $(this);
            fnPrivateCrearGrafica($this);
            return $this;
        });
    };

})(jQuery);