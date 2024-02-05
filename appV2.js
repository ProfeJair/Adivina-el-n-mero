let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];

let valorMinimo=parseInt(prompt("Ingresa el valor mínimo del juego"));
let valorMaximo=parseInt(prompt("Ingresa el valor máximo del juego"));

if (valorMinimo>=valorMaximo){
    alert('Los valores ingresados son incorrectos, recuerda que el valor máximo no puede ser igual o menor al valor mínimo')
    location.reload();
}else{
    function asignarTextoElemento(elemento, texto) {
        let elementoHTML = document.querySelector(elemento);
        elementoHTML.innerHTML = texto;
        return;
    }
    
    function verificarIntento() {
        let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
        
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p',`Felicitaciones!!! Adivinaste el número en ${intentos} ${(intentos > 1) ? 'intentos' : 'intento'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('reiniciarRangos').removeAttribute('disabled');
            document.querySelector('#valorUsuario').disabled=true;
        } else {
            //El usuario no acertó.
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p','El número secreto es menor');
            } else {
                asignarTextoElemento('p','El número secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }
        return;
    }
    
    function limpiarCaja() {
        document.querySelector('#valorUsuario').value = '';
    }
    
    function generarNumeroSecreto() {
        let numeroSecreto = Math.floor(Math.random()*(valorMaximo-valorMinimo+1)) + valorMinimo;
    
        console.log(numeroSecreto);
        console.log(listaNumerosSorteados);
        //Verificar si sortean todos los números, hacemos una resta ya que tenemos los rango y adicionamos 1
        //ya que la resta solo toma los números de los extremos y en realidad es un número mas
        if (listaNumerosSorteados.length == (valorMaximo-valorMinimo+1)) {
            asignarTextoElemento('p','Ya se sortearon todos los números posibles, juega con nuevos rangos');
            document.getElementById('intentar').disabled=true;
            document.getElementById('reiniciarRangos').removeAttribute('disabled');
        } else {
            //Si el numero generado está incluido en la lista 
            if (listaNumerosSorteados.includes(numeroSecreto)) {
                return generarNumeroSecreto();
            } else {
                listaNumerosSorteados.push(numeroSecreto);
                return numeroSecreto;
            }
        }
    }
    
    function condicionesIniciales() {
        //asignarTextoElemento('h1','Juego del número secreto! v2.0');
        asignarTextoElemento('p',`Indica un número del ${valorMinimo} al ${valorMaximo}`);
        numeroSecreto = generarNumeroSecreto();
        intentos = 1;
        console.log(numeroSecreto);
    }
    
    function reiniciarJuego() {
        //Condiciones que se deben reiniciar para volver a jugar entre el mismo rango
        limpiarCaja();
        condicionesIniciales();
        //Deshabilitar el botón de nuevo juego
        document.querySelector('#reiniciar').setAttribute('disabled','true');
        document.querySelector('#valorUsuario').disabled=false;
    }
    
    function reiniciarRangos(){
        location.reload();
    }
    
    condicionesIniciales();
}


