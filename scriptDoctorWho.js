document.addEventListener('DOMContentLoaded', function () {
    // Hacer la solicitud a la API de TVMaze
    fetch('https://api.tvmaze.com/singlesearch/shows?q=doctor')
      .then(response => response.json())
      .then(data => {
        // Manipular el DOM con los datos obtenidos
        updatePage(data);
      })
  });
  
  function updatePage(data) {
    // Actualizar la imagen y descripción del Doctor Who
    const descripcion = document.getElementById('descripcion');
    descripcion.innerHTML = data.summary;
  
    // Actualizar la información del Doctor Who
    const infoContainer = document.querySelector('.col-md-6.mb-4 .container .row .col-md-4');
    infoContainer.innerHTML = `
      <h4>Información</h4>
      <strong>Cadena:</strong> ${data.network ? data.network.name : 'N/A'}<br>
      <strong>Horario:</strong> ${data.schedule ? data.schedule.time : 'N/A'}<br>
      <strong>Estado:</strong> ${data.status}<br>
      <strong>Género:</strong> ${data.genres ? data.genres.join(', ') : 'N/A'}<br>
      <strong>Creador:</strong> ${data.created_by ? data.created_by.map(creator => creator.name).join(', ') : 'N/A'}
    `;
  
    const tableBody = document.querySelector('.table.table-dark.table-striped-columns tbody');
  const cells = {
    name: ['episode1-name', 'episode2-name', 'episode3-name'],
    date: ['episode1-date', 'episode2-date', 'episode3-date'],
    rating: ['episode1-rating', 'episode2-rating', 'episode3-rating'],
  };

  // Llenar las celdas con la información de los últimos tres episodios
  data._embedded.episodes.slice(0, 3).forEach((episode, index) => {
    cells.name[index] && (document.getElementById(cells.name[index]).textContent = episode.name);
    cells.date[index] && (document.getElementById(cells.date[index]).textContent = new Date(episode.airdate).toLocaleDateString());
    cells.rating[index] && (document.getElementById(cells.rating[index]).textContent = episode.rating ? episode.rating.average : 'N/A');
    });
  }



  document.getElementById('actualizarEpisodiosBtn').addEventListener('click', function() {
            // Lógica para actualizar la lista de episodios
            actualizarListaEpisodios();
        });

        function actualizarListaEpisodios() {
            // Limpiar la tabla
            document.getElementById('tablaEpisodios').innerHTML = '';

            // Ejemplo: Agregar nuevos episodios
            var nuevosEpisodios = [
                { nombre: 'Nuevo Episodio 1', fecha: 'Ene 1, 2022', puntuacion: '8.5' },
                { nombre: 'Nuevo Episodio 2', fecha: 'Ene 8, 2022', puntuacion: '9.0' },
            ];

            nuevosEpisodios.forEach(episodio => {
                var nuevaFila = document.createElement('tr');
                nuevaFila.innerHTML = `
                    <th scope="row">${episodio.nombre}</th>
                    <td>${episodio.fecha}</td>
                    <td>${episodio.puntuacion}</td>
                `;
                document.getElementById('tablaEpisodios').appendChild(nuevaFila);
            });
        }