import { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import Clicker from './Clicker';
import Items from './Items';
import Subs from './Subs';
import './App.css'
import users from './assets/users.json';
import items from './assets/items.json';
import lokitazon from './assets/lokitazon.json';
import End from './End';

// SONIDOS
import useSound from 'use-sound';
import clickSound from './assets/click.mp3';
import upgradeSound from './assets/upgrade.wav';
import lokitazonSound from './assets/lokitazon.mp3';

let lastSubUser;

let end = false;
let endAlreadyShown = false;

let confirmReset = false;

function App() {
  const [views, setViews] = useLocalStorageState('views', { defaultValue: 0 });
  const [subs, setSubs] = useLocalStorageState('subs', { defaultValue: 0 });
  const [vpc, setVpc] = useLocalStorageState('vpc', { defaultValue: 1 });
  const [vps, setVps] = useLocalStorageState('vps', { defaultValue: 0 });
  const [bought, setBought] = useLocalStorageState('bought', { defaultValue: {} });
  const [bonusPercent, setBonusPercent] = useLocalStorageState('bonusPercent', { defaultValue: 0 });
  const [lokitazonUnlocked, setLokitazonUnlocked] = useLocalStorageState('lokitazonUnlocked', {defaultValue: false})
  const [lastTimestamp, setLastTimestamp] = useState('lastTimestamp', Date.now())

  const subGoals = [10, 25, 50, 100, 150, 200, 300, 500] //  +2% bonus por cada goal
  let userlist = [...users]
  function randomUser() {
      return userlist[ Math.floor(Math.random() * userlist.length) ]
  }

  function closeEnd() {
    end = false;
  }

  function reset() {
    setBought({})
    setVps(0)
    setVpc(1)
    setSubs(0)
    setViews(0)
    setBonusPercent(0)
    setLokitazonUnlocked(false)
    confirmReset = false;
  }

  // SONIDOS
  const [playClick] = useSound(clickSound);
  const [playUpgrade] = useSound(upgradeSound);
  const [playLokitazon] = useSound(lokitazonSound);

  function earn(cantidad) {
    setViews(views + cantidad * ( (100+bonusPercent)/100 ));
  }

  function addBonus(cantidad) { //cantidad en percent
    setBonusPercent(bonusPercent + cantidad)
  }

  function clickEvent(){
    earn(vpc)
    playClick()
  }

  function buy(itemid){
    const it = items[itemid]
    let copy = {...bought}

    let price = it.cost;
    if (!Object.keys(bought).includes(itemid)) {
      copy[itemid] = 0
    }

    price = Math.round( (it.cost * Math.pow(it.costMultiplier, copy[itemid])) )

    if (price > views) { return }

    copy[itemid]++
    setBought(copy)
    playUpgrade()
    setViews(views - price)

    setVps(vps + it.gives.vps)
    setVpc(vpc + it.gives.vpc)
    setSubs(subs + it.gives.subs)

    if( it.gives.subs > 0) {
      lastSubUser = randomUser();
    }

    if (subs + it.gives.subs >= 10){ // se supone que se desbloquea a los 10 pero si pongo 10 no funciona tiene que ser uno menos 
      setLokitazonUnlocked(true);
    }
    console.log();
    if (Object.keys(copy).includes('v9') && !endAlreadyShown){ // ultimo item
      end = true;
      endAlreadyShown = true;
    }
  }

  function buylokitazon(itemid) {
    // los items de lokitazon solo se compran una vez.

    const it = lokitazon[itemid]
    let copy = {...bought}

    let price = it.price;
    if (Object.keys(bought).includes(itemid)) return; // ya se ha comprado
    if (price > subs) return;

    setSubs(subs - price)
    copy[itemid] = 1
    setBought(copy)
    playLokitazon()
    addBonus(it.gives.bonuspercent);
  }

  useEffect(()=>{ // views por segundo
    let porSegundo = setInterval(()=> {
      let quantityPerSec = (vps) * ( (100+bonusPercent)/100 )
      let now = Date.now()
      let elapsed = now-lastTimestamp

      if (Number.isNaN(elapsed)) {
        elapsed= 0;
      }

      setLastTimestamp(x => now)
      setViews(x => x + quantityPerSec*elapsed/1000)
    
    }, 200)
    return () => { clearInterval(porSegundo) }
  }, [views, vps, lastTimestamp]);

  return (
    <div id="app">
      { end ? <End closeEnd={closeEnd} /> : '' }
      <Subs 
        subs={subs} 
        subGoals={subGoals} 
        bought={bought} 
        lokitazon={lokitazon} 
        buylokitazon={buylokitazon} 
        lastSubUser={lastSubUser}
        lokitazonUnlocked={lokitazonUnlocked}
        />
      <Clicker views={views} vps={vps} vpc={vpc} clickEvent={clickEvent} bonusPercent={bonusPercent}/>
      <Items views={views} earn={earn} bought={bought} buy={buy}/>

      <div style={{position: "absolute", bottom: "0", left: "0", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
        {
          confirmReset ? <>
          <span>Pulsa de nuevo para confirmar BORRADO DE TODO EL PROGRESO</span>
          <br/>
          <div>
          <button onClick={()=>{reset()}}>Reset</button>
          <button style={{backgroundColor: "var(--rosa)"}} onClick={()=>{confirmReset = false}}>CANCELAR</button>
          </div>
          </>:
          <button onClick={()=>{confirmReset = true}}>Reset</button>
        }
      </div>
    </div>
  )
}

export default App
