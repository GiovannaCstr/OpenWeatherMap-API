import umbrella from './img/umbrella.svg';
import wind from './img/wind.svg';
import humidity from './img/humidity.svg';
import style from './Details.module.css'

export default function Details() {
    return (
        <section>
            <div className={style.container}>
                <div className={style.divIcon}>
                    <img src={umbrella} alt="" className={style.icon}/>
                    <p className={style.details}>Rain probability</p>
                </div>
                <p className={style.details}>3%</p>
            </div>
            <div className={style.container}>
                <div className={style.divIcon}>
                    <img src={wind} alt="" className={style.icon}/>
                    <p className={style.details}>Wind</p>
                </div>
                <p className={style.details}>19km/h</p>
            </div>
            <div className={style.container}>
                <div className={style.divIcon}>
                    <img src={humidity} alt="" className={style.icon}/>
                    <p className={style.details}>Humidity</p>
                </div>
                <p className={style.details}>64%</p>
            </div>
        </section>
    )
}