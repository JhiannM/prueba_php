function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 25.7617, lng: -80.1918 },
  });

  const ciudades = ["Miami", "Orlando", "New York"];
  var humedadData = {};

  function actHumedad() {
    var tbody = document.getElementById("Historico").getElementsByTagName("tbody")[0];
    var newRow = tbody.insertRow();
    var fecha = new Date();
    var datoCelda = newRow.insertCell();
    datoCelda.textContent = formatDate(fecha);
    ciudades.forEach(function (ciudad) {
      $.ajax({
        url: "humidity.php",
        type: "GET",
        dataType: "json",
        data: { city: ciudad },
        success: function (response) {
          var humidity = response[ciudad].humidity;
          var latitud = response[ciudad].lat;
          var longitud = response[ciudad].lon;

          if (!humedadData[ciudad]) {
            humedadData[ciudad] = [];
          }
          humedadData[ciudad].push({
            humidity: humidity,
            lat: latitud,
            lon: longitud,
            date: fecha,
          });

          var marker = new google.maps.Marker({
            position: { lat: latitud, lng: longitud },
            map: map,
            title: ciudad + ": " + humidity + "%",
          });

          var humidityCell = newRow.insertCell();
           humidityCell.textContent = humidity + "%";
        },
        error: function (xhr, status, error) {
          console.log("Error:", error);
        },
      });
    });
  }

  actHumedad();

  setInterval(actHumedad, 60 * 60 * 1000);
}

function formatDate(date) {
  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("es-ES", options);
}
