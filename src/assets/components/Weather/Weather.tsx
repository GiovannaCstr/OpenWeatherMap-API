import lupa from './img/lupa.svg';
import menu from './img/menu.svg';
import icone from './img/cludy.svg';
import style from './Weather.module.css';

export default function Weather() {
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