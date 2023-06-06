import axios from 'axios';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import './Home.css';
function Home() {
    let sIcon = {width: "46px",
        height: "46px",
        backgroundColor:"#7c7c7c2b",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "20px"};
    let aIcon = {
        fontSize: "55px",
    };
    let wIcon = {
        fontSize: "55px",
    };
    const [data, setData] = useState({
        celcius: 10,
        name: 'london',
        humidity:10,
        speed:2
    })

    const [name, setName ] = useState('');
    const [error, setError ] = useState(''); 
 

    const handleClick = () => {
       if(name !==""){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e888b327a42a1018a8478c41089f9d03&units=metric`;
        axios.get(apiUrl)
        .then(res => {
            let imagePath= '';

           if(res.data.weather[0].main == "clouds"){

           }else if(res.data.weather[0].main == "clouds"){
                    imagePath = ".w/img/cloud.png";
           }else if(res.data.weather[0].main == "Snow"){
                    imagePath = ".w/img/snow.png";
           }else if(res.data.weather[0].main == "Clear"){
                    imagePath = ".w/img/clear.png";
           }else if(res.data.weather[0].main == "Rain"){
                    imagePath = ".w/img/rain.png";
           }else if(res.data.weather[0].main == "Mist"){
                    imagePath = ".w/img/mist.png";
           }else(res.data.weather[0].main == "Smoke")
                     imagePath = ".w/img/smoke.png";

           console.log(res.data);
            setData({...data, celcius: res.data.main.temp, name:res.data.name, humidity:res.data.main.humidity, speed: res.data.wind.speed, image: imagePath })
        })
        .catch(err =>{
            if(res.response.status == 404){
                setError("invalid Name");
            }else{
                setError('');
            }
            console.log(err)
        });
              
  
       } 
    }
    return(
    <div className='con '>
        <div className='container'>
            <div className='weather'>
                <div className='search-box'>
                    <input type='text' placeholder='Enter Name' className='input-box' onChange={e => setName(e.target.value)}/>
                    <button><SearchIcon style={sIcon} onClick={handleClick} /></button>
                </div>
                <div className='error'>
                        <p>{error}</p>
                </div>
                <div className='windfo'>
                    <img src={data.image} alt='weather image' className='w'/>
                    <div className="weather-box">
                        <p className="temperature">{Math.round(data.celcius)}<sup>°C</sup></p>
                        <p className="description">{data.name}</p>
                    </div>
                    <div className="weather-details ">
                    <div className="humidity">
                        <AirIcon style={aIcon} />
                        <div className="text">
                            <span id="humidity">{Math.round(data.humidity)}%</span>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="wind">
                        <WaterDropIcon style={wIcon} />
                        <div className="text">
                            <span id="wind-speed">{Math.round(data.speed)} km/h</span>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</div>
    )
}
export default Home;