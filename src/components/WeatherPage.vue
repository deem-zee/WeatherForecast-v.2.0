<template>
    <div id="component">
        <!-- <h1>{{header}}</h1> -->
        <div class="container">
            <div id="geo"><h2>{{city}}</h2></div>
            <div id="mainInfo">
                <div id="temp"><p>{{tempSign}} {{currentTemp}}</p><span style="font-size:48px">&#xb0;</span></div>
                 <div id="icon"><img :src= "iconPath" alt=""></div>
            </div>
            
            <p id="description">{{description}}</p>
            <p id="feelsLike">Ощущается как: {{feelsLikeSign}}<span>&#xb0;</span></p>
        </div>  

        <div id="soon">
            <div v-for="(day, idx) in futureWeather" :key="idx">
                <p class="hours">{{day.dt_txt.split(' ')[1].slice(0, 5)}}</p>
                <div><img :src="require(`../assets/iconList/${day.weather[0].icon}.png`)" alt=""> </div>
                <div class="soonTemp"><span>{{tempSign}}{{Math.round(day.main.temp)}}&#xb0;</span></div>
            </div>
            
        </div>

        <div id="addInfo">  
            <div id="pressure" class="addInfo-div"> <img src="../assets/barometer.png" alt=""> <p>{{pascalToHg}} мм. рт. ст.</p></div>
            <div  id="humidity" class="addInfo-div"><img src="../assets/Hygrometer.png" alt=""><p> {{humidity}}%</p></div>
            <div id="wind" class="addInfo-div"> <img src="../assets/wind.png" alt="" > <p>{{wind}} м/c</p></div>
        </div>

       

        <div id="sun">
            <div id="sunrise"><p>{{getSunrise}}</p><img src="../assets/sunrise.png" alt=""><p>Восход</p></div>
            <div id="sunset"><p>{{getSunset}}</p><img src="../assets/sunset.png" alt=""><p>Закат</p></div>
        </div>
        
    </div>
</template>

<script>
export default {
    props:[
        'header',
    ],
    data() {
        return {// eslint-disable-next-line
            data: {},
            city: '',
            icon: '',
            search: null,
            citiesFound: [],
            feelsLike: null,
            description: '',
            currentTemp: '',
            humidity: '',
            pressure: '',
            wind: '',
            sunrise: '',
            sunset: '',
            futureWeather: [],
             
        }
    },
    methods: {
        // eslint-disable-next-line
        citySearch() {
            let cityName = this.search;
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=31753a5ec52cae14dffa4cadc0a2b489&units=metric&lang=ru`)
            .then(response => console.log(response.json()))
        }
    },
    computed: {
        iconPath() {
            return this.icon + "@2x.png";
        },
        feelsLikeSign() {
            if(this.feelsLike > 0) {return '+' + this.feelsLike;}
            return this.feelsLike;
        },
        tempSign() {
            if(this.currentTemp > 0) {
                return '+';
            }
            return '-';
        },
        pascalToHg() {
            return Math.round(this.pressure * 0.750063755419211);
        },
        getSunrise() {
            return this.sunrise.toString().split(' ')[4];
        },
        getSunset() {
            return this.sunset.toString().split(' ')[4];
        },

    },
    created() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=31753a5ec52cae14dffa4cadc0a2b489&units=metric&lang=ru')
        .then(result => result.json())
        
        .then(data => {
            this.data = data;
            console.log(data);
            this.icon = "http://openweathermap.org/img/wn/" + this.data.list[0].weather[0].icon;
            this.feelsLike = Math.round(data.list[0].main.feels_like);
            this.currentTemp = Math.round(data.list[0].main.temp)
            this.description = data.list[0].weather[0].description;
            this.humidity = data.list[0].main.humidity;
            this.city = data.city.name;
            this.pressure = data.list[0].main.pressure;
            this.wind = data.list[0].wind.speed;
            this.sunrise = new Date(data.city.sunrise * 1000);
            this.sunset = new Date(data.city.sunset * 1000);
            for(let i = 1; i < 6; i++) {
                this.futureWeather.push(data.list[i])
            }
            //  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=31753a5ec52cae14dffa4cadc0a2b489&units=metric&lang=ru`)
            // .then(response => console.log(response.json()))
            // .then(result => console.log(result))
            }); 
           
    },
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&family=Comfortaa:wght@300;400;500;600&family=Inter&family=Noto+Sans+Display&family=Ubuntu:wght@300&display=swap');

/* font-family: 'Be Vietnam Pro', sans-serif;
font-family: 'Comfortaa', cursive;
font-family: 'Ubuntu', sans-serif; */
/* font-family: 'Noto Sans Display', sans-serif; */

@media screen and (min-width: 320px) {
    
    #component {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: rgb(8, 195, 227);
        font-family: 'Inter', sans-serif;
        color: white;
        text-align: center;
        padding: 20px;
    }
    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #geo {
        font-size: 1em;
    }

    #icon img {
        transform: scale(1.5);
    }

    #mainInfo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0;
    }

    #mainInfo img {
        position: relative;
        top: -10px;
        left: 15px;
    }

    #description {
        text-transform: capitalize;
        font-size: 2em;
        font-weight: bold;
        margin: 0;
   }
   #temp {
        display: flex;
        flex-direction: row;
        justify-content: center;
   }
   #temp img {
        width: 80px;
        height: 80px;
   }
   #temp p {
        font-size: 48px;
        font-weight: bold;
        margin: 0;
        align-self: center;

   }

   #temp > .celsius  {
    content: '\2103';
    font-family: 'Ubuntu', sans-serif;

   }

    #feelsLike {
        font-size: 1.8em;
    }

    #addInfo {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
    }

    .addInfo-div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0;
    }

    .addInfo-div img {
        width: 35px;
        height: 35px;
        transform: scale(0.8)
    }

    .addInfo-div p {
        font-size: 1em;
    }

    #pressure img {
        position: relative;
        top: 5px;
    }

    #wind img {
        position: relative;
        top: 4px;
    }

    #soon {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border-bottom: 1px solid white;
        padding: 10px;
    }

    #soon div {
        display: flex;
        flex-direction: column;
    }

    #soon img {
        width: 35px;
        height: 35px;
        align-self: center;
        position: relative;
        top: -10px;
    }

    

    #soon .soonTemp {
        display: flex;
        flex-direction: row;
    }

    #soon span {
        align-self: center;
    }

    #sun {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    #sun img {
        width: 85px;
        height: 85px;
    }

    #soon, #addInfo, #sun {
        border: 1px solid white;
        border-radius: 10px;
        margin: 5px 0;
    }

}

/* стили для планшетов min-width: 768px */

@media screen and (min-width: 768px) {

#component {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: rgb(8, 195, 227);
        font-family: 'Inter', sans-serif;
        color: white;
        text-align: center;
        padding: 10px;
    }
    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #geo {
        font-size: 2em;
    }

    #icon img {
        transform: scale(2);
    }

    #mainInfo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0;
    }

    #mainInfo img {
        position: relative;
        top: -10px;
        left: 15px;
    }

    #description {
        text-transform: capitalize;
        font-size: 2.2em;
        font-weight: bold;
        margin: 0;
   }
   #temp {
        display: flex;
        flex-direction: row;
        justify-content: center;
   }
   #temp img {
        width: 80px;
        height: 80px;
   }
   #temp p {
        font-size: 48px;
        font-weight: bold;
        margin: 0;
        align-self: center;

   }

   #temp > .celsius  {
    content: '\2103';
    font-family: 'Ubuntu', sans-serif;

   }

    #feelsLike {
        font-size: 2.5em;
    }

    #addInfo {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
    }

    .addInfo-div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0;
    }

    .addInfo-div img {
        width: 35px;
        height: 35px;
        transform: scale(1.5)
    }

    .addInfo-div p {
        font-size: 2em;
    }

    #pressure img {
        position: relative;
        top: 5px;
        top: 30px;
        left: -15px;
    }

    #wind img {
        position: relative;
        top: 25px;
        left: -10px;
    }

    #humidity img {
        position: relative;
        top: 25px;
        left: -20px;
    }

    #soon {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border-bottom: 1px solid white;
        padding: 10px;
    }

    #soon div {
        display: flex;
        flex-direction: column;
    }

    #soon .hours {
        font-size: 1.5em;
    }

    #soon img {
        width: 35px;
        height: 35px;
        align-self: center;
        transform: scale(2.5)
    }

    #soon .soonTemp {
        display: flex;
        flex-direction: row;
        font-size: 2em;
    }

    #soon span {
        align-self: center;
    }

    #sun {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: 1.5em;
    }

    #sun img {
        width: 85px;
        height: 85px;
        transform: scale(1.5);
        margin: 10px 0;
    }

    #soon, #addInfo, #sun {
        border: 1px solid white;
        border-radius: 10px;
        margin: 5px 0;
    }


}

/* cтили для монитора пк min-width: 1280px */
@media screen and (min-width: 1280px) {

}



</style>