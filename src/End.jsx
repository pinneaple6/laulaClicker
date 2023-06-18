import './End.css'

function End(props) {
    return <div id="end-main">
        <div class="end-x" onClick={props.closeEnd}>X</div>
        <h2 class="title">FIN</h2>
        <p>Ya me he aburrido asi que aqui se acaba el minijuego. Sigue jugando si quieres o si no no</p>
        </div>
}

export default End
