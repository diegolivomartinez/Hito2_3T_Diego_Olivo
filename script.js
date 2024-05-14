// Función para cargar y mostrar los resultados de la encuesta
async function mostrarResultados() {
    try {
        const response = await fetch('encuesta.json');
        const encuesta = await response.json();
        const tbody = document.getElementById('surveyResults');
        tbody.innerHTML = '';

        // Array para almacenar la cantidad de alumnos por centro
        const alumnosPorCentro = {};

        // Arrays para contar las respuestas a cada pregunta
        const respuestasPregunta1 = [0, 0, 0, 0, 0];
        const respuestasPregunta2 = [0, 0, 0, 0, 0];
        const respuestasPregunta3 = [0, 0, 0, 0, 0];

        encuesta.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.Centro}</td>
                <td>${result.Grado}</td>
                <td>${result.Sexo}</td>
                <td>${result.Edad}</td>
                <td>${result.Pregunta_1}</td>
                <td>${result.Pregunta_2}</td>
                <td>${result.Pregunta_3}</td>
                <td>${result.Pregunta_4}</td>
                <td>${result.Pregunta_5}</td>
            `;
            tbody.appendChild(row);

            // Contar la cantidad de alumnos por centro
            alumnosPorCentro[result.Centro] = (alumnosPorCentro[result.Centro] || 0) + 1;

            // Contar las respuestas a cada pregunta
            respuestasPregunta1[result.Pregunta_1 - 1]++;
            respuestasPregunta2[result.Pregunta_2 - 1]++;
            respuestasPregunta3[result.Pregunta_3 - 1]++;
        });

        // Obtener el contexto del canvas para el gráfico de barras
        const ctx = document.getElementById('barChart').getContext('2d');

        // Crear el gráfico de barras
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Pregunta 1',
                    data: respuestasPregunta1,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color de fondo
                    borderColor: 'rgba(255, 99, 132, 1)', // Color del borde
                    borderWidth: 1
                },{
                    label: 'Pregunta 2',
                    data: respuestasPregunta2,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color de fondo
                    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
                    borderWidth: 1
                },{
                    label: 'Pregunta 3',
                    data: respuestasPregunta3,
                    backgroundColor: 'rgba(255, 206, 86, 0.5)', // Color de fondo
                    borderColor: 'rgba(255, 206, 86, 1)', // Color del borde
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Obtener el contexto del canvas para el gráfico circular
        const pieCtx = document.getElementById('pieChart').getContext('2d');

        // Crear el gráfico circular
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(alumnosPorCentro),
                datasets: [{
                    label: 'Cantidad de Alumnos por Centro',
                    data: Object.values(alumnosPorCentro),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error al cargar los datos de la encuesta:', error);
    }
}

// Llama a la función para mostrar los resultados al cargar la página
window.onload = mostrarResultados;
