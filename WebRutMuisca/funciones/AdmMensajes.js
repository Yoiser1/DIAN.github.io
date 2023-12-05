var ie=document.all
var ns6=document.getElementById&&!document.all

var dragapproved=false
var z,x,y,shadow;


function DGestorMensajes(){

	this.mensajes = new Array();
	this.contadorMensajes = 0;
	this.indiceActual = 0;


	this.agregarMensaje = function (unMensaje){
		this.mensajes[this.mensajes.length] = unMensaje;
		this.contadorMensajes = this.contadorMensajes + 1;
		/**
		 * Retorna la posiciÃ³n del mensaje en el arreglo.
		 */
		return this.mensajes.length - 1;
	}

	this.siguienteMensaje = function (){
		var i;

		if((this.indiceActual + 1) < this.mensajes.length){
			this.indiceActual++;
			this.mostrarMensaje(this.mensajes[this.indiceActual]);
		}
	}

	this.anteriorMensaje = function (){
		if( 0 < this.indiceActual ){
			this.indiceActual--;
			this.mostrarMensaje(this.mensajes[this.indiceActual]);
		}
	}

	this.cerrarlayer = function(idLayer){
		var layer = document.getElementById(idLayer);
		if(layer){
			layer.style.visibility='hidden';
			document.getElementById(idLayer+"Shadow").style.visibility='hidden';
		}
	}

	this.mostrarMensaje = function (unMensaje){

		var tablaLayer, tbodyLayer, trLayer, tdLayer;

		if(!unMensaje){
			unMensaje = this.mensajes[0];
		}

		if(unMensaje){

			if(!document.getElementById("tdFrameMensaje")){

				tablaLayer = document.createElement("TABLE");
				tbodyLayer = document.createElement("TBODY");
				trLayer = document.createElement("TR");
				tdLayer = document.createElement("TD");
				tdLayer.id="tdFrameMensaje";

				tdLayer.innerHTML = unMensaje.getRendererMensaje().dibujar();

				trLayer.appendChild(tdLayer);
				tbodyLayer.appendChild(trLayer);
				tablaLayer.appendChild(tbodyLayer);
				document.body.appendChild(tablaLayer);

			}else{
				tdLayer = document.getElementById("tdFrameMensaje");
				tdLayer.innerHTML = unMensaje.getRendererMensaje().dibujar();

			}
		}
	}

	this.limpiarMensajes = function(){
		this.mensajes = new Array();
		this.contadorMensajes = 0;
		this.indiceActual = 0;
	}
}

function move(e){
	if (dragapproved){
		z.style.left=ns6? temp1+e.clientX-x: temp1+event.clientX-x
				z.style.top=ns6? temp2+e.clientY-y : temp2+event.clientY-y

						if(shadow){
							shadow.style.left=ns6? tempshadow1+e.clientX-x: tempshadow1+event.clientX-x
									shadow.style.top=ns6? tempshadow2+e.clientY-y : tempshadow2+event.clientY-y
						}
		return false
	}
}

//-- NUEVO -- //
function getReal(el, type, value) {
	temp = el;
	while ((temp != null) && (temp.tagName != "BODY" && temp.tagName != "HTML")) {
		if (eval("temp." + type) == value) {
			el = temp;
			return el;
		}
		temp = ns6? temp.parentNode : temp.parentElement;
	}
	return el;
}
//-- FIN NUEVO -- //

function drags(e){
	try {
		if (!ie&&!ns6)
			return
			var firedobj=ns6? e.target : (event.target || event.srcElement);
		var topelement=ns6? "HTML" : "BODY"

			// -- NUEVO -- //
			firedobj=getReal(firedobj, "className", "elDivScroll");
		if(firedobj.className=="elDivScroll"){
			dragapproved=false;
			return;
		}
		// -- FIN NUEVO -- //

		while (firedobj.tagName!=topelement&&firedobj.className!="drag"){
			firedobj=ns6? firedobj.parentNode : firedobj.parentElement		
		}

		if (firedobj.className=="drag"){
			var idLayer = firedobj.id;
			dragapproved=true
			z=firedobj

			shadow = document.getElementById(idLayer+"Shadow");


			temp1=parseInt(z.style.left+0)
			temp2=parseInt(z.style.top+0)

			if(shadow){
				tempshadow1=parseInt(shadow.style.left+0)
				tempshadow2=parseInt(shadow.style.top+0)
			}
			x=ns6? e.clientX: event.clientX
					y=ns6? e.clientY: event.clientY
							document.onmousemove=move
		}
		
	}catch(err) {
		return false;
	}
}


document.onmousedown=drags
document.onmouseup=new Function("dragapproved=false")
window.onscroll=desplazarVentana

function desplazarVentana(e){

	var posX = 0;
	var posY = 0;
	var layer = document.getElementById("divMensaje");
	var shadow = document.getElementById("divMensajeShadow");

	if(layer){
		if(!(layer.style.visibility=="hidden")){
			if(ns6){
				posX = parseInt((window.innerWidth/2) + window.scrollX);
				posY = parseInt((window.innerHeight/2) + window.scrollY);
			}
			else{
				posX = parseInt((document.body.clientWidth/2) + document.body.scrollLeft);
				posY = parseInt((document.body.clientHeight/2) + document.body.scrollTop);
			}
			posX = posX - (420)/2 >0 ? parseInt(posX - (420)/2) : 0;
			posY = posY - (270)/2 >0 ? parseInt(posY - (270)/2) : 0;
			layer.style.left = posX;
			layer.style.top= posY;

			if(shadow){
				shadow.style.left = posX+10;
				shadow.style.top= posY+10;
			}
		}
	}
}

var miGestorMensajes = new DGestorMensajes();

function manejarMensajes(){
	var unaTablaMensajes = document.getElementById("tblMensajes");
	var i, unCodigo, unTipo, unTitulo, unDetalle, unEstilo, unaClaseEstilo, unMensaje;

	var unaFabricaMensajes = new DFabricaMensajes();

	for(i = 0; unaTablaMensajes && i < unaTablaMensajes.rows.length; i++){

		unaFilaMensaje = unaTablaMensajes.rows[i];
		unCodigo = unaFilaMensaje.childNodes.item(0).innerHTML;
		unTipo = unaFilaMensaje.childNodes.item(1).innerHTML;
		unTitulo = unaFilaMensaje.childNodes.item(2).innerHTML;
		unDetalle = unaFilaMensaje.childNodes.item(3).innerHTML;
		unEstilo = unaFilaMensaje.childNodes.item(4).innerHTML;
		unaClaseEstilo = unaFilaMensaje.childNodes.item(5).innerHTML;

		unMensaje = unaFabricaMensajes.getMensaje(unCodigo,unTipo, unTitulo,unDetalle,unEstilo,unaClaseEstilo);
		miGestorMensajes.agregarMensaje(unMensaje);
	}
	miGestorMensajes.mostrarMensaje();
}


function confirmarOperacion(unTituloMensaje, unDetalleMensaje){

	var unaFabricaMensajes = new DFabricaMensajes();

	var unMensaje = unaFabricaMensajes.getMensaje(0, COD_TIPO_CONFIRMACION, unTituloMensaje, unDetalleMensaje, "","");
	miGestorMensajes.limpiarMensajes();
	miGestorMensajes.agregarMensaje(unMensaje);
	miGestorMensajes.mostrarMensaje();
}

function confirmarNO(){
	miGestorMensajes.cerrarlayer('divMensaje');
}

function cerrarLayer(){
	miGestorMensajes.cerrarlayer('divMensaje');
}