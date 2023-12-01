import { useState, useEffect, ChangeEvent } from 'react';
import lupa from './img/lupa.svg';
import logo from './img/logo.svg';
import umbrella from './img/umbrella.svg';
import wind from './img/wind.svg';
import humidity from './img/humidity.svg';

export default function Weather(): JSX.Element {
    const [local, setLocal] = useState<boolean>(true);
    const [city, setCity] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [search, setSearch] = useState([{
        country: "",
        lat: 0,
        lon: 0,
        name: "",
        state: ""
    }]);

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
        if(local){
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            })
        }
    },[local])
    
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
        .then((response) => response.json())
        .then(result => {
            setData(result)
        })
    },[latitude, longitude])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputCity = e.target.value;
        setCity(inputCity);
    }

    const searchHandler = async () => {
        city.trim().toLocaleLowerCase();        
        setLocal(false);
        
        if(!local) {
            await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1000&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then(result => {
                setSearch(result)

                setLatitude(result[0].lat)
                setLongitude(result[0].lon)
            })
        }
        setCity("")
    }
    
    const updateLocationHandler = () => {
        setLocal(true);
    }

    const hoje: Date = new Date();
    const day: number = hoje.getDate();
    const month: number = hoje.getMonth();
    const monthNames: string[] = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];
      const monthName: string = monthNames[month];

    return (
        <main className='bg-gradient-to-b from-cyan-100 to-blue-500 text-font-gray p-8 h-screen'>
            <section>
                <div className='md:mx-40 flex justify-between'>
                    <img className='w-8' src={logo} alt=''/>
                    <input className='w-3/4 rounded-xl px-2 py-1 outline-none' type="text" placeholder="Procure por uma cidade..." value={city} onChange={changeHandler}/>
                    <button onClick={searchHandler}>
                        <img src={lupa} alt=''/>
                    </button>
                </div>
                
                <div className='md:flex justify-evenly md:mb-20 md:mt-8'>
                    <div className='mt-16 mb-8'>
                    {local ?
                        <div>
                            <h2 className='text-4xl'>{data.name},</h2>
                            <h2 className='text-4xl'>{data.sys.country}</h2>
                        </div>
                    :
                        <div>
                            <h2 className='text-4xl'>{search[0].name},</h2>
                            <h2 className='text-4xl'>{data.sys.country}</h2>
                        </div>
                    }
                        <span className='text-xl text-gray-400'>{monthName}, {day}</span>
                        
                    </div>
                    <div className='m-4 flex justify-around items-center'>
                        <span><img className='w-40' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" /></span>
                        <div>
                            <h1 className='text-6xl font-bold'>{data.main.temp.toFixed(0)}º</h1>
                            <span className='text-xl'>Rainy</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className='md:mx-40 mt-8 flex justify-end'>
                <button onClick={updateLocationHandler} className='bg-white px-4 py-2 rounded-xl text-sm mt-8 mb-4 hover:bg-gray-200'>Ver local atual</button>
            </div>
            <section className='md:mx-40'>
                <div className='flex justify-between items-center p-4 bg-gray-300 border-2 border-white rounded-xl mb-4'>
                    <div className='flex items-center font-bold'>
                        <img className='bg-white p-2 w-10 h-10 rounded-xl mr-2' src={umbrella} alt=""/>
                        <p>Rain probability</p>
                    </div>
                    <p>{data.main.feels_like}%</p>
                </div>
                <div className='flex justify-between items-center p-4 bg-gray-300 border-2 border-white rounded-xl mb-4'>
                    <div className='flex items-center font-bold'>
                        <img className='bg-white p-2 w-10 h-10 rounded-xl mr-2' src={wind} alt=""/>
                        <p>Wind</p>
                    </div>
                    <p>{data.wind.speed}km/h</p>
                </div>
                <div className='flex justify-between items-center p-4 bg-gray-300 border-2 border-white rounded-xl mb-4'>
                    <div className='flex items-center font-bold'>
                        <img className='bg-white p-2 w-10 h-10 rounded-xl mr-2' src={humidity} alt=""/>
                        <p>Humidity</p>
                    </div>
                    <p>{data.main.humidity}%</p>
                </div>
            </section>
        </main>
    )
}