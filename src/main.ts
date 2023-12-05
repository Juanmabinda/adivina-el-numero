import "./style.css";

const generarNumeroAleatorio = () : number => Math.floor(Math.random() * 100);

let historialNumeros : string = "Historial:";

const numeroParaAcertar : number = generarNumeroAleatorio();
console.log(numeroParaAcertar);


type Estado =
  | "NO_ES_UN_NUMERO"
  | "EL_NUMERO_SECRETO_ES_MENOR"
  | "EL_NUMERO_SECRETO_ES_MAYOR"
  | "ES_EL_NUMERO_SECRETO"
  | "GAME_OVER";

let intentos : number = 0;
const MAX_INTENTOS : number = 5;

const muestraMensajeDeComprobacion = (texto : string, estado: Estado) => {
  let mensaje = "";

  switch (estado) {
    case "NO_ES_UN_NUMERO":
      mensaje = `🤨 ${texto} no es un número, intentá nuevamente`;
      break;
    case "EL_NUMERO_SECRETO_ES_MENOR":
      mensaje = "❌ INTENTÁ CON UN NÚMERO MENOR ⬇️";
      break;
    case "EL_NUMERO_SECRETO_ES_MAYOR":
      mensaje = "❌ INTENTÁ CON UN NÚMERO MAYOR ⬆️ ";
      break;
    case "ES_EL_NUMERO_SECRETO":
      mensaje = `✅ FELICITACIONES, ADIVINASTE! 🎉🎉🎉🎊 El NÚMERO ERA: ${texto}`;
      break;
    case "GAME_OVER":
      mensaje =  `⛔ Alcanzaste el número máximo de intentos, el número era: ${numeroParaAcertar}.`;
      deshabilitarBotonComprobar();
      break;
    default:
      mensaje = "😧 No se que ha pasado, pero no deberías estar aquí";
      break;
  }
  const resultado = document.getElementById("resultado");
  if (resultado) {
    resultado.innerHTML = mensaje;
  }
};

const pintaHistorialNumeros = (texto: string) :void => {
  const historialElemento : HTMLElement | null = document.getElementById("historial");
  if (intentos === 1) {
    historialNumeros += "    ";
  } else {
    historialNumeros += " - ";
  };

  historialNumeros += texto;
  if (historialElemento && historialElemento instanceof HTMLDivElement) {
    historialElemento.innerHTML = historialNumeros;
  };

};


const comprobarNumero = (texto : string) => {
  const numero = parseInt(texto);

  if(intentos <= MAX_INTENTOS) {
    if (intentos === MAX_INTENTOS) {
      if (numero === numeroParaAcertar) {
        deshabilitarBotonComprobar();
        habilitarBotonNuevaPartida();
        return "ES_EL_NUMERO_SECRETO";
      } else {
        habilitarBotonNuevaPartida();
        deshabilitarBotonComprobar();
        return "GAME_OVER"
      };
    }else{
      if(numero < numeroParaAcertar) {
        return "EL_NUMERO_SECRETO_ES_MAYOR";
      } else if (numero > numeroParaAcertar) {
        return "EL_NUMERO_SECRETO_ES_MENOR";
      } else {
        return "ES_EL_NUMERO_SECRETO";
      }
    };
  };

  return "NO_ES_UN_NUMERO";
};

const muestraCantidadDeIntentos = (intentos : number) => {
  const mostrarIntentos = document.getElementById("intentos");

  if (mostrarIntentos) {
    mostrarIntentos.innerHTML = `Intentos: ${intentos} de ${MAX_INTENTOS}`;
  }

};

const deshabilitarBotonComprobar = () :void => {
  const botonComprobar : HTMLElement | null = document.getElementById("comprobar");
  if (botonComprobar && botonComprobar instanceof HTMLButtonElement) {
    botonComprobar.disabled = true;
  };
};

const habilitarBotonComprobar = () :void => {
  const botonComprobar : HTMLElement | null = document.getElementById("comprobar");
  if (botonComprobar && botonComprobar instanceof HTMLButtonElement) {
    botonComprobar.disabled = false;
  };
};

const habilitarBotonNuevaPartida = () => {
  const botonNuevaPartida = document.getElementById("nueva-partida");
  if (botonNuevaPartida && botonNuevaPartida instanceof HTMLButtonElement) {
    botonNuevaPartida.disabled = false;
  };
};



const sumaIntentos = () => {
  intentos++;
  return intentos;
};

const gestionarGameOver = (estado : Estado) => {
  const boton = document.getElementById("comprobar");
  if (estado === "GAME_OVER") {
    if (boton && boton instanceof HTMLButtonElement) {
      boton.disabled = true;
    }
  }
};

const reseteaValorInput = () => {
  const elementoInput = document.getElementById("numero");

  if (elementoInput && elementoInput instanceof HTMLInputElement) {
    elementoInput.value = "";
  };

};

const handleCompruebaClick = () => {
  const elemento = document.getElementById("numero")
  if (elemento !== null && elemento !== undefined && elemento instanceof HTMLInputElement) {
    if (parseInt(elemento.value) >= 0 && parseInt(elemento.value) <= 99) {
      muestraCantidadDeIntentos(sumaIntentos());
      if (elemento && elemento instanceof HTMLInputElement) {
        const texto = elemento.value;
        if (intentos === MAX_INTENTOS) {

        }
        const estado = comprobarNumero(texto);
        muestraMensajeDeComprobacion(texto, estado);
        pintaHistorialNumeros(texto);
        gestionarGameOver(estado);
        reseteaValorInput();
      };
    };
  };
};

const resetHistorial = () => {
  const historialElemento : HTMLElement | null = document.getElementById("historial");
  if (historialElemento) {
    historialElemento.innerHTML = "";
  };
};

const resetMensaje = () => {
  const resultado = document.getElementById("resultado");
  if (resultado) {
    resultado.innerHTML = "";
  };
};

const comenzarNuevaPartida = () => {
  intentos = 1;
  muestraCantidadDeIntentos(intentos);
  habilitarBotonComprobar();
  resetHistorial();
  resetMensaje();
};

const boton = document.getElementById("comprobar");
if (boton) {
  boton.addEventListener("click", handleCompruebaClick);
};

const botonNuevaPartida = document.getElementById("nueva-partida");
if (botonNuevaPartida) {
  botonNuevaPartida.addEventListener("click", comenzarNuevaPartida);
};
