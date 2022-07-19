<template>
    <div id="component">
        <div class="container">
            <button @click="currentGeoWeather" class="returnToCurrentGeo"></button>
            <!-- <img src="../assets/geo.png" alt=""> -->
            <input type="text" placeholder="поиск" class="container__search" v-model="search" @keyup.enter="searchForCity">
            <button @click="searchForCity" class="container__search__btn">найти!</button>
            <div id="geo"><h2>{{city}}</h2></div>
            <div id="mainInfo">
                <div id="temp"><p>{{tempSign}} {{currentTemp}}</p><span class="celsius" >&#xb0;</span></div>
                 <div id="icon"><img :src= "icon" alt=""></div>
            </div>
            
            <p id="description">{{description}}</p>
            <p id="feelsLike">Ощущается как: {{feelsLikeSign}}<span>&#xb0;</span></p>
        </div>  

        <div v-if="!futureWeatherHide" id="soon">
            <div v-for="(day, idx) in futureWeather" :key="idx">
                <p class="hours">{{day.time}}</p>
                <div><img :src="require(`../assets/iconList/${day.img}.png`)" alt=""> </div>
                <div class="soonTemp"><span>{{tempSign}}{{Math.round(day.temp)}}&#xb0;</span></div>
            </div>
            
        </div>

        <div id="addInfo">  
            <div id="pressure" class="addInfo-div"> <img src="../assets/barometer.png" alt=""> <p>{{pascalToHg}} мм. рт. ст.</p></div>
            <div id="humidity" class="addInfo-div"><img src="../assets/Hygrometer.png" alt=""><p> {{humidity}}%</p></div>
            <div id="wind" class="addInfo-div"> <img src="../assets/wind.png" alt="" > <p>{{wind}} м/c</p></div>
        </div>

       

        <div id="sun">
            <div id="sunrise"><p>{{getSunrise}}</p><img src="../assets/sunrise.png" alt=""><p>Восход</p></div>
            <div id="sunset"><p>{{getSunset}}</p><img src="../assets/sunset.png" alt=""><p>Закат</p></div>
        </div>
        
    </div>
</template>

<script>

import { format } from 'date-fns'
const coefPsToHg = 0.750063755419211;

export default {
    props:[
        'header',
    ],
    data() {
        return {// eslint-disable-next-line
            data: {},
            city: '',
            icon: '',
            search: '',
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
            futureWeatherHide: false,
             
        }
    },
    
    methods: {
        searchForCity() {
            if(this.search !== '') {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.search}&appid=31753a5ec52cae14dffa4cadc0a2b489&units=metric&lang=ru`)
                .then(result => result.json())
                .then(data => {
                console.log(data);
                this.data = data;
                this.icon = `http://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png`;
                this.feelsLike = Math.round(data.main.feels_like);
                this.currentTemp = Math.round(data.main.temp)
                this.description = data.weather[0].description;
                this.humidity = data.main.humidity;
                this.city = `${data.name}, ${data.sys.country}`;
                this.pressure = data.main.pressure;
                this.wind = data.wind.speed;
                this.sunrise = new Date(data.sys.sunrise * 1000);
                this.sunset = new Date(data.sys.sunset * 1000);
                this.futureWeatherHide = true;
                }); 
            }
            
        
        },
        currentGeoWeather() {
            this.futureWeatherHide = false;
            this.futureWeather = [];
            fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=31753a5ec52cae14dffa4cadc0a2b489&units=metric&lang=ru')
        .then(result => result.json())
        .then(data => {
            this.data = data;
            this.icon = `http://openweathermap.org/img/wn/${this.data.list[0].weather[0].icon}@2x.png`;
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
                let day = {
                    temp: data.list[i].main.temp,
                    time: format(new Date(data.list[i].dt_txt), "HH:mm"),
                    img: data.list[i].weather[0].icon
                }
                this.futureWeather.push(day);
            }
        });      
        }
    },

    computed: {
        feelsLikeSign() {
            return this.feelsLike > 0 ?  '+' + this.feelsLike : this.feelsLike < 0 ?
             '-' + this.feelsLike : this.feelsLike;
        },
        tempSign() {
            return this.currentTemp > 0 ?  '+'  : this.currentTemp > 0 ? 
             '-' : '';
        },
        pascalToHg() {
            return Math.round(this.pressure * coefPsToHg);
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
            this.icon = `http://openweathermap.org/img/wn/${this.data.list[0].weather[0].icon}@2x.png`;
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
                let day = {
                    temp: data.list[i].main.temp,
                    time: format(new Date(data.list[i].dt_txt), "HH:mm"),
                    img: data.list[i].weather[0].icon
                }
                this.futureWeather.push(day);
            }
        });      
    },
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&family=Comfortaa:wght@300;400;500;600&family=Inter&family=Noto+Sans+Display&family=Ubuntu:wght@300&display=swap');


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
    font-size: 48px;

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
    .container__search {
    width: 200px;
    height: 30px;
    font-size: 20px;
   }
   .returnToCurrentGeo {
    background-image: url('../assets/geo.png');
    background-repeat: no-repeat;
    background-size: contain;
    width: 35px;
    height: 35px;
    background-color: transparent;
    position: relative;
    top: 10px;
    left: -10px;
    padding: 2px;
    /* border: 1px solid white; */
    border: none;

   }
   .returnToCurrentGeo:hover {
    cursor: pointer;
   }
   .container__search__btn {
    width: 50px;
    height: 35px;
    position: relative;
    top: -2px;
    font-size: 13px;
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
    position: relative;
    top: 25px;

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
       .container__search {
    width: 400px;
    height: 40px;
    font-size: 28px;
   }
   .returnToCurrentGeo {
    background-image: url('../assets/geo.png');
    background-repeat: no-repeat;
    background-size: contain;
    width: 45px;
    height: 45px;
    background-color: transparent;
    position: relative;
    top: 10px;
    left: -10px;
    padding: 2px;
    /* border: 1px solid white; */
    border: none;

   }
   .returnToCurrentGeo:hover {
    cursor: pointer;
   }
   .container__search__btn {
    width: 80px;
    height: 46px;
    position: relative;
    top: -3px;
    font-size: 18px;
   }

}

/* cтили для монитора пк min-width: 1024px */
@media screen and (min-width: 1024px) {
    #component {
        width: 768px;
        margin: 20px auto;
    }
    #temp > .celsius  {
    content: '\2103';
    font-family: 'Ubuntu', sans-serif;
    position: relative;
    top: 25px;

   }
   .container__search {
    width: 500px;
    height: 60px;
    font-size: 36px;
   }
   .returnToCurrentGeo {
    background-image: url('../assets/geo.png');
    background-repeat: no-repeat;
    background-size: contain;
    width: 60px;
    height: 60px;
    background-color: transparent;
    position: relative;
    top: 17px;
    left: -10px;
    padding: 2px;
    /* border: 1px solid white; */
    border: none;

   }
   .returnToCurrentGeo:hover {
    cursor: pointer;
   }
   .container__search__btn {
    width: 80px;
    height: 66px;
    position: relative;
    top: -5px;
    font-size: 20px;
   }
}



</style>