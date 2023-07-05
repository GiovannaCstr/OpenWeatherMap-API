import Details from "../Details/Details";
import Weather from "../Weather/Weather";
import style from './ShowWeather.module.css'

export default function ShowWeather() {
     return (
        <main className={style.background}>
            <Weather/>
            <Details/>
        </main>
    )
}