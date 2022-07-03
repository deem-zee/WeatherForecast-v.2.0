<template>
    <div id="component">
        <h1>{{header}}</h1>
        <div id="header">
            <nav id="nav"></nav>
            <div id="geo"><h2>{{city}}</h2></div>
            <div id="search"></div>
        </div>
        <div class="container">
            <div id="icon"><img :src = "iconPath" alt=""></div>
            <p class="description">{{description}}</p>
            <div id="temp"> <img src="../assets/thermometer.png" alt=""> <p>{{tempSign}} {{currentTemp}}<span>℃</span></p></div>
            <p id="feelsLike">Ощущается как: {{feelsLikeSign}} &#8451;</p>
        </div>  
        <div id="addInfo">  
            <div id="pressure"> <img src="../assets/barometer.png" alt=""> <p>{{pascalToHg}} мм. рт. ст.</p></div>
            <div  id="humidity"><img src="../assets/Hygrometer.png" alt=""><p> {{humidity}}%</p></div>
            <div id="wind"> <img src="../assets/wind.png" alt="" > <p>{{wind}} м/c</p></div>
        </div>

        <div id="soon">
            <div v-for="(day, idx) in futureWeather" :key="idx">
                <p>{{day.dt_txt.split(' ')[1].slice(0, 5)}}</p>
                <div><img :src="require(`../assets/iconList/${day.weather[0].icon}.png`)" alt=""> </div>
                <div class="soonTemp"><img src="../assets/thermometer.png" alt="" class="small">{{tempSign}}{{Math.round(day.main.temp)}}<span>℃</span></div>
            </div>
            
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
            // if(this.currentTemp > 0) {return '+' + this.currentTemp;}
            // return this.currentTemp;
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
        // setIconPath() {
        //     for(let part of this.futureWeather) {
        //         console.log(typeof part,1111);
        //         // eslint-disable-next-line no-inner-declarations
        //         function iconPath() {return "http://openweathermap.org/img/wn/" + part.weather[0].icon + "@2x.png";}
        //         iconPath.apply(this.futureWeather.part, part.weather[0].icon)
        //         console.log(part,222)
        //     }
        //     console.log(this.futureWeather.iconPath,33333333)
        //     return this.futureWeather.iconPath
        // }
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
             fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&appid=31753a5ec52cae14dffa4cadc0a2b489&units=metric&lang=ru`)
            // .then(response => console.log(response.json()))
            // .then(result => console.log(result))
            }); 
           
    },
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&family=Comfortaa:wght@300;400;500;600&family=Ubuntu:wght@300&display=swap');

/* font-family: 'Be Vietnam Pro', sans-serif;
font-family: 'Comfortaa', cursive;
font-family: 'Ubuntu', sans-serif; */


#component {
    background: rgb(1, 148, 246);
    color: white;
    font-family: 'Ubuntu', sans-serif;
    width: 768px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

h1 {
    width: 100%;
    align-self: center;
}

#icon img{
    width: 150px;
    height: 150px;
}

p {
    font-size: 28px;
    margin-bottom: 0;
}

#temp {
    display: flex;
    justify-content: center;
}

#temp img {
    position: relative;
    top: 5px;
    width: 30px;
    height: 30px;
}

#temp p {
    margin-top: 0;
}

#temp span{
    font-weight: normal;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}


.description {
    margin-top: 0;
    font-size: 38px;
    margin-bottom: 10px
}

#feelsLike {
    font-weight: normal;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.citySearch {
    width: 300px;
    height: 40px;
    border: 2px solid rgb(66, 0, 128);
    border-radius: 10px;
    box-sizing: border-box;
}

.srcBtn {
    background: url("https://upload.wikimedia.org/wikipedia/commons/7/7e/Vector_search_icon.svg");
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10px;
    position: relative;
    top: 12px;
    border: 2px solid rgb(66, 0, 128);
    margin-left: 10px;
}

#addInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 50px;
    margin-bottom: 30px;
    border-bottom: 1px solid white;
}

#pressure {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
}

#humidity {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
}

#wind {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
}

#addInfo img{
    position: relative;
    top: 30px;
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

#sun {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 30px;
    padding-top: 30px;
    border-top: 1px solid white;
}

#sun img {
    width: 100px;
    height: 100px;
}

#soon {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    margin-bottom: 30px;
}

#soon div{
    display: flex;
    flex-direction: column;
}

.small {
    width: 35px;
    height: 35px;
}

.soonTemp {
    display: flex;
    flex-direction: row !important;
    font-size: 20px;
    font-weight: normal;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}



</style>