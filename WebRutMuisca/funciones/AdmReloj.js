var clockID = 0;
var milisegundosServidor = 0;

function actualizarReloj() {
    if(clockID) {
        clearTimeout(clockID);
        clockID  = 0;
    }

    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var dias = new Array("Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado"); 

    var fechaActualCliente = new Date();
    var milisegundosActuales = fechaActualCliente.getTime();

    milisegundosServidor =  milisegundosServidor + 1000;

    fechaActualCliente.setTime(milisegundosServidor);

    var unDia = fechaActualCliente.getDate() < 10 ? "0" + fechaActualCliente.getDate() : "" + fechaActualCliente.getDate();
    var unMes = fechaActualCliente.getMonth() + 1 < 10 ? "0" + (fechaActualCliente.getMonth() + 1) : "" + (fechaActualCliente.getMonth() + 1);
    var unasHoras = fechaActualCliente.getHours() < 10 ? "0" + fechaActualCliente.getHours() : "" + fechaActualCliente.getHours();
    var unosMinutos = fechaActualCliente.getMinutes() < 10 ? "0" + fechaActualCliente.getMinutes() : "" + fechaActualCliente.getMinutes();
    var unosSegundos = fechaActualCliente.getSeconds() < 10 ? "0" + fechaActualCliente.getSeconds() : "" + fechaActualCliente.getSeconds();
    //var unAxo = "" + (1900 + fechaActualCliente.getYear());
    var unAxo = "";

    if(fechaActualCliente.getYear() > 1900){
        unAxo = "" + fechaActualCliente.getYear()
    }else{
        unAxo = "" +  (1900 + fechaActualCliente.getYear());
    }
    if (document.getElementById("lblFechaHoraServidor")){
        document.getElementById("lblFechaHoraServidor").innerHTML = dias[fechaActualCliente.getDay()] + " " + fechaActualCliente.getDate() + " de " +  meses[fechaActualCliente.getMonth()] + " de " + unAxo + ", " + unasHoras + ":" + unosMinutos + ":" + unosSegundos;    
    }
    if (document.getElementById("lblFechaHoraRespon")){
        document.getElementById("lblFechaHoraRespon").innerHTML = dias[fechaActualCliente.getDay()] + " " + fechaActualCliente.getDate() + " de " +  meses[fechaActualCliente.getMonth()] + " de " + unAxo + ", " + unasHoras + ":" + unosMinutos + ":" + unosSegundos;    
    }
    
    clockID = setTimeout("actualizarReloj()", 1000);
}

function iniciarReloj() {

    milisegundosServidor = document.getElementById("hddMilisegundosServidor").value * 1;

    clockID = setTimeout("actualizarReloj()", 500);
}

function terminarReloj() {
    if(clockID) {
        clearTimeout(clockID);
        clockID  = 0;
    }
}
