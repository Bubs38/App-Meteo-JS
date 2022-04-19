const ClefApi = "495864698c18b64ce3aafab3623b3710";
let resultatsApi;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".heure-nom-prevision");
const tempPourH = document.querySelectorAll("heure-prevision-valeur");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      appelApi(long, lat);
    },
    () => {
      alert(
        "Vous avez refusé la géolocalisation, l'application ne peut fonctionner, veuillez l'activer."
      );
    }
  );
}

const appelApi = (long, lat) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${ClefApi}`
  )
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      // console.log(data);
      resultatsApi = data;

      temps.innerText = resultatsApi.current.weather[0].description;
      temperature.innerText = Math.trunc(resultatsApi.current.temp) + " °";
      localisation.innerText = resultatsApi.timezone;

      // les heures, par tranche de trois, avec leur temperature.
      let heureActuelle = new Date().getHours();

      for (let i = 0; i < heure.length; i++) {
        let heureIncr = heureActuelle + i * 3;

        if (heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr === 24) {
          heure[i].innerText = "00 h";
        } else {
          heure[i].innerText = `${heureIncr} h`;
        }
      }
    });
};
