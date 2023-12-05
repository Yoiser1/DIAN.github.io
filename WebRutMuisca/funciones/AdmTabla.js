function crearTabla(){
    var unaTabla =  document.createElement("TABLE");
    var unBody =  document.createElement("TBODY");

    unaTabla.appendChild(unBody);

    return unaTabla;
}

/**
 * @param FilaAdicionar Este objeto es de tipo "TR" y es la fila adicionar.
 * @param Tabla Es de tipo "TABLE" y es la tabla destino donde se adicionara el objeto FilaAdicionar
 * @param sinRepeticion es de tipo entero (0,1).
 *        El  0 indica que no se hace validación de filas duplicadas, el valor 1 si lo realiza.
 * @param indiceCelda es de tipo entero, e indica el indice de la celda por la cual se realizara la validación.
 */
function adicionarFilaTabla(unaFilaAdicionar,unaTabla,sinRepeticion,indiceCelda){
	var i,Fila,Celda,flag;
	var tbody = unaTabla.getElementsByTagName("TBODY")[0];
	var CeldasFila;
	unaFilaAdicionar.setAttribute("id", unaTabla.id + unaTabla.rows.length);
	unaFilaAdicionar.setAttribute("name", unaTabla.id + unaTabla.rows.length);

	//Si el navegador es Internet Explorer se maneja el indice desde 0
	//de lo contrario se maneja 1.
	var indexSelect = 1;
	if(navigator.appName.indexOf("Microsoft")>-1)
                indexSelect = 0;

        //alert("entro adicionar");

	if(sinRepeticion==1){
		CeldasFila= unaFilaAdicionar.getElementsByTagName("TD");

		flag=0;
		for(i=0;i<unaTabla.rows.length;i++){
			Fila=unaTabla.rows[i];
			Celda=Fila.cells[indiceCelda];

			if(Celda.childNodes.item(0).value==CeldasFila[indiceCelda].childNodes.item(0).value){
				flag=1;
                    	}
		}
		if(flag==0){
                        tbody.appendChild(unaFilaAdicionar);
		}
	}
	else{
		tbody.appendChild(FilaAdicionar);
	}
}

/**
 * @param desde : Es de tipo entero, e indica el indice de la fila inicial a copiar en la TablaDestino.
 * @param hasta : Es de tipo entero, e indica el indice de la fila final a copiar en la TablaDestino.
 * @param TablaFuente : Es de tipo "TABLE", es el objeto tabla fuente de los datos a copiar.
 * @param TablaDestino: Es de tipo "TABLE", es el objeto tabla destino de los datos a copiar.
 * @param sinRepeticion es de tipo entero (0,1).
 *        El  0 indica que no se hace validación de filas duplicadas, el valor 1 si lo realiza.
 * @param indiceCelda es de tipo entero, e indica el indice de la celda por la cual se realizara la validación.
*/
function CopiarFilasTabla(desde,hasta,TablaFuente,TablaDestino,sinRepeticion,indiceCelda){
	var FilaFuente,FilaDestino,FilaAux,yaExiste,i,k;
	sinRepeticion=sinRepeticion*1;
	desde=desde*1;
	hasta=hasta*1;

	for(i=desde;i<hasta;i++){
		FilaFuente=TablaFuente.rows[i];
		yaExiste=0;
		for(k=0;k<TablaDestino.rows.length;k++){
			FilaDestino=TablaDestino.rows[k];
			//alert(FilaDestino.cells[0].firstChild.value+" ... "+k);
			if(FilaDestino.cells[indiceCelda].firstChild.value == FilaFuente.cells[indiceCelda].firstChild.value ){
				//alert(FilaDestino.cells[0].firstChild.value +" == "+FilaFuente.cells[0].firstChild.value);
				//alert(sinRepeticion);
				if(sinRepeticion==1){
					yaExiste=1;
				}
			}
		}
		if(yaExiste==0){
			//Adicionamos un registro a la tabla;
			//alert("entro adicionar fila en tabla actividades original: "+FilaFuente.cells[0].firstChild.value);
			FilaAux=document.createElement("TR");
			CopiarCeldasTabla(0,FilaFuente.cells.length,FilaFuente,FilaAux);
			AdicionarFilaTabla(FilaAux,TablaDestino,0,0);
		}
	}
}

/**
 * @param desde : Es de tipo entero, e indica el indice de la fila inicial a remover.
 * @param hasta : Es de tipo entero, e indica el indice de la fila final de remoción.
 * @param Tabla : Es de tipo "TABLE", es el objeto tabla donde se efectuara la operación.
 */
function RemoverFilas(desde,hasta,Tabla){
	var i;
	desde=desde*1;
	hasta=hasta*1;

	for(i=desde;i<hasta;i++){
		//alert("Removio la fila: "+i+"  ");
		Tabla.deleteRow(desde);
	}
}

function CopiarCeldasTabla(desde, hasta, FilaFuente,FilaDestino){
	var i;
	desde=desde*1;
	hasta=hasta*1;
	for(i=desde;i<hasta;i++){
		AnexarCeldaTabla(document.createElement("TD"),FilaDestino,FilaFuente.cells[i].firstChild.name,FilaFuente.cells[i].firstChild.value);
	}
}

function InsertarCeldaTabla(Fila,Celda,CeldaRef,TextoNombre,TextoValor){
	var texto=document.createElement("INPUT");
	texto.name=TextoNombre;
	texto.value=TextoValor;
	Celda.appendChild(texto);
	Fila.insertBefore(Celda,CeldaRef);
}

function AnexarCeldaTabla(Celda,Fila,TextoNombre,TextoValor){
	var texto =document.createElement("INPUT");
	texto.name=TextoNombre;
	texto.value=TextoValor;
	Celda.appendChild(texto);
	Fila.appendChild(Celda);
}

function RenombrarCasillaTabla(Celda,preFijo,postFijo){
	//alert("renombrar casilla");
	var texto=Celda.firstChild;
	texto.name=preFijo+texto.name+postFijo;
	//alert(texto.name);
}

function RenombrarCeldasTabla(Tabla,prefijo,postfijo){
	var i,j,Fila;
	//alert("entro a renombrar...");
	for(i=0;i<Tabla.rows.length;i++){
		Fila=Tabla.rows[i];
		for(j=0;j<Fila.cells.length;j++){
			RenombrarCasillaTabla(Fila.cells[j],prefijo,postfijo);
		}
	}
}

function TransformarFormatoTramiteTabla(TablaFuente,TablaFormateada){
	var codigo="",alias,FilaFuente="",FilaFormateada="",i;
	for(i=0;i<TablaFuente.rows.length;i++){
		FilaFuente=TablaFuente.rows[i];
		if(FilaFuente.cells[0].firstChild.value==codigo){
			CopiarCeldasTabla(2,FilaFuente.cells.length,FilaFuente,FilaFormateada);
      //codPar,nomPar,valPar,protPar;
		}
		else{
			if(codigo!=""){
				AdicionarFilaTabla(FilaFormateada,TablaFormateada,1,0);
			}
			FilaFormateada=document.createElement("TR");
			codigo=FilaFuente.cells[0].firstChild.value;
			alias=FilaFuente.cells[1].firstChild.value;
			AnexarCeldaTabla(document.createElement("TD"),FilaFormateada,"codAct",codigo);
			AnexarCeldaTabla(document.createElement("TD"),FilaFormateada,"nomAct",alias);
			CopiarCeldasTabla(2,FilaFuente.cells.length,FilaFuente,FilaFormateada);
		}
	}//cierra for
	if(FilaFormateada!=""){
  	//Se inserta la ultima fila
		AdicionarFilaTabla(FilaFormateada,TablaFormateada,1,0);
	}
}//cierra funcion TransformarFormatoTramiteTabla


/**
* @Deprecated Es solo utilizado en el subsistema de Gestion de Expedientes
* @param tblDatosOrigen : Es de tipo "TABLE", es el objeto tabla fuente de los datos a copiar.
* @param tblDatosDestino : Es de tipo "TABLE", es el objeto tabla destino de los datos a copiar.
* @param nombreInputCheckBox : Es de tipo "String", contiene el nombre de la casilla de verificación.
*
* Esta función es utilizada por las funciones que se encuentran
* en las páginas .jsp Circuito.jsp, Tramite.jsp
*/
function AgregarConceptosTabla(tblDatosOrigen,tblDatosDestino,nombreInputCheckBox){

        var FilaOrigen,CeldaOrigen,i,j,k,longFilaDestino;
	var FilaDestino,CeldaIdDestino,CeldaTextoDestino,CeldaCheckboxDestino,CeldaOcultaDestino;

	//alert("entro funcion agregar");
	//alert(tblDatosOrigen.rows.length);
	longFilaDestino=tblDatosDestino.rows[0].cells.length;

	var indexSelect = 1;
	if(navigator.appName.indexOf("Microsoft")>-1)
		indexSelect = 0;

	for(i=0;i<tblDatosOrigen.rows.length;i++){
  	FilaOrigen=tblDatosOrigen.rows[i];
    FilaDestino=document.createElement("TR");
    k=0;

		for(j=0;j<FilaOrigen.cells.length;j++){
			if(j==0){
      	//para crear el checkbox del id
				//alert("entro a crear id");
				CeldaCheckboxDestino=document.createElement("TD");
				var casilla=document.createElement("input");
				casilla.setAttribute("type","checkbox");
				casilla.setAttribute("name",nombreInputCheckBox);
				casilla.setAttribute("id",nombreInputCheckBox);
				casilla.setAttribute("value",FilaOrigen.cells[j].childNodes.item(0).value);
				var idhidden=document.createElement("input");
				idhidden.setAttribute("type","hidden");
				idhidden.setAttribute("name",FilaOrigen.cells[j].childNodes.item(0).name);
				idhidden.setAttribute("value",FilaOrigen.cells[j].childNodes.item(0).value);
				CeldaCheckboxDestino.appendChild(casilla);
				CeldaCheckboxDestino.appendChild(idhidden);
				FilaDestino.appendChild(CeldaCheckboxDestino);
				k=k+1;
			}
    	else{
				//las celdas a insertar se despliega, hasta donde lo permita la tabla destino
				if(k<=longFilaDestino){
  	    	//alert("entro a crear texto");
					CeldaOcultaDestino=document.createElement("TD");
					var textohidden=document.createElement("input");
					textohidden.setAttribute("type","hidden");
					textohidden.setAttribute("name",FilaOrigen.cells[j].childNodes.item(0).name);
    			textohidden.setAttribute("value",FilaOrigen.cells[j].childNodes.item(0).value);
					var texto=document.createTextNode(FilaOrigen.cells[j].childNodes.item(0).value);
					CeldaOcultaDestino.appendChild(textohidden);
					CeldaOcultaDestino.appendChild(texto);
					//alert(CeldaOcultaDestino.innerHTML);
					//alert(CeldaTextoDestino.innerHTML);
					FilaDestino.appendChild(CeldaOcultaDestino);
					k=k+1;
				}
			}
		}
		AdicionarFilaTabla(FilaDestino,tblDatosDestino,1,0);
	}
}//cierra función AgregarConceptosTabla


/**
*
* @param unaTblDatosOrigen : Es de tipo "TABLE", es el objeto tabla fuente de los datos a copiar.
* @param unaTblDatosDestino : Es de tipo "TABLE", es el objeto tabla destino de los datos a copiar.
* @param unNombreInputCheckBox : Es de tipo "String", contiene el nombre de la casilla de verificación.
*
*/

function agregarItemsSeleccionadosTabla(unaTblDatosOrigen,unaTblDatosDestino,unNombreInputCheckBox){

	var unIndiceTblOrigen,unIndiceCeldasOrigen, cantidadCeldasInsertadas;
	var unaFilaOrigen,unaCeldaOrigen,miLongFilaDestino;

	var unaFilaDestino, unaCeldaDestino;

	miLongFilaDestino=unaTblDatosDestino.rows[0].cells.length;

	var indexSelect = 1;
	if(navigator.appName.indexOf("Microsoft")>-1)
		indexSelect = 0;

	for(unIndiceTblOrigen=0; unIndiceTblOrigen<unaTblDatosOrigen.rows.length;unIndiceTblOrigen++){
	  	unaFilaOrigen = unaTblDatosOrigen.rows[unIndiceTblOrigen];
		unaFilaDestino = document.createElement("TR");

                cantidadCeldasInsertadas=0;

		for(unIndiceCeldasOrigen = 0; unIndiceCeldasOrigen < unaFilaOrigen.cells.length; unIndiceCeldasOrigen++){
			if(unIndiceCeldasOrigen==0){
			      	//para crear el checkbox del id
				//alert("entro a crear id");

				unaCeldaDestino=document.createElement("TD");
				unaCeldaDestino.setAttribute("align","center");
				var casilla=document.createElement("input");
				casilla.setAttribute("type","checkbox");
				casilla.setAttribute("name",unNombreInputCheckBox);
				casilla.setAttribute("id",unNombreInputCheckBox);
				casilla.setAttribute("value",unaFilaOrigen.cells[unIndiceCeldasOrigen].childNodes.item(0).value);
				unaCeldaDestino.appendChild(casilla);
				unaFilaDestino.appendChild(unaCeldaDestino);
				cantidadCeldasInsertadas = cantidadCeldasInsertadas + 1;
			}else{
				//las celdas a insertar se despliega, hasta donde lo permita la tabla destino
				if( cantidadCeldasInsertadas <= miLongFilaDestino){
					//alert("entro a crear texto");
					unaCeldaDestino=document.createElement("TD");
					var label=document.createElement("label");
					label.innerHTML = unaFilaOrigen.cells[unIndiceCeldasOrigen].childNodes.item(0).innerHTML;
					unaCeldaDestino.appendChild(label);
					unaFilaDestino.appendChild(unaCeldaDestino);
					cantidadCeldasInsertadas = cantidadCeldasInsertadas + 1;
				}
			}
		}
		adicionarFilaTabla(unaFilaDestino,unaTblDatosDestino,1,0);
	}
}


/*
* * @Deprecated, la función que se utiliza actualmente es "eliminarItemsTabla(unaTabla)",
* * se mantiene por compatibilidad, con el subsistema de gestion de expedientes.
* * @param Objeto : Es de tipo checkbox , es el objeto que permite
* * determinar que filas de una tabla fueron seleccionadas para ser eliminadas.
*
* Esta función es utilizada por las funciones que se encuentran
* en las páginas .jsp Circuito.jsp, Tramite.jsp
*/
function EliminarConceptosTabla(objeto){
	eliminarItemsTabla(objeto);
}


/*
* *@ Esta función reemplaza a la función EliminarConceptosTabla(objeto)
* *
*/
function eliminarItemsTabla(unaLstCheckBox){

    var i;
    if(unaLstCheckBox.length){
		for(i=0;i<unaLstCheckBox.length;i++){
			if(unaLstCheckBox[i].checked==true){
				unaLstCheckBox[i].parentNode.parentNode.parentNode.removeChild(unaLstCheckBox[i].parentNode.parentNode);
				i--;
			}
		}
	}
	else{
		if(unaLstCheckBox.getAttribute("checked")==true){
			unaLstCheckBox.parentNode.parentNode.parentNode.removeChild(unaLstCheckBox.parentNode.parentNode);
		}
	}

}




