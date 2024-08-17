const bouton = document.querySelector('#search-btn')
const champ = document.querySelector('#search-input')
const weather_data = document.querySelector('.weather_data')
const prev_content = weather_data.children[0].children[2].children[1]
let joursSemaine = ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi',];

bouton.addEventListener('click', function(){
    if(champ.value === ""){
        alert(`Le champ est obligatoire
Saisissez un pays, une ville...
        `)
    }else{
        prev_content.innerHTML = ''
        meteoActuelle(champ.value)
        champ.value = ''
    }
})


async function meteoActuelle(datainput) {
    try {
        const reponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c77b620170a24242bdd140558243103&q=${datainput}&days=4&aqi=yes&alerts=yes&lang=fr`)
        var data = await reponse.json()
        const previsions = data.forecast.forecastday
        console.log(previsions)
        weather_data.children[0].children[0].innerText = `${data.location.name}, Région de ${data.location.region}, ${data.location.country}`
        weather_data.children[0].children[1].children[0].children[1].children[0].children[0].src = `${data.current.condition.icon}`
        weather_data.children[0].children[1].children[0].children[1].children[1].children[0].innerText = `${data.current.temp_c}°C`
        weather_data.children[0].children[1].children[0].children[1].children[1].children[1].innerText = `${data.current.condition.text}`
        weather_data.children[0].children[1].children[1].children[0].innerText = `Qualité de l'air : ${data.current.air_quality.co}`
        weather_data.children[0].children[1].children[1].children[1].innerText = `Vent : ${data.current.wind_kph} km/h`
        weather_data.children[0].children[1].children[1].children[2].innerText = `Rafales : ${data.current.gust_kph} km/h`
        weather_data.children[0].children[1].children[1].children[3].innerText = `Ressenti ${data.current.feelslike_c}°`
        weather_data.children[0].children[1].children[1].children[4].innerText = `Indice UV : ${data.current.uv}`
        weather_data.children[0].children[1].children[1].children[5].innerText = `Visibilité : ${data.current.vis_km} km`
        weather_data.children[0].children[1].children[1].children[6].innerText = `Humidité : ${data.current.humidity}%`

        for (const prv of previsions) {
            let date = new Date(prv.date)
            let jourSemaineIndex = date.getDay();
            let jourSemaineNum = jourSemaineIndex;
            let jourSemaine = joursSemaine[jourSemaineNum];
            prev_content.innerHTML += `
            <div class="">
                 ${jourSemaine} ${prv.date}:
                <div class="previn">
                    <div class="">
                        <img src="${prv.day.condition.icon}" alt="bbb">
                    </div>
                    <div class="bll">
                        <div>&uarr; ${prv.day.maxtemp_c}°</div>
                        <div>&darr; ${prv.day.mintemp_c}°</div>
                    </div>
                </div>
            </div>
            `
        }   
    } catch (error) {
        alert(data.error.message)
    }

}


 
