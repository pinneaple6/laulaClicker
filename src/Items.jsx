import { useState } from 'react';
import items from './assets/items.json'
import './Items.css'

function Items(props) {
    const [info, setInfo] = useState('');
    let lastBought = 0;
    return (
    <div id="itemlistMain">
        <h1 className="title">Tienda de views</h1>
        <p className="infobox">{info}</p>
        <div id="itemList">
        {Object.values(items).map(el => {
            let multi = 1
            if (Object.keys(props.bought).includes(el.id)){
                multi = Math.pow(el.costMultiplier, props.bought[el.id])
                lastBought = el['unlock-order']
            }
            let price = Math.round(el.cost * multi)

            if (el['unlock-order'] - lastBought > 1){return;} // Se desbloquea tras comprar el anterior

            return <div
            key={el.id}
            role="button"
            tabIndex="-3"
            onMouseOver={()=> setInfo(el.description)}
            onMouseOut={()=> setInfo('')}
            className={price > props.views ? 'disabled' : ''}
            onClick={() => props.buy(el.id)}
          >
            <div>
              <img className="itemIcon" src={el.iconb64}></img>
              <h2 className="title">{el.name}</h2>
              <span style={{color: "green"}}>{price}</span>
            </div>
              { multi > 1 ? <div className="stats"> 
                
                { el.gives.subs > 0 ? <b>+{el.gives.subs} subs </b>: <b></b>}
                { el.gives.vpc > 0 ? <b>+{el.gives.vpc} click </b>: <b></b>}  
                { el.gives.vps > 0 ? <b>+{el.gives.vps} seg </b>: <b></b>}    

                </div> : <></>}
            </div>
        })}
        </div>
    </div>
    )
}

export default Items
