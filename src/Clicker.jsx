import Lau from './assets/laulalokita.png'
import './Clicker.css'


function Clicker(props) {
  return (
    <div id="clickerMain">
        <h1 className="title">{ Math.round(props.views) }<br/>views</h1>
        <h3 >por segundo: {props.vps}</h3>
        <h3 >por click: {props.vpc.toFixed(1)}</h3>
        { props.bonusPercent > 0 ? <h3>Bonus: {props.bonusPercent}%</h3> : <></>}
        <img src={Lau} id="clickerBtn" onClick={props.clickEvent}/>
    </div>
  )
}

export default Clicker
