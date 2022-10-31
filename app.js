let DineroDelUsuario =8000;

let opcionMenu = 0;

function consultarDinero () {
    alert ("Usuario, su saldo actual es de $$ {DineroDelUsuario}");
}

function validarSaldo(dineroARetirar) {
    if(dineroARetirar > DineroDelUsuario) {
        alert("No cuentas conn el dinero suficiente.");
        return false;
    } else {
        DineroDelUsuario -= dineroARetirar;
        return true;
    }
}

const retirarDinero = function () {
    let dineroARetirar = parseInt (prompt("Cuanto dinero desea retirar? \nCuento con billetes de $1000, $500, $200 y $100"));
    let resultado = validarSaldo(dineroARetirar);
    if(resultado) {
        alert("El retiro se realizo con exito, su nuevo saldo es de ${DineroDelUsuario}")
    }
}

const depositarDinero = () => {
    let dineroADepositar = parseInt (prompt("Cuanto dinero desea depositar?"));
    if (dineroADepositar > 0) {
        DineroDelUsuario += dineroADepositar;
        alert("Su nuevo saldo es de $${DineroDelUsuario}");
    } else {
        alert("El valor es incorrecto.");
    }
}

const transferirDinero = () => {
    let dineroATransferir = parseInt(prompt("Cuanto dinero deasea transferir?"));
    let resultado = validarSaldo(dineroATransferir);
    if(resultado) {
        alert("La transferencia se realizo con exito, su nuevo saldo es de $${DineroDelUsuario}")
    }
}

function seleccionarOperacionDelMenu(operacion) {
    switch(opcionMenu) {

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
            alert ("Nos vemos.");
        break;
        
        default:
        
        alert ("No existe la opcion ingresada, intente de nuevo.")
        
        break;
        
        }        
}

do {

opcionMenu = prompt("Bienvenido ingrese la operacion a realizar. \n1. Consultar saldo. \n2. Retirar dinero. \n3. Depositar dinero. \n4. Transferir dinero. \n5. Salir.");
seleccionarOperacionDelMenu(opcionMenu);

} while ( opcionMenu !== "5" );
