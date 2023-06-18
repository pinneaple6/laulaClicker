import subgoalicon from './assets/subgoalicon.svg';
import Lokitazon from './Lokitazon';
import './Subs.css'

function Subs(props) {
    let nextGoal = 0;

    for (let i of props.subGoals) {
        if (i > props.subs){
            nextGoal = i;
            break;
        }
    }

    return <div id="subsMain">
        <h1 className="title">Tienda de Subs</h1>
        <div id="subBar" style={{display: "flex", alignItems: "center"}}>
            <div id="subBarFill" style={{backgroundColor: "var(--rosa)", width: (props.subs*400/nextGoal).toString() + 'px', height: "50px", borderRadius: "10px"}}></div>
            <img style={{width: "40px", position: "absolute", paddingLeft: "10px"}} src={subgoalicon}></img>
            <span style={{position: 'absolute', width: "400px"}}>
                {props.subs > 0 ? props.lastSubUser+ ' se ha suscrito! ' + props.subs.toString() + '/' + nextGoal.toString() : <>Todavía no tienes ningún sub.</>}
            </span>
        </div>

        {props.lokitazonUnlocked ? 
            <Lokitazon lokitazon={props.lokitazon} bought={props.bought} subs={props.subs} buylokitazon={props.buylokitazon}/> :
            <></>}
        </div>
}

export default Subs
