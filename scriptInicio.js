document.getElementById('buscador').addEventListener('click', function() {
  // Obtener el valor seleccionado del género
  var selectedGenre = document.getElementById('selectGenero').value;

  // Verificar si se seleccionó un género válido
  if (selectedGenre !== 'Genero') {
      // Realizar una llamada a la API de TVMaze para obtener shows del género seleccionado
      fetch(`https://api.tvmaze.com/shows?page=0&pageSize=10&genres=${selectedGenre}`)
          .then(response => response.json())
          .then(filteredShows => {
              // Mostrar los resultados en el elemento con id "resultados"
              displayResults(filteredShows);
          })
          .catch(error => console.error('Error:', error));
  } else {
      alert('Por favor, selecciona un género antes de buscar.');
  }
});

function displayResults(filteredShows) {
  // Limpiar resultados anteriores
  document.getElementById('resultados').innerHTML = '';

  // Mostrar cada resultado en el elemento con id "resultados"
  filteredShows.forEach(show => {
      var showElement = document.createElement('div');
      showElement.innerHTML = `
          <h3>${show.name}</h3>
          <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295'}" alt="${show.name}">
          <p>${show.summary || 'No hay resumen disponible'}</p>
          <hr>
      `;
      document.getElementById('resultados').appendChild(showElement);
  });
}


document.getElementById('addSeriesBtn').addEventListener('click', function() {
    // Crear un nuevo elemento de tarjeta
    var newCard = document.createElement('div');
    newCard.className = 'card';

    // Agregar contenido de la serie
    newCard.innerHTML = `
            <img src="./Imagenes/TheLastOfUs.jpg">
        <div class="card-body; btn-outline-dark">
            <p class="card-text">The Last of Us</p>
        </div>
    `;

    // Agregar el nuevo elemento de tarjeta al contenedor
    document.getElementById('seriesContainer').appendChild(newCard);
});

document.getElementById('removeSeriesBtn').addEventListener('click', function() {
    // Obtener el contenedor de las series
    var seriesContainer = document.getElementById('seriesContainer');

    // Verificar si hay al menos una serie para eliminar
    if (seriesContainer.children.length > 0) {
        // Eliminar el último hijo del contenedor
        seriesContainer.removeChild(seriesContainer.lastChild);
    } else {
        alert('No hay series para eliminar.');
    }
});