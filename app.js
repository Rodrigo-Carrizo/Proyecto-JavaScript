class Usuario {
    constructor(nombre, tarjeta, dineroEnElBanco) {
      this.nombre = nombre;
      this.tarjeta = tarjeta;
      this.dineroEnElBanco = parseInt(dineroEnElBanco);
      this.movimientos = []
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
  
function iniciarSesion(nombre, tarjeta){
    usuarioLogIn = usuarios.find((usuario) => usuario.nombre === nombre && usuario.tarjeta === tarjeta );
    
    if(usuarioLogIn) {
      localStorage.setItem("usuario", JSON.stringify(usuarioLogIn));
  
      let mensajeBienvenida = document.getElementById("bienvenida");
      let nombreUsuario = document.getElementById("nombreUsuario");
      mensajeBienvenida.className = "";
      nombreUsuario.innerText = nombre;
  
      formularioIniciarSesion.className = "hidden";
      formularioRegistrarse.className = "hidden";
    } else {
      alert("No se encuentra este usuario.");
    }
}
  
function registrarse(nombre, tarjeta, dinero) {
    const newUser = new Usuario(nombre, tarjeta, dinero);
    usuarios.push(newUser);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
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
    let dineroARetirar = parseInt(prompt("Cuanto dinero desea retirar? \nBilletes disponibles de $1000, $500, $200 y $100"));
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
      usuarioLogIn.agregarMovimiento(new Movimientos(dineroADepositar, 'Deposito', fecha));
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
      alert(`La transferencia se realizo con exito, su nuevo saldo es de ${diusuarioLogIn.dineroneroDelUsuario}`);
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
  
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioLogIn = JSON.parse(localStorage.getItem("usuario"));
  
  
if(usuarioLogIn) {
    let mensajeBienvenida = document.getElementById("bienvenido");
    let nombreUsuario = document.getElementById("nombreUsuario");
  
    mensajeBienvenida.className = "";
    nombreUsuario.innerText = usuarioLogIn.nombre;
    menuDeOperaciones.className = "row gx-5 gy-2";
    formularioIniciarSesion.className = "hidden";
    formularioRegistrarse.className = "hidden";
  
    let botones = document.querySelectorAll(".btn-secondary");
    for (const boton of botones) {
      boton.addEventListener("click", (e) => {
        let dataId = e.target.getAttribute("data-id");
        seleccionarOperacionDelMenu(dataId);
      });
    }
} 
  
else {
    formularioIniciarSesion.className = "";
    formularioRegistrarse.className = "mt-2";
  
    formularioIniciarSesion.addEventListener("submit", (e) => {
      e.preventDefault();
      let usuario = document.getElementById("usuario").value;
      let numeroTarjeta = document.getElementById("numeroTarjeta").value;
  
      if(usuario != '' && numeroTarjeta != '') {
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