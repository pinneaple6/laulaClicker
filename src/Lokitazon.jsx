import lokitazonLogo from './assets/lokitazon.png';
import { BsCart4 } from "react-icons/bs";
import './Lokitazon.css';

function Lokitazon(props) {
    return <div id="lokitazonMain">
        <img style={{width: "200px", marginBottom: "30px", marginTop: "20px"}} src={lokitazonLogo}></img>
        <p style={{fontWeight: '100'}}>Usa tus subs para comprar mejoras en la tienda. ¡Piensalo bien! Cada vez los subs son más difíciles de conseguir</p>
        <div>
            {Object.values(props.lokitazon).map(el => {
                return <>{ Object.keys(props.bought).includes(el.id) ? <></>:
                
                <div key={el.id} className="lokitazon-item">
                    <div>
                        <img style={{width: "100px"}} src={el.iconb64} />
                    </div>
                    <div>
                        <header>{el.name}</header>
                        <p>{el.description}<br/><b>{el.grants}</b></p>
                        <div className="shopBtn" style={{color: el.price > props.subs ? "gray" : ''}}>{el.price} subs <BsCart4 onClick={()=>props.buylokitazon(el.id)} className={el.price > props.subs ? "carticon disabled" : "carticon"}/> </div>
                    </div>
                </div>
                
                }</>
            })}
        </div>
        </div>
}

export default Lokitazon
