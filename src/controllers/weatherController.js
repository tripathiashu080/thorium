let axios = require("axios")

const getCityWeather = async function(req,res){
    try{
        let city = req.query.city;

        let options = {
            method : 'get',
            url : `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dab1ba56af7b83cda5f3c9c397a2106d`
        }
        let result = await axios(options)
        res.send({data : result.data.main.temp})
        }
    catch(error){
        console.log(error.message)
        res.status(500).send({msg : error.message})
    }
}

const getCitiesSorted = async function(req,res){
    try{let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow","Jaipur"];
    let cityTemp = [];

    for(let i=0;i<cities.length;i++){
        obj = {city : cities[i]};
        let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=dab1ba56af7b83cda5f3c9c397a2106d`);
        obj.temp = result.data.main.temp;
        cityTemp.push(obj);
    }
    let sortedCities = cityTemp.sort( function(a,b) {return a.temp - b.temp})
    res.status(200).send({sortedCities: sortedCities})
}
catch(error){
    res.status(500).send({msg:error.message})
}

}
module.exports.getCityWeather = getCityWeather;
module.exports.getCitiesSorted = getCitiesSorted;