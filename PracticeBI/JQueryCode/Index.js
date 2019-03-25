$(document).ready(function () {

    var excelJson = '';
    var avg;
    var alumnoMenorC;
    var alumnoMayorC;
    var opcionesTablaAlumnos = null;
    var oTablaAlumnos = null;

    document.getElementById('excelfile').addEventListener("change", function (e) {
        var files = e.target.files, file;
        if (!files || files.length == 0) return;
        file = files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            var filename = file.name;
            var binary = "";
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            var oFile = XLSX.read(binary, { type: 'binary', cellDates: true, cellStyles: true, dateNF: 'dd/mm/yyyy' });
            var sheet_name_list = oFile.SheetNames;
            //Considerar la primer hoja del excel
            sheet_name_list.forEach(function (y) { //Recorrer las hojas
                //Convertir el valor de la celda a Json
                var headers = ["Nombres", "Apellido Materno", "Apellido Paterno", "Grado", "Grupo", "Calificacion"];
                excelJson = XLSX.utils.sheet_to_json(oFile.Sheets[y], { header: headers, range: 1, defval:"" });
                if (excelJson.length > 0) {
                    fnReset();
                    //Sí el json no viene vacío se manda llamar a la función de validar archivo
                    fnValidarArchivo();
                }
            });
        };
        fileReader.readAsArrayBuffer(file);
    });

    function fnReset() {
        $('#alertError').hide();
        $('.label').html('');
        $('.row.detalles').hide();
    }

    function fnValidarArchivo() {
        //Filtrar calificaciones vacías
        var calVacia= excelJson.filter(function (item) {
            return item.Calificacion === "";
        });

        if (calVacia.length > 0) {
            //Si existen calificaciones vacías no procesa el excel
            $('#alertError').show();
            $('#alertError').html("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Se encontraron calificaciones vacías, no se puede procesar el archivo.");
         
        } else {
            //Si no,lleva acabo las demás funciones            
            $('.row.detalles').show();
            fnCalcularPromedio(excelJson);
            fnObtAlumMenorC();
            fnObtAlumMayorC();
            fnGenerarGraficaAlumnos();
            fnGenerarGraficaPromedio();
        }
        fnDtAlumnos();
    }

    function fnDtAlumnos() {
        opcionesTablaAlumnos = {
            data: excelJson,

            columns: [
                { data: 'Nombres' },
                { data: 'Apellido Materno' },
                { data: 'Apellido Paterno' },
                { data: 'Grado' },
                { data: 'Grupo' },
                { data: 'Calificacion' }
            ],
            columnDefs: [{
                defaultContent: "-",
                targets: "_all"
            }]

        };

        if (oTablaAlumnos != null) {
            oTablaAlumnos.destroy();
        }
            oTablaAlumnos = $('#tblAlumnos').DataTable(opcionesTablaAlumnos);
        
    }

    function fnCalcularPromedio() {
        var sum = excelJson.reduce(function (accumulator, a) {
            return accumulator + parseFloat(a.Calificacion);
        }, 0);

        avg = sum / excelJson.length;
        avg = avg.toFixed(1);
        $('#promedioGral').html(avg);
    }

    function fnObtAlumMenorC() {
        //Recorrer el excelJson, comparar y obtener el alumno con menor calificación
        var menorCal = excelJson.reduce(function (ant, act) {
            return ant.Calificacion < act.Calificacion ? ant : act;
        });
        alumnoMenorC = menorCal.Nombres + " " + menorCal["Apellido Paterno"] + " " + menorCal["Apellido Materno"];
        $('#alumnoMenorC').html(alumnoMenorC);
    }

    function fnObtAlumMayorC() {
        //Recorrer el excelJson, comparar y obtener el alumno con mayor calificación
        var mayorCal = excelJson.reduce(function (ant, act) {
            return ant.Calificacion > act.Calificacion ? ant : act;
        });
        alumnoMayorC = mayorCal.Nombres + " " + mayorCal["Apellido Paterno"] + " " + mayorCal["Apellido Materno"];
        $('#alumnoMayorC').html(alumnoMayorC);
    }

    function fnGenerarGraficaAlumnos() {
        //Crear un nuevo arreglo de objetos,concatenando el nombre completo del alumno
        var alumnosJson = excelJson.map(function (a) {
            return { calificacion: a.Calificacion, nombre: a["Nombres"] + " " + a["Apellido Paterno"]+ " "+ a["Apellido Materno"]} 
        });
        //alert(JSON.stringify(alumnosJson));
        //Mandar llamar plugin gráficas
        $('#divGraficaCal').Grafica({
            titulo: "Gráfica calificación por alumno",
            datos: alumnosJson,
            nombre_archivo: "",
            contenedor: "divGraficaCal",
            tipo: "column",
            x: "nombre",
            y: "calificacion",
            titleX: "Alumnos",
            titleY: "Calificación",
            bulletSize: 0,
            customBullet: "",
            fillAlphas: 0.8,
            lineAlpha: 0.2
        
        });

    }

    function fnGenerarGraficaPromedio() {
        //Por medio de alasql se obtiene el promedio por grado
        var res = alasql('SELECT Grado, round(avg(Calificacion),2) AS promedio\
                            FROM ? \
                            GROUP BY Grado \
                            ORDER BY promedio DESC', [excelJson]);
        //Mardar llamar plugin gráficas
        $('#divGraficaPromedio').Grafica({
            titulo: "Gráfica promedio por grado",
            datos: res,
            nombre_archivo: "",
            contenedor: "divGraficaPromedio",
            tipo:"line",
            x: "Grado",
            y: "promedio",
            titleX: "Grados",
            titleY: "Promedio",
            bulletSize: 14,
            customBullet: "https://www.amcharts.com/lib/3/images/star.png",
            fillAlphas: "",
            lineAlpha: ""       
        });       
    }
});