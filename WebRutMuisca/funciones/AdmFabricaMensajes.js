var COD_TIPO_INFO ="1";
var COD_TIPO_ERROR ="2";
var COD_TIPO_ADVERTENCIA ="3";
var COD_TIPO_CONFIRMACION ="4";
var COD_TIPO_CORRECTO ="5";
var COD_TIPO_PASSWORD ="6";

/**
 * Esta clase hace referencia al estado del mensaje ha ser procesado.
 */
DMensaje = function(unCodigo, unTipo, unResumen, unDetalle, unaClaseEstiloFrame, unaClaseEstiloFont){
    this.codigo = unCodigo;
	this.tipo = unTipo;
	this.resumen = unResumen;
	this.detalle = unDetalle;
	this.claseEstiloFrame = unaClaseEstiloFrame;
	this.claseEstiloFont = unaClaseEstiloFont;

}

DMensaje.prototype.getTipoMensaje = function(){
	return this.tipo;
}
DMensaje.prototype.getCodigoMensaje = function (){
    return this.codigo;
}
DMensaje.prototype.getResumenMensaje = function (){
    return this.resumen;
}
DMensaje.prototype.getDetalleMensaje = function (){
	return this.detalle;
}
DMensaje.prototype.getClaseEstiloFrame = function (){
    return this.claseEstiloFrame;
}
DMensaje.prototype.getClaseEstiloFont = function(){
    return this.claseEstiloFont;
}
DMensaje.prototype.setRendererMensaje = function(unRendererMensaje){
    this.renderer = unRendererMensaje;
    this.renderer.setMensaje(this);
}
DMensaje.prototype.getRendererMensaje = function (){
    return this.renderer;
}


/**
 * La superclase para dibujar un mensaje.
 */
function DRendererMensaje(){
	this.mensaje = null;
	this.rutaImagenes = "imagenes/es/";
    this.eventosListeners = new Hashtable();

    this.putEventoFunctionListener = function (unKeyEvento, unKeyFunctionListener){
	    this.eventosListeners.put(unKeyEvento, unKeyFunctionListener);
	}
    this.getFunctionListener = function (unKeyEvento){
	    return this.eventosListeners.get(unKeyEvento);
	}
	this.setMensaje = function (unMensaje){
    	this.mensaje = unMensaje;
	}
	this.getMensaje= function(){
    	return this.mensaje;
	}
    this.dibujar = function (){
        //Todos los renders deben implementar este método.
    }
}

/***
 * Esta clase hace referencia al render que dibuja un mensaje de correcto
 */
DRendererMensajeInformativo.prototype=new DRendererMensaje();
DRendererMensajeInformativo.prototype.constructor=DRendererMensajeInformativo;

function DRendererMensajeInformativo(unMensaje){
	this.mensaje = unMensaje;
	this.rutaImagenes = "imagenes/es/";

	/**
     * Mantiene una referencia a un Hashtable que contiene los tipos de eventos
     * mapeados a unos handlers.
     */
    this.eventosListeners = new Hashtable();

    this.eventosListeners.put("onClickCerrar", "cerrarLayer();");

    this.clonar= function (){this
    	return new DRendererMensajeInformativo();
	}
    this.setMensaje = function (unMensaje){
    	this.mensaje = unMensaje;
	}

    this.dibujar = function(){

		var unHTML = "", posX = 0, posY = 0;

		var  posXShadow = 0,posYShadow = 0;
		if(ie){
 			posX = parseInt((document.body.clientWidth/2) + document.body.scrollLeft);
			posY = parseInt((document.body.clientHeight/2) + document.body.scrollTop);
		}
		else{
			posX = parseInt((window.innerWidth/2) + window.scrollX);
			posY = parseInt((window.innerHeight/2) + window.scrollY);
		}
		posX = posX - (420)/2 >0 ? parseInt(posX - (420)/2) : 0;
		posY = posY - (270)/2 >0 ? parseInt(posY - (270)/2) : 0;
		posXShadow = posX+10;
		posYShadow = posY+10;

    unHTML += "<div id=\"divMensajeShadow\" style=\"position:absolute; width:400px; height:250px; background-color:#999999; left:"+posXShadow+"px; top:" + posYShadow+"px;z-index:1;\" >";
    unHTML += "</div>";
    unHTML += "<div id=\"divMensaje\" style=\"position:absolute;left:"+posX+"px; top:" + posY+"px;width:400px; height:250px; z-index:2; background-color:#fff; border:1px solid #336; border-color:#000000;\" class=\"drag\">";

    unHTML += "<table width='100%' border='0' >";
    unHTML += "<tr bgcolor='#FFFFFF'>";
    unHTML += "<td colspan='2' align='left' valign='bottom'></td>";
    unHTML += "<td></td>";
    unHTML += "<td  colspan='2' align='right' height='58'><img src='"+this.rutaImagenes+"logos/DaniMensajeInfo_mini.gif' width='43' height='62'></td>";
    unHTML += "</tr>";
    unHTML += "<tr>";
    unHTML += "<td background = '"+this.rutaImagenes+"fondos/fondoTituloMensajeInfo.jpg' width='20%'><font size='2' face='Arial' color='#FFFFFF'><strong>AYUDA</strong></font></td>";
    unHTML += "<td colspan='4' bgcolor='#FFE188' align='center'><font size='2' face='Arial' color='#FFFFFF'><strong>"+this.mensaje.getResumenMensaje()+"</strong></font></td>";
    unHTML += "</tr>";
    unHTML += "<tr>";
    unHTML += "<td colspan='5' align='center'>&nbsp;</td></tr><tr><td colspan='5' align='center'>";
    unHTML += "<table width='100%' >";
    unHTML += "<tr>";
    unHTML += "<td colspan='5' align='center'></td>";
    unHTML += "</tr>";
    unHTML += "<tr>";
    unHTML += "<td colspan='5' align='justify' id=\"textoMensaje\"><font size='2' face='Arial'>"+this.mensaje.getDetalleMensaje()+"</font></td></tr><tr>";
    unHTML += "<td colspan='5' align='center'></td>";
    unHTML += "</tr>";
    unHTML += "<tr>"
    unHTML += "<td colspan='5' align='center'></td>";
    unHTML += "</tr>";
    unHTML += "</table>";
    unHTML += "</td>";
    unHTML += "</tr>";
    unHTML += "<tr>";
    unHTML += "<td colspan='5' align='center'>&nbsp;</td>";
    unHTML += "</tr>";
    unHTML += "<tr>";
    unHTML += "<td  colspan='5' align='right' bgcolor='#FFE188'>";

    unHTML += "<img height='20' name='ImagenCerrar' width='20' src= '"+this.rutaImagenes+"botones/botcerrar.gif' ";
    unHTML += "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botcerra.gif'\"";
    unHTML += "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botcerrar.gif'\" ";
    unHTML += "onclick=\""+ this.getFunctionListener('onClickCerrar') + "\" ></td>";

    unHTML += "</tr>";
    unHTML += "</table>";
    unHTML += "</div>";
        return unHTML;
	}
}

DRendererMensajeError.prototype=new DRendererMensaje();
DRendererMensajeError.prototype.constructor=DRendererMensajeError;

function DRendererMensajeError(unMensaje){
	this.mensaje = unMensaje;
	this.rutaImagenes = "imagenes/es/";

	/**
     * Mantiene una referencia a un Hashtable que contiene los tipos de eventos
     * mapeados a unos handlers.
     */
    this.eventosListeners = new Hashtable();

    this.eventosListeners.put("onClickCerrar", "cerrarLayer();");
    this.eventosListeners.put("onClickBtnSig", "miGestorMensajes.siguienteMensaje();");
    this.eventosListeners.put("onClickBtnAnt", "miGestorMensajes.anteriorMensaje();");

    this.clonar= function (){
    	return new DRendererMensajeError();
	}

    this.getFechaHoraSistema= function (){
      if(document.getElementById("lblFechaHoraServidor")!=null){
        return  " ["+ document.getElementById("lblFechaHoraServidor").innerHTML +"]:<br>";
      }
      return "";
    }

    this.dibujar = function(){

       	var unHTML = "", posX = 0, posY = 0;

		var  posXShadow = 0,posYShadow = 0;
		if(ie){
 			posX = parseInt((document.body.clientWidth/2) + document.body.scrollLeft);
			posY = parseInt((document.body.clientHeight/2) + document.body.scrollTop);
		}
		else{
			posX = parseInt((window.innerWidth/2) + window.scrollX);
			posY = parseInt((window.innerHeight/2) + window.scrollY);
		}
		posX = posX - (400)/2 >0 ? parseInt(posX - (400)/2) : 0;
		posY = posY - (325)/2 >0 ? parseInt(posY - (325)/2) : 0;
		posXShadow = posX+10;
		posYShadow = posY+10;

                //-- NUEVA VERSION - ERROR
		unHTML = unHTML + "<div id=\"divMensajeShadow\" style=\"position:absolute; width:400px; height:325px; left:"+posXShadow+"px; top:" + posYShadow+"px;z-index:10000;  filter:alpha(opacity=50);-moz-opacity: 0.5;opacity: 0.5; \" >";
		unHTML = unHTML + "</div>";
		unHTML = unHTML + "<div id=\"divMensaje\" style=\"background:url('"+this.rutaImagenes+"logos/DaniMensajeError_mini.gif') no-repeat left top; position:absolute;left:"+posX+"px; top:" + posY+"px;width:400px; height:325px; z-index:10000;\" class=\"drag\">";
		unHTML = unHTML + "<table width='100%' border='0' cellspacing='0' cellpadding='0' style=\"background:url('"+this.rutaImagenes+"fondos/fondoMensajeError.gif') no-repeat right top;\" >";
        unHTML = unHTML +"<tr >";
        unHTML = unHTML +"<td width='14%' rowspan='2'>&nbsp;</td>";
        unHTML = unHTML +"<td height='48' colspan='2'>&nbsp;</td>";
        unHTML = unHTML +"<td width='25%'>&nbsp;</td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr >";
        unHTML = unHTML +"<td height='24' colspan='2' align='left' valign='bottom' style=\"font:10pt bold Arial, Helvetica, sans-serif;color:#ffffff;\">Error</td>";
        unHTML = unHTML +"<td valign='bottom'><div align='center'><img src='"+this.rutaImagenes+"botones/botcerrarrerror.gif' alt='' width='72' height='20'";
        unHTML = unHTML + "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botcerrarrerror.gif'\"";
		unHTML = unHTML + "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botrollover.gif'\" ";
		unHTML = unHTML + "onclick=\""+ this.getFunctionListener('onClickCerrar') + "\" /></div></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr >";
        unHTML = unHTML +"<td height='33' colspan='4' align='left' valign='middle' style=\"padding-left:50px; font:10pt normal Arial, Helvetica, sans-serif;color:#800000;\">";

        unHTML = unHTML +"<div align='center' style=\"overflow:hidden; height:1.4em; width:335px; margin-left:-15px; float:left;\" title=\""+this.mensaje.getResumenMensaje()+ " "+(miGestorMensajes.indiceActual+1) +" de "+ miGestorMensajes.contadorMensajes+"\">"
        unHTML = unHTML +this.mensaje.getResumenMensaje()+ " "+(miGestorMensajes.indiceActual+1) +" de "+ miGestorMensajes.contadorMensajes;
        unHTML = unHTML +"</div>";

        unHTML = unHTML +"</td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr >";
        unHTML = unHTML +"<td height='145' colspan='4' align='center'><div class=\"elDivScroll\" style=\"width:360px; height:150px; overflow:auto; \">";
        unHTML = unHTML +"<table cellspacing='0' cellpadding='0' >";
        unHTML = unHTML +"<tr >";
        unHTML = unHTML +"<td height='140' width='350px' align='left' valign='middle'><font size='2' face='Arial'>"+this.getFechaHoraSistema()+this.mensaje.getDetalleMensaje()+"</font></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"</table>";
        unHTML = unHTML +"</div></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr >";
        unHTML = unHTML +"<td height='35' colspan='4' align='right' valign='top' >";
        unHTML = unHTML +"<table height='32' width='100' border='0' cellspacing='0' cellpadding='0' style='vertical-align:middle;'>";
        unHTML = unHTML +"<tr >";
        unHTML = unHTML +"<td align='center'><img src='" + this.rutaImagenes + "botones/bp_anteriorMsjError.gif' alt='Anterior' name='imgAnterior' width='20' height='21' border='0'";
        unHTML = unHTML + "onmouseout=\"this.src='"+ this.rutaImagenes + "botones/bp_anteriorMsjError.gif'\" onmouseover=\"this.src='"+ this.rutaImagenes + "botones/bp_anteriorMsjErrorRollOver.gif'\"";
        unHTML = unHTML + "onclick=\""+this.getFunctionListener('onClickBtnAnt')+";\"></td>";
        unHTML = unHTML +"<td align='center'><img src='" + this.rutaImagenes + "botones/bp_siguienteMsjError.gif' alt='Siguiente' name='imgSiguiente' width='20' height='21' border='0'";
        unHTML = unHTML + "onmouseout=\"this.src='"+ this.rutaImagenes + "botones/bp_siguienteMsjError.gif'\" onmouseover=\"this.src='"+ this.rutaImagenes + "botones/bp_siguienteMsjErrorRollOver.gif'\"";
        unHTML = unHTML + "onclick=\""+this.getFunctionListener('onClickBtnSig')+";\"></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"</table>";
        unHTML = unHTML +"</td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"</table>";
		unHTML = unHTML + "</div>";

        return unHTML;
    }
}

/***
 * Esta clase hace referencia al render que dibuja un mensaje de correcto
 */
DRendererMensajeCorrecto.prototype=new DRendererMensaje();
DRendererMensajeCorrecto.prototype.constructor=DRendererMensajeCorrecto;

function DRendererMensajeCorrecto(unMensaje){
	this.mensaje = unMensaje;
	this.rutaImagenes = "imagenes/es/";

	/**
     * Mantiene una referencia a un Hashtable que contiene los tipos de eventos
     * mapeados a unos handlers.
     */
    this.eventosListeners = new Hashtable();

    this.eventosListeners.put("onClickCerrar", "cerrarLayer();");

	this.clonar= function (){
    	return new DRendererMensajeCorrecto();
	}

    this.dibujar = function(){

		var unHTML = "", posX = 0, posY = 0;

		var  posXShadow = 0,posYShadow = 0;
		if(ie){
 			posX = parseInt((document.body.clientWidth/2) + document.body.scrollLeft);
			posY = parseInt((document.body.clientHeight/2) + document.body.scrollTop);
		}
		else{
			posX = parseInt((window.innerWidth/2) + window.scrollX);
			posY = parseInt((window.innerHeight/2) + window.scrollY);
		}
		posX = posX - (420)/2 >0 ? parseInt(posX - (420)/2) : 0;
		posY = posY - (270)/2 >0 ? parseInt(posY - (270)/2) : 0;
		posXShadow = posX+10;
		posYShadow = posY+10;

		unHTML = unHTML + "<div id=\"divMensajeShadow\" style=\"position:absolute; width:400px; height:280px; left:"+posXShadow+"px; top:" + posYShadow+"px;z-index:2;\" >";
		unHTML = unHTML + "</div>";
		unHTML = unHTML + "<div id=\"divMensaje\" style=\"position:absolute;left:"+posX+"px; top:" + posY+"px;width:400px; height:280px; z-index:2; class=\"drag\">";

		unHTML = unHTML +"<table width='100%' border='0' background='"+this.rutaImagenes+"fondos/fondoMensajeCorrecto.gif'>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td width='14%' rowspan='2'>&nbsp;</td>";
        unHTML = unHTML +"<td height='51' colspan='2'>&nbsp;</td>";
        unHTML = unHTML +"<td width='25%'>&nbsp;</td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='19' colspan='2' align='left' valign='middle'><font face='Arial' size='1' color='#FFFFFF'><strong>CORRECTO</strong></font></td>";
        unHTML = unHTML +"<td valign='bottom'><div align='center'><img src='"+this.rutaImagenes+"botones/botcerrarcom.gif' alt='' width='72' height='20'";
        unHTML = unHTML + "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botcerrarcom.gif'\"";
		unHTML = unHTML + "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botrollover.gif'\" ";
		unHTML = unHTML + "onclick=\""+ this.getFunctionListener('onClickCerrar') + "\" /></div></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='33' colspan='4' align='center' valign='middle'><font face='Arial' size='2' color='#000000'><strong>"+this.mensaje.getResumenMensaje()+"</strong></font></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='74' colspan='4'>";
        unHTML = unHTML +"<div align='center'>";
        unHTML = unHTML +"<table width='94%' border='0'>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='52' align='justify' valign='middle'><font size='2' face='Arial'>"+this.mensaje.getDetalleMensaje()+"</font></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"</table>";
        unHTML = unHTML +"</div></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='75' colspan='4'>&nbsp;</td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='27'>&nbsp;</td>";
        unHTML = unHTML +"<td width='30%' height='27'>&nbsp;</td>";
        unHTML = unHTML +"<td width='31%'>&nbsp;</td>";
        unHTML = unHTML +"<td height='27'>&nbsp;</td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"</table>";
		unHTML = unHTML + "</div>";

        return unHTML;
	}
}


/**
 * Esta clase hace referencia al Render de un mensaje de confirmación.
 */

DRendererMensajeConfirmacion.prototype=new DRendererMensaje();
DRendererMensajeConfirmacion.prototype.constructor=DRendererMensajeConfirmacion;

function DRendererMensajeConfirmacion(unMensaje){
	this.mensaje = unMensaje;
	this.rutaImagenes = "imagenes/es/";

	/**
     * Mantiene una referencia a un Hashtable que contiene los tipos de eventos
     * mapeados a unos handlers.
     */
    this.eventosListeners = new Hashtable();

    this.eventosListeners.put("onClickCerrar", "cerrarLayer();");
    this.eventosListeners.put("onClickBtnSI",  "confirmarSI();");
    this.eventosListeners.put("onClickBtnNO",  "confirmarNO();");

	this.clonar= function (){
    	return new DRendererMensajeConfirmacion();
	}


    this.dibujar = function(){
		var unHTML = "", posX = 0, posY = 0;

		var  posXShadow = 0,posYShadow = 0;
		if(ie){
 			posX = parseInt((document.body.clientWidth/2) + document.body.scrollLeft);
			posY = parseInt((document.body.clientHeight/2) + document.body.scrollTop);
		}
		else{
			posX = parseInt((window.innerWidth/2) + window.scrollX);
			posY = parseInt((window.innerHeight/2) + window.scrollY);
		}
		posX = posX - (420)/2 >0 ? parseInt(posX - (420)/2) : 0;
		posY = posY - (270)/2 >0 ? parseInt(posY - (270)/2) : 0;
		posXShadow = posX+10;
		posYShadow = posY+10;

		unHTML = unHTML + "<div id=\"divMensajeShadow\" style=\"position:absolute; width:380px; height:270px; background-color:#999999; left:" + posXShadow + "px; top:" + posYShadow + "px;z-index:2;\" >";
		unHTML = unHTML + "</div>";
		unHTML = unHTML + "<div id=\"divMensaje\" style=\"position:absolute;left:"+posX+"px; top:" + posY+"px;width:380px; height:270px; z-index:2; background-color:#fff; border:1px solid #336; border-color:#000000;\" class=\"drag\">";

		unHTML = unHTML + "<table width='100%' border='0' >";
		unHTML = unHTML +"<tr bgcolor='#FFFFFF'>";
		unHTML = unHTML +"<td colspan='2' align='left' valign='bottom'></td>";
		unHTML = unHTML +"<td></td>";
		unHTML = unHTML +"<td  colspan='2' align='right' height='58'><img src='"+this.rutaImagenes+"logos/DaniMensajeConfirmacion_mini.gif' width='43' height='62'></td>";
		unHTML = unHTML +"</tr>";
		unHTML = unHTML +"<tr bgcolor='fff7de' bordercolor='#FFFFFF'>";
		unHTML = unHTML +"<td bgcolor='#2D5544' width='20%'><font size='2' face='Arial' color='#FFFFFF'><strong>CORRECTO</strong></font></td>";
		unHTML = unHTML +"<td colspan='4' bgcolor='#448267' align='center'><font size='2' face='Arial' color='#FFFFFF'><strong>"+this.mensaje.getResumenMensaje()+"</strong></font></td>";
		unHTML = unHTML +"</tr>";
		unHTML = unHTML +"<tr>";
		unHTML = unHTML +"<td colspan='5' align='center'>&nbsp;</td></tr><tr><td colspan='5' align='center'>";
		unHTML = unHTML +"<table width='100%' bgcolor='fff7de' >";
		unHTML = unHTML +"<tr>";
		unHTML = unHTML +"<td colspan='5' align='center'></td>";
		unHTML = unHTML +"</tr>";
		unHTML = unHTML +"<tr>";
		unHTML = unHTML +"<td colspan='5' align='justify' id=\"textoMensaje\"><font size='2' face='Arial'>"+this.mensaje.getDetalleMensaje()+"</font></td></tr><tr>";
		unHTML = unHTML +"<td colspan='5' align='center'></td>";
		unHTML = unHTML +"</tr>";
		unHTML = unHTML +"<tr>"
		unHTML = unHTML +"<td colspan='5' align='center'></td>";
		unHTML = unHTML +"</tr>";
		unHTML = unHTML +"</table>";
		unHTML = unHTML +"</td>";
		unHTML = unHTML +"</tr>";
		unHTML = unHTML +"<tr>";
		unHTML = unHTML +"<td></td>";
		unHTML = unHTML +"<td align='center'>";

		unHTML = unHTML + "<input height='20' type='image' name='btnSI' width='20' src= '"+this.rutaImagenes+"botones/botsi.gif' ";
		unHTML = unHTML + "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botsi.gif'\"";
		unHTML = unHTML + "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botsir.gif'\" ";
		unHTML = unHTML + "onclick=\""+ this.getFunctionListener('onClickBtnSI') + "\" ></td>";

		unHTML = unHTML +"<td></td>";
		unHTML = unHTML +"<td align='center'>";

		unHTML = unHTML + "<input height='20' type='image' name='btnNO' width='20' src= '"+this.rutaImagenes+"botones/botno.gif' ";
		unHTML = unHTML + "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botno.gif'\"";
		unHTML = unHTML + "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botnor.gif'\" ";
		unHTML = unHTML + "onclick=\""+ this.getFunctionListener('onClickBtnNO') + "\" ></td>";
		unHTML = unHTML + "<td></td>";
		unHTML = unHTML + "</tr>";

        unHTML = unHTML + "<tr>";
		unHTML = unHTML + "<td colspan='5' align='right' bgcolor='#448267'>	";
		unHTML = unHTML + "<img height='20' name='ImagenCerrar' width='20' src= '"+this.rutaImagenes+"botones/botcerra.gif' ";
		unHTML = unHTML + "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botcerra.gif'\"";
		unHTML = unHTML + "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botcerrar.gif'\" ";
		unHTML = unHTML + "onclick=\""+ this.getFunctionListener('onClickCerrar') + "\" ></td>";
		unHTML = unHTML + "</tr>";

		unHTML = unHTML + "</table>";
		unHTML = unHTML + "</div>";

        return unHTML;
	}
}

/**
 * Esta clase hace referencia al Render de un mensaje de advertencia.
 */
DRendererMensajeAdvertencia.prototype=new DRendererMensaje();
DRendererMensajeAdvertencia.prototype.constructor=DRendererMensajeAdvertencia;

function DRendererMensajeAdvertencia(unMensaje){
	this.mensaje = unMensaje;
	this.rutaImagenes = "imagenes/es/";

	/**
     * Mantiene una referencia a un Hashtable que contiene los tipos de eventos
     * mapeados a unos handlers.
     */
    this.eventosListeners = new Hashtable();

    this.eventosListeners.put("onClickCerrar", "cerrarLayer();");

	this.clonar= function (){
    	return new DRendererMensajeAdvertencia();
	}


    this.dibujar = function(){
		var unHTML = "", posX = 0, posY = 0;

		var  posXShadow = 0,posYShadow = 0;
		if(ie){
 			posX = parseInt((document.body.clientWidth/2) + document.body.scrollLeft);
			posY = parseInt((document.body.clientHeight/2) + document.body.scrollTop);
		}
		else{
			posX = parseInt((window.innerWidth/2) + window.scrollX);
			posY = parseInt((window.innerHeight/2) + window.scrollY);
		}
		posX = posX - (420)/2 >0 ? parseInt(posX - (420)/2) : 0;
		posY = posY - (270)/2 >0 ? parseInt(posY - (270)/2) : 0;
		posXShadow = posX+10;
		posYShadow = posY+10;


		unHTML = unHTML + "<div id=\"divMensajeShadow\" style=\"position:absolute; width:400px; height:325px; left:"+posXShadow+"px; top:" + posYShadow+"px;z-index:10000;  filter:alpha(opacity=50);-moz-opacity: 0.5;opacity: 0.5; \" >";
		unHTML = unHTML + "</div>";
		unHTML = unHTML + "<div id=\"divMensaje\" style=\"background:url('"+this.rutaImagenes+"logos/DaniMensajeInfo_mini.gif') no-repeat left top; position:absolute;left:"+posX+"px; top:" + posY+"px;width:400px; height:325px; z-index:10000;\" class=\"drag\">";
		unHTML = unHTML + "<table width='100%' border='0' cellspacing='0' cellpadding='0' style=\"background:url('"+this.rutaImagenes+"fondos/fondoMensajeInfo.gif') no-repeat right top;\" >";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td width='14%' rowspan='2'>&nbsp;</td>";
        unHTML = unHTML +"<td height='48' colspan='2'>&nbsp;</td>";
        unHTML = unHTML +"<td width='25%'>&nbsp;</td>";
		unHTML = unHTML +"</tr>";
		unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='24' colspan='2' align='left' valign='middle' style=\"font:10pt bold Arial, Helvetica, sans-serif;color:#ffffff;\">Advertencia</td>";
        unHTML = unHTML +"<td valign='bottom'><div align='center'><img src='"+this.rutaImagenes+"botones/botcerrarcom.gif' alt='' width='72' height='20'";
        unHTML = unHTML + "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botcerrarcom.gif'\"";
		unHTML = unHTML + "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botrollover.gif'\" ";
		unHTML = unHTML + "onclick=\""+ this.getFunctionListener('onClickCerrar') + "\" /></div></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='33' colspan='4' align='left' valign='middle' style=\"padding-left:50px; font:10pt normal Arial, Helvetica, sans-serif;color:#000000;\">"+this.mensaje.getResumenMensaje()+"</td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='190' colspan='4' align='center'><div class=\"elDivScroll\" style=\"width:360px; height:150px; overflow:auto; \">";
        unHTML = unHTML +"<table cellspacing='0' cellpadding='0' >";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='140' width='350px' align='justify' valign='middle'><font size='2' face='Arial'>"+this.mensaje.getDetalleMensaje()+"</font></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"</table>";
        unHTML = unHTML +"</div></td>";
        unHTML = unHTML +"</tr>";
        unHTML = unHTML +"<tr>";
        unHTML = unHTML +"<td height='35' colspan='4' align='right' valign='top'>&nbsp;</td>";
		unHTML = unHTML + "</tr>";
		unHTML = unHTML + "</table>";
		unHTML = unHTML + "</div>";

        return unHTML;
	}
}

/**
 * Esta clase hace referencia al Render de un mensaje de password.
 */
DRendererMensajePassword.prototype=new DRendererMensaje();
DRendererMensajePassword.prototype.constructor=DRendererMensajePassword;
function DRendererMensajePassword(unMensaje){
  this.mensaje = unMensaje;
  this.rutaImagenes = "imagenes/es/";

  /**
   * Mantiene una referencia a un Hashtable que contiene los tipos de eventos
   * mapeados a unos handlers.
   */
  this.eventosListeners = new Hashtable();
  
	this.eventosListeners.put("onClickCerrar", "cerrarLayer();");
  this.eventosListeners.put("onClickBtnSI",  "confirmarPassSI();");
  this.eventosListeners.put("onClickBtnNO",  "confirmarPassNO();");

  this.clonar= function () {
    return new DRendererMensajePassword();
  }

  this.dibujar = function(){
    var unHTML = "", posX = 0, posY = 0;

    var  posXShadow = 0,posYShadow = 0;
    if(ie){
            posX = parseInt((document.body.clientWidth/2) + document.body.scrollLeft);
            posY = parseInt((document.body.clientHeight/2) + document.body.scrollTop);
    }
    else{
            posX = parseInt((window.innerWidth/2) + window.scrollX);
            posY = parseInt((window.innerHeight/2) + window.scrollY);
    }
    posX = posX - (420)/2 >0 ? parseInt(posX - (420)/2) : 0;
    posY = posY - (270)/2 >0 ? parseInt(posY - (270)/2) : 0;
    posXShadow = posX+10;
    posYShadow = posY+15;

    unHTML = unHTML + "<div id=\"divMensajeShadow\" style=\"position:absolute; width:400px; height:325px; left:"+posXShadow+"px; top:" + posYShadow+"px;z-index:10000;  filter:alpha(opacity=50);-moz-opacity: 0.5;opacity: 0.5; \" >";
	unHTML = unHTML + "</div>";
	unHTML = unHTML + "<div id=\"divMensaje\" style=\"background:url('"+this.rutaImagenes+"logos/DaniMensajeCorrecto_mini.gif') no-repeat left top; position:absolute;left:"+posX+"px; top:" + posY+"px;width:400px; height:325px; z-index:10000;\" class=\"drag\">";
	unHTML = unHTML + "<table width='100%' border='0' cellspacing='0' cellpadding='0' style=\"background:url('"+this.rutaImagenes+"fondos/fondoMensajeCorrecto.gif') no-repeat right top;\" >";
    unHTML = unHTML +"<tr>";
    unHTML = unHTML +"<td width='14%' rowspan='2'>&nbsp;</td>";
    unHTML = unHTML +"<td height='48' colspan='2'>&nbsp;</td>";
    unHTML = unHTML +"<td width='25%'>&nbsp;</td>";
    unHTML = unHTML +"</tr>";
    unHTML = unHTML +"<tr>";
    unHTML = unHTML +"<td height='24' colspan='2' align='left' valign='middle' style=\"font:10pt bold Arial, Helvetica, sans-serif;color:#ffffff;\">Password</td>";
    unHTML = unHTML +"</tr>";
    unHTML = unHTML +"<tr>";
    unHTML = unHTML +"<td height='33' colspan='4' align='left' valign='middle' style=\"padding-left:50px; font:10pt normal Arial, Helvetica, sans-serif;color:#2D5544;\">"+this.mensaje.getResumenMensaje()+"</td>";
    unHTML = unHTML +"</tr>";
    unHTML = unHTML +"<tr>";
    unHTML = unHTML +"<td height='190' colspan='4' align='center'><div class=\"elDivScroll\" style=\"width:360px; height:150px; overflow:auto; background-color:#ffffff;\">";
	unHTML += "           <table width='100%' bgcolor='fff7de' cellspacing='0' cellpadding='0' >";
	unHTML += "              <tr>";
	unHTML += "                <td colspan='5' align='justify' id=\"textoMensaje\"><font size='2' face='Arial'>"+this.mensaje.getDetalleMensaje()+"</font></td>";
	unHTML += "              </tr>";
	unHTML += "<tr>&nbsp;</tr>";
	unHTML += "              <tr>";
	unHTML += "                  <td  colspan='3'> <div align='right'>Escriba su clave:</div></td>";
	unHTML += "                  <td colspan='2' > <div align='left'>";
	unHTML += "                      <input name='clave' type='password' id='clave' value='' onclick='this.focus();'/>";
	unHTML += "                  </div></td>";
	unHTML += "              </tr>";
	unHTML += "              <tr>";
	unHTML += "                  <td  colspan='3' > <div align='right'>Reescriba su clave:</div></td>";
	unHTML += "                  <td colspan='2' > <div align='left'>";
	unHTML += "                      <input name='reclave' type='password' id='reclave' value='' onclick='this.focus();'/>";
	unHTML += "                  </div></td>";
	unHTML += "              </tr>";
	unHTML += "              <tr>";
	unHTML += "                   <td colspan='5' > <div align='center'> ";
	unHTML += "                       <input  style=\"background-color: #FFFFFF; border-top: none; border-right: none; border-bottom: none; border-left: none;\"name='textoValidacion' type='text' id='textoValidacion' value='' size='45' maxlength='45'readonly />";
	unHTML += "                   </div></td>";
	unHTML += "               </tr>";
	unHTML += "           </table>";
    unHTML = unHTML +"</div></td>";
    unHTML = unHTML +"</tr>";
    unHTML = unHTML +"<tr >";
    unHTML = unHTML +"<td height='35' colspan='4' align='right' valign='top' >";
    unHTML = unHTML +"<table height='32' width='100' border='0' cellspacing='0' cellpadding='0' style='vertical-align:middle;'>";
    unHTML = unHTML +"<tr >";
    unHTML = unHTML +"<td align='center'><img src='" + this.rutaImagenes+"botones/botsi.gif' alt='Si' name='btnSI' width='20' height='21' border='0'";
    unHTML = unHTML + "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botsi.gif'\"";
    unHTML = unHTML + "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botsir.gif'\" ";
    unHTML = unHTML + "onclick=\""+ this.getFunctionListener('onClickBtnSI') + "\" ></td>";
    unHTML = unHTML +"<td align='center'><img src='" + this.rutaImagenes+"botones/botno.gif' alt='No' name='btnNO' width='20' height='21' border='0'";
    unHTML = unHTML + "onMouseOut=\"this.src = '"+this.rutaImagenes+"botones/botno.gif'\"";
    unHTML = unHTML + "onMouseOver=\"this.src = '"+this.rutaImagenes+"botones/botnor.gif'\" ";
    unHTML = unHTML + "onclick=\""+ this.getFunctionListener('onClickBtnNO') + "\" ></td>";
    unHTML = unHTML +"</tr>";
    unHTML = unHTML +"</table>";
    unHTML = unHTML +"</td>";
    unHTML = unHTML +"</tr>";
    unHTML = unHTML +"</table>";
    unHTML = unHTML + "</div>";
    return unHTML;
  }
}


/**
 * Esta clase permite obtener un Renderer de acuerdo al tipo de mensaje que se este procesando.
 */
DFabricaRendererMensaje = function DFabricaRendererMensaje(){
    this.renders = new Hashtable();
    this.renders.put("1",new DRendererMensajeInformativo());
    this.renders.put("2",new DRendererMensajeError());
    this.renders.put("3",new DRendererMensajeAdvertencia());
    this.renders.put("4",new DRendererMensajeConfirmacion());
    this.renders.put("5",new DRendererMensajeCorrecto());
    this.renders.put("6",new DRendererMensajePassword());
}

DFabricaRendererMensaje.prototype.getRenderMensaje = function (unTipoMensaje){
    if(this.renders.get(unTipoMensaje)){
        return this.renders.get(unTipoMensaje).clonar();
    }else{
        return this.renders.get("1").clonar();
	}
}


/**
 * Esta clase permite obtener un mensaje.
 */
DFabricaMensajes = function DFabricaMensajes(){

    if(this.fabricaRenders == null){
	    this.fabricaRenders = new DFabricaRendererMensaje();
    }
}

DFabricaMensajes.prototype.getMensaje = function (unCodigo, unTipo, unResumen, unDetalle, unaClaseEstilo, unaClaseEstiloFont){
    var unMensaje = new DMensaje(unCodigo, unTipo, unResumen, unDetalle, unaClaseEstilo, unaClaseEstiloFont);
    unMensaje.setRendererMensaje(this.fabricaRenders.getRenderMensaje(unMensaje.getTipoMensaje()));
    return unMensaje;
}


function verMensajes() {
	 var titulo = ''; 
	 var detalle = '';
	 var mensajes, tipo,html ;
	 mensajes = document.getElementById("tblMensajes");
	 for(i = 0; mensajes && i < mensajes.rows.length; i++){
		 fila = mensajes.rows[i];
		 titulo = fila.childNodes.item(2).innerHTML;
		 detalle = fila.childNodes.item(3).innerHTML;  
		 tipo = fila.childNodes.item(1).innerHTML;
		 break;
	 }
	 if(titulo != '' || detalle != '' ){
		cerrarLoader();
		html = conformarMensaje();
		jQuery('#divMensaje').after(html).remove();
		jQuery('#vistaActivacionFD\\:formActivacionFD\\:lnkMensaje').click();
		jQuery("#txtMensajeDetallado").text(detalle);
		jQuery("#txtMensaje").text(titulo);
		aplicarEstiloMensaje (parseInt(tipo), '#TB_ajaxContent', '#txtMensaje', '#divMensajeDetallado');
	 return false;
	 }
	 return true;
}


function aplicarEstiloMensaje(tipo,componenteMensaje, titulo, divMensajeDetallado){
	switch(tipo)
 {
    case 1:
    {
 	   jQuery(componenteMensaje).css('border','rgba(97,181,132, 1) 1px solid');
 	   jQuery(divMensajeDetallado).css('border','rgba(97,181,132, 1) 1px solid');
 	   jQuery(titulo).css('color','rgba(97,181,132, 1)');
 	  break;

    }
    case 2: 
    {
 	   jQuery(componenteMensaje).css('border','rgba(170,92,98,1) 1px solid');
 	   jQuery(divMensajeDetallado).css('border','rgba(170,92,98,1) 1px solid');
 	   jQuery(titulo).css('color','rgba(170,92, 98, 1)');
 		break;

    }
    case 3:
    {
 	   jQuery(componenteMensaje).css('border','rgba(233,163, 42, 1) 1px solid');
 	   jQuery(divMensajeDetallado).css('border','rgba(233,163, 42, 1) 1px solid');
 	   jQuery(titulo).css('color','rgba(233,163, 42, 1)');
 		break;

    }
    case  4:
    {
 	   jQuery(componenteMensaje).css('border','rgba(233,163, 42, 1) 1px solid');
 	   jQuery(divMensajeDetallado).css('border','rgba(233,163, 42, 1) 1px solid');
 	   jQuery(titulo).css('color','rgba(233,163, 42, 1)');
 		break;

    }
    case  5:
    {
 	   jQuery(componenteMensaje).css('border','rgba(97,181,132, 1) 1px solid');
 	   jQuery(divMensajeDetallado).css('border','rgba(97,181,132, 1) 1px solid');
 	   jQuery(titulo).css('color','rgba(97,181,132, 1)');
		break;
    }
 }
}

function conformarMensaje(){
var html =   "<div id='divMensaje' style='display: none;'> " + 
	" <div style='text-align: left; color: rgba(170, 92, 98, 1); font-family: 'Segoe UI'; font-size: 13pt;'> " +  
	"	<table border='0' width='100%'> " +  
	"		<tr> " + 
	"			<td style='text-align: left; padding: 15px; vertical-align: middle;'><label id='txtMensaje'></label></td> " +  
	"			<td style='text-align: right; vertical-align: top;'><a onclick='javascript:JavaScript:tb_remove();return false;'><img src='imagenes/es/botones/btn_cancelar.png' id='cerrarMensaje' /></a></td> " +  
	"		</tr> " +  
	"	</table> " +  
	" </div> " +  
	" <div style='text-align: justify; height: 60px; color: #333; padding: 15px; background-color: white; font-family: 'Segoe UI'; font-size: 11pt;'> " +  
	"	<div style='padding: 15px; border: rgba(170, 92, 98, 1) 1px solid;' id='divMensajeDetallado'> " +  
	"		<label id='txtMensajeDetallado'> </label> " +  
	"	</div> " +  
"	</div> " +  
"	</div>" ;

return html;

}

