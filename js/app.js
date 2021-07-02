// Variables
const formulario = document.querySelector( '#formulario' );
const listaTweets = document.querySelector( '#lista-tweets' );
let tweets = [];

// Event Listeners
eventListeners();
function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet 
    formulario.addEventListener( 'submit', agregarTweet );

    // Cuando el docuemnto esta listo 
    document.addEventListener( 'DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem( 'tweets' ) ) || [];
        
        crearHTML();
    });
};
// Funciones
function agregarTweet( e ){
    e.preventDefault();
    //TectArea donde el usuario escribe
    const tweet = document.querySelector( '#tweet' ).value;

    // Validacion 
    if( tweet === ''){
        mostrarError( 'Un mensaje no puede ir vacio' );
        return;//Evita que se ejecuten más lineas de código
    }

    const tweetsObj = {
        id : Date.now(),
        tweet: tweet //Puede ir solo tweets
    }
    // Añadir al arrglo de tweets
    tweets = [ ...tweets,  tweetsObj ];

    //Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

//Mostrar Mensaje de error
function mostrarError( error ){
    const mensajeError = document.createElement( 'p' );
    mensajeError.textContent = error; 
    mensajeError.classList.add( 'error' );

    //Insertar en el contenido
    const contenido = document.querySelector( '#contenido' );
    contenido.appendChild( mensajeError );

    //Elimina la alerta después de 3Segundos
    setTimeout(() => {
       mensajeError.remove(); 
    }, 3000);
}
//Muestra un listado de los tweets
function crearHTML(){
    limiparHTML();
    if( tweets.length > 0 ){
        tweets.forEach( tweet => {
            // Agregar un botton de eliminar
            const btnEliminar = document.createElement( 'a' );
            btnEliminar.classList.add( 'borrar-tweet' );
            btnEliminar.textContent = 'X';

            //Añadir la funció de eliminar
            btnEliminar.onclick = () => {
                borrarTweets( tweet.id );
            }

            //Crear el HTML
            const li = document.createElement( 'li' );
            // añadiendo el texto
            li.innerText = tweet.tweet;

            //Asignar el botón
            li.appendChild( btnEliminar );
            // Insertar en el html 
            listaTweets.appendChild( li );
        });
    }

    sincronizarStorage();
}
// Agrega los Tweets actuales a LocalStorage 
function sincronizarStorage(){
    localStorage.setItem( 'tweets', JSON.stringify( tweets ) );
}
// Elimina un tweet 
function borrarTweets( id ){
    tweets = tweets.filter( twwet => twwet.id !== id );
    crearHTML();
}
//Limpiar el html
function limiparHTML(){
    while( listaTweets.firstChild ){
        listaTweets.removeChild( listaTweets.firstChild );
    }
}