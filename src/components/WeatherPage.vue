<template>
    <div>
        <h1>{{header}}</h1>
        <div class='searchbar'>
                <p>Поиск: </p>
                <input type="text" v-model="search" class="citySearch" placeholder="введите название города">
                <button @click="citySearch" class="srcBtn"></button> 
                <li></li>
            </div>
        <div class="container">
            <h2>{{geolocation}}</h2>
            <img :src = "iconPath" alt="">
            
            
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
            geolocation: '',
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
        }
    },
    created() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=31753a5ec52cae14dffa4cadc0a2b489&units=metric&lang=ru')
        .then(result => result.json())
        
        .then(data => {this.data = data;
        // eslint-disable-next-line
        this.icon = "http://openweathermap.org/img/wn/" + this.data.list[0].weather[0].icon;
        this.geolocation = data.city.name})
       
        
    },
}
</script>

<style scoped>

p {
    font-size: 28px;
    margin-bottom: 0;
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



</style>