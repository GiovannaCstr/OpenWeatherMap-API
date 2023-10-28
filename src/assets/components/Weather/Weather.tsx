import { useState, useEffect, ChangeEvent } from 'react';
import lupa from './img/lupa.svg';
import menu from './img/menu.svg';
import umbrella from './img/umbrella.svg';
import wind from './img/wind.svg';
import humidity from './img/humidity.svg';

export default function Weather(): JSX.Element {
    const [city, setCity] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [data, setData] = useState({
        name: "",
        main : {
            feels_like: 0,
            humidity: 0,
            temp: 0
        },
        sys: {
            country: "",
        },
        weather: [
            {
                icon: "",
            }
        ],
        wind: {
            speed: 0
        }, 
        rain: {
            rain: 0
        }

    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })
    },[])
    
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
        .then((response) => response.json())
        .then(result => {
            setData(result)
            console.log(result)
        })
    },[latitude, longitude])
    console.log(data)

    const hoje: Date = new Date();
    const day: number = hoje.getDate();
    const month: number = hoje.getMonth();
    const monthNames: string[] = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];
      const monthName: string = monthNames[month];

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputCity = e.target.value;
        setCity(inputCity)
    }

    return (
        <main className='bg-gradient-to-b from-bg-yellow text-font-gray'>
            <section>
                <div>
                    <button>
                        <img src={lupa} alt=''/>
                    </button>
                    <input type="text" value={city} onChange={() => changeHandler}/>
                    <img src={menu} alt=''/>
                </div>

                <div>
                    <h2>{data.name},</h2>
                    <h2>{data.sys.country}</h2>
                    <span>{monthName}, {day}</span>
                </div>
                
                <div>
                    <span><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" /></span>
                    <div>
                        <h1>{data.main.temp.toFixed(0)}º</h1>
                        <span>Rainy</span>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <div>
                        <img src={umbrella} alt=""/>
                        <p>Rain probability</p>
                    </div>
                    <p>{data.main.feels_like}%</p>
                </div>
                <div>
                    <div>
                        <img src={wind} alt=""/>
                        <p>Wind</p>
                    </div>
                    <p>{data.wind.speed}km/h</p>
                </div>
                <div>
                    <div>
                        <img src={humidity} alt=""/>
                        <p>Humidity</p>
                    </div>
                    <p>{data.main.humidity}%</p>
                </div>
            </section>
        </main>
    )
}