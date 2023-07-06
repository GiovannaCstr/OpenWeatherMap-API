import lupa from './img/lupa.svg';
import menu from './img/menu.svg';
import icone from './img/cludy.svg';
import style from './Weather.module.css';
import { useState, useEffect } from 'react';
const apiKey = '654d7141b2184d23e322299a94e1059d';

export default function Weather() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })
    }),([])
       
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then((response) => response.json())
    .then(result => {
        setWeather(result)
    })

    return (
        <div>
            <div className={style.divWeather}>
                <button className={style.searchBtn}>
                    <img src={lupa} alt='' className={style.icon}/>
                </button>
                <input type="text" className={style.searchInput} />
                <img src={menu} alt='' className={style.icon}/>
            </div>

            <div className={style.divLocal}>
                <h2 className={style.local}>São Paulo,</h2>
                <h2 className={style.local}>Brazil</h2>
                <span className={style.localDate}>Tue, jun 30</span>
            </div>
            
            <div className={style.divIcon}>
                <span><img src={icone} alt="" /></span>
                <div>
                    <h1 className={style.temperature}>19º</h1>
                    <span className={style.climate}>Rainy</span>
                </div>
            </div>
        </div>
    )
}