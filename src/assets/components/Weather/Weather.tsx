import { useState, useEffect, ChangeEvent } from 'react';
import lupa from './img/lupa.svg';
import logo from '/public/logo.svg';
import umbrella from './img/umbrella.svg';
import wind from './img/wind.svg';
import humidity from './img/humidity.svg';
import nuvem from './img/nuvem.png';

export default function Weather(): JSX.Element {
    const [city, setCity] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [data, setData] = useState({
        code: "",
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
                description: "",
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
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&lang=pt_br`)
        .then((response) => response.json())
        .then(result => {
            setData(result)
        })
    },[latitude, longitude])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputCity = e.target.value;
        setCity(inputCity);
        setErrorMessage("");
    }

    const searchHandler = async () => {
        if(!city) {
            setErrorMessage("Infrome a cidade")
        } else {
            city.trim().toLocaleLowerCase();        
            await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&lang=pt_br`)
            .then((response) => response.json())
            .then(result => {
                if(result.cod === "404") {
                    setError(true);
                } else {
                    setError(false)
                    setData(result)
                    setLatitude(result.coord.lat)
                    setLongitude(result.coord.lon)
                }
            })
            setCity("")
        }
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
            <div className='md:mx-40 flex justify-between'>
                <img className='w-8' src={logo} alt=''/>
                <input className='w-3/4 rounded-xl px-2 py-1 outline-none' type="text" placeholder="Procure por uma cidade..." value={city} onChange={changeHandler}/>  
                <button onClick={searchHandler}>
                    <img src={lupa} alt=''/>
                </button>
            </div>
            <div className='w-full text-center mt-4'>
                <span className='text-red-600'>{errorMessage}</span>
            </div>
            {error ? (
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-4xl text-center mt-24'>Cidade não encontrada</h2>
                    <div>
                        <img src={nuvem} alt=''/>
                    </div>
                    <h3 className='text-2xl text-center'>Verifique se digitou corretamente</h3>
                </div>
            ) : (
                <section>
                    <div>
                        <div className='md:flex justify-evenly md:mb-20 md:mt-8'>
                            <div className='mt-16 mb-8'>
                                <div>
                                    <h2 className='text-4xl'>{data.name},</h2>
                                    <h2 className='text-4xl'>{data.sys.country}</h2>
                                </div>
                                <span className='text-xl text-gray-500'>{monthName}, {day}</span>
                            </div>
                            <div className='m-4 flex justify-around items-center'>
                                <span><img className='w-40' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" /></span>
                                <div>
                                    <h1 className='text-6xl font-bold'>{data.main.temp.toFixed(0)}º</h1>
                                    <span className='text-xl text-gray-500'>{data.weather[0].description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:mx-40 mt-16'>
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
                    </div>
                </section>
            )}
        </main>
    )
}