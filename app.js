class Usuario {
  constructor(nombre, tarjeta, dineroEnElBanco, movimientos) {
    this.nombre = nombre;
    this.tarjeta = tarjeta;
    this.dineroEnElBanco = parseInt(dineroEnElBanco);
    this.movimientos = movimientos || []
  }
  agregarMovimiento(movimiento) {
    this.movimientos.push(movimiento);
  }
  restarDinero(dinero) {
    this.dineroEnElBanco -= dinero;
  }
}

class Movimientos {
  constructor(dinero, tipoDeMovimiento, fechaDeMovimiento) {
    this.dinero = parseFloat(dinero);
    this.tipoDeMovimiento = tipoDeMovimiento;
    this.fechaDeMovimiento = fechaDeMovimiento;
  }
}

async function peticionServidorParaIniciarSesion() {
  const data = await fetch("/data.json");
  const usuariosDB = await data.json();

  let usuarios = [] ;
    fetch("/data.json")
    .then(datos => datos.json())
    .then(usuariosDB => usuarios = [...usuariosDB]);

  return usuariosDB;
}

async function iniciarSesion(nombre, tarjeta){
  Usuario = await peticionServidorParaIniciarSesion();
  const datosDeUsuario = Usuario.find((usuario) => 
     usuario.nombre === nombre && usuario.tarjeta == tarjeta );

  if(datosDeUsuario) {
    usuarioLogIn = new Usuario(datosDeUsuario.nombre, datosDeUsuario.tarjeta, datosDeUsuario.dineroEnElBanco, datosDeUsuario.movimientos)
    localStorage.setItem("usuario", JSON.stringify(datosDeUsuario));

    let mensajeBienvenida = document.getElementById("bienvenida");
    let nombreUsuario = document.getElementById("nombreUsuario");
    mensajeBienvenida.classList.remove("hidden");
    nombreUsuario.innerText = nombre;

    formularioIniciarSesion.classList.add("hidden");
    formularioRegistrarse.classList.add("hidden");
  } else {
    alert("No se encuentra este usuario.");
  }
}

function registrarse(nombre, tarjeta, dinero) {
  const newUser = new Usuario(nombre, tarjeta, dinero);
  Usuario.push(newUser);
  localStorage.setItem("usuarios", JSON.stringify(Usuario));
  iniciarSesion(nombre, tarjeta);
}

function consultarDinero() {
  alert(`Usuario, su saldo actual es $${usuarioLogIn.dineroEnElBanco}`);
}

function validarSaldo(dineroARetirar) {
   if(dineroARetirar > usuarioLogIn.dinero) {
    alert("No cuentas con el dinero suficiente.");
    return false;
  } else {
    usuarioLogIn.restarDinero(dineroARetirar);
    return true;
  }
}

const retirarDinero = function () {
  let dineroARetirar = parseInt(prompt("Cuanto dinero desea retirar? \nCuento con billetes de $1000, $500, $200 y $100"));
  let resultado = validarSaldo(dineroARetirar);
  if(resultado) {
    const fecha = new Date();
    usuarioLogIn.agregarMovimiento(new Movimientos(dineroARetirar, "Retiro", fecha));
    alert(`El retiro se realizo con exito, su nuevo saldo es de ${usuarioLogIn.dineroEnElBanco}`);
  }

}

const depositarDinero = () => {
  let dineroADepositar = parseInt(prompt("Cuanto dinero desea depositar?"));
  if(dineroADepositar > 0) {
    usuarioLogIn.dineroEnElBanco += dineroADepositar;
    const fecha = new Date();
    usuarioLogIn.agregarMovimiento(new Movimientos(dineroADepositar, "Deposito", fecha));
    alert(`Su nuevo saldo es de ${usuarioLogIn.dineroEnElBanco}`)
  } else {
    alert("El valor es incorrecto.")
  }
}

const transferirDinero = () => {
  let dineroATrasferir = parseInt(prompt("Cuanto dinero desea transferir?"));
  let resultado = validarSaldo(dineroATrasferir);
  if(resultado) {
    const fecha = new Date();
    usuarioLogIn.agregarMovimiento(new Movimientos(dineroATrasferir, "Transferencia", fecha));
    alert(`La transferencia se realizo con exito, su nuevo saldo es de ${usuarioLogIn.dineroneroDelUsuario}`);
  }
}

const consultarMovimientos = () => {
  usuarioLogIn.movimientos.forEach((movimiento) => {
    alert(`Fecha: ${movimiento.fechaDeMovimiento}.\nOperacion: ${movimiento.tipoDeMovimiento}.\nDinero: $${movimiento.dinero}.`);
  })
}

function seleccionarOperacionDelMenu(operacion) {
switch (operacion) {
    case "1":
      consultarDinero();
      break;
    case "2":
      retirarDinero();
      break;
    case "3":
      depositarDinero();
      break;
    case "4":
      transferirDinero();
      break;
    case "5":
      consultarMovimientos();
      break;
    case "6":
      alert("Nos vemos.");
      localStorage.removeItem("usuario");
      break;
    default:
      break;
  }
}

let formularioIniciarSesion = document.getElementById("iniciarSesion");
let formularioRegistrarse = document.getElementById("registrarse");
let menuDeOperaciones = document.getElementById("operaciones");

let usuarioLS = JSON.parse(localStorage.getItem("usuario"));
let usuarioLogIn;

if(usuarioLS) {
  usuarioLogIn = new Usuario(usuarioLS.nombre, usuarioLS.tarjeta, usuarioLS.dineroEnElBanco, usuarioLS.movimientos);
  let mensajeBienvenida = document.getElementById("bienvenida");
  let nombreUsuario = document.getElementById("nombreUsuario");

  mensajeBienvenida.className = "";
  nombreUsuario.innerText = usuarioLogIn.nombre;
  menuDeOperaciones.classList.remove("hidden");
  formularioIniciarSesion.classList.add("hidden");
  formularioRegistrarse.classList.add("hidden");

  let botones = document.querySelectorAll(".btn-secondary");
  for (const boton of botones) {
    boton.addEventListener("click", (e) => {
      let dataId = e.target.getAttribute("data-id");
      seleccionarOperacionDelMenu(dataId);
    });
  }
} else {
  formularioIniciarSesion.classList.remove("hidden");
  formularioRegistrarse.classList.remove("hidden");

  formularioIniciarSesion.addEventListener("submit", (e) => {
    e.preventDefault();
    let usuario = document.getElementById("usuario").value;
    let numeroTarjeta = document.getElementById("numeroTarjeta").value;

    if(usuario != "" && numeroTarjeta != "") {
      iniciarSesion(usuario, numeroTarjeta);
    } else {
      alert("Todos los datos son obligatorios");
    }
  });

  formularioRegistrarse.addEventListener("submit", (e) => {
    e.preventDefault();
    let usuario = document.getElementById("usuarioRegistrado").value;
    let numeroTarjeta = document.getElementById("numeroTarjetaRegistrado").value;
    let dinero = document.getElementById("dinero").value;

    if(usuario != "" && numeroTarjeta != "" && dinero != "") {
      registrarse(usuario, numeroTarjeta, parseFloat(dinero));
    } else {
      alert("Todos los datos son obligatorios");
    }
  });
}