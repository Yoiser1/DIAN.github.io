/* Extiende la clase String para manejar validaciones.
 */
String.prototype.isAlpha = function () {
    return (this >= 'a' && this <= 'z\uffff') ||
         (this >= 'A' && this <= 'Z\uffff') ||
         (this >= 'á' && this <= 'ú\uffff') ||
         (this >= 'Á' && this <= 'Ú\uffff') ||
         this =='ñ' ||
         this =='Ñ' ||
         this =='ü' ||
         this =='Ü';
 };
 
 String.prototype.isDigit = function () {
     return (this >= '0' && this <= '9');
 };
 
 String.prototype.isPoint = function () {
     return (this == '.');
 };
 
 String.prototype.isColon = function () {
     return (this >= ',');
 };
 
 String.prototype.isSpecialChar = function () {
     return this == ' ' ||
          this == '.' ||
          this == ',' ||
          this == ';' ||
          this == ':' ||
          this == '-' ||
          this == '(' ||
          this == ')' ||
          this == '$' ||
          this == '#' ||
          this == '%' ||
          this == '&' ||
          this == '/';
 };
 
 
 /**
  * Arreglos de validaciones
  */
 
 var validRequerido = new Array();
 var validEmail = new Array();
 var validFecha = new Array();
 var validInteger = new Array();
 var validLong = new Array();
 var validFloat = new Array();
 var validDouble = new Array();
 var validRangoInteger = new Array();
 var validRangoFloat = new Array();
 var validMinLength = new Array();
 var validMaxLength = new Array();
 var validCadena = new Array();
 var validAlfanumerico = new Array();
 
 /**
  * Funcion de validación de campos de busqueda.
  */
 function validarFormularioSeleccion(unaForma){
 
     var unosElementos = unaForma.elements;
     var indicador = false;
 
     for(i=0; i<unosElementos.length;i++){
         var unElemento = unosElementos[i];
 
         if(unElemento.type == "text" || unElemento.type == "textarea" || unElemento.type == "select-one"){
             if(unElemento && unElemento.value != ""){
                 indicador = true;
             }
         }
     }
 
     if(!indicador){
         miGestorMensajes.limpiarMensajes();
         var unaFabricaMensajes = new DFabricaMensajes();
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,"La consulta requiere minímo un criterio de búsqueda.","La consulta requiere minímo un criterio de búsqueda.","","");
         miGestorMensajes.agregarMensaje(unMensaje);
 
         miGestorMensajes.mostrarMensaje();
     }
     return indicador;
 }
 
  function validar(forma){
       if(!validarFormulario(forma)) {
           imprimeMensajeValid();
           return false;
       }
       return true;
   }
 
 function imprimeMensajeValid() {
 
     miGestorMensajes.limpiarMensajes();
     var unaFabricaMensajes = new DFabricaMensajes();
 
     for(var i = 0; i < validRequerido.length;i++) {
         var campoPrueba = validRequerido[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' es un campo requerido.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' es un campo requerido.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validEmail.length;i++) {
         var campoPrueba = validEmail[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' no posee una dirección de email correcta.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' no posee una dirección de email correcta.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validFecha.length;i++) {
         var campoPrueba = validFecha[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener una fecha con el formato ' + campo.getAttribute('patron') + '.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener una fecha con el formato ' + campo.getAttribute('patron') + '.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var j = 0; j < validInteger.length;j++) {
 
         var campoPrueba = validInteger[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico entero.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico entero.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validLong.length;i++) {
         var campoPrueba = validLong[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico entero.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico entero.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validFloat.length;i++) {
        var campoPrueba = validFloat[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico decimal.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico decimal.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validDouble.length;i++) {
         var campoPrueba = validDouble[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico decimal.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico decimal.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validRangoInteger.length;i++) {
         var campoPrueba = validRangoInteger[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico entre ' + parseInt(campoPrueba.getAttribute('minValor')) + ' y ' + parseInt(campoPrueba.getAttribute('maxValor')) + '.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico entre ' + parseInt(campoPrueba.getAttribute('minValor')) + ' y ' + parseInt(campoPrueba.getAttribute('maxValor')) + '.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validRangoFloat.length;i++) {
         var campoPrueba = validRangoFloat[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico entre ' + campoPrueba.getAttribute('minValor') + ' y ' + campoPrueba.getAttribute('maxValor') + '.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' debe tener un valor numerico entre ' + campoPrueba.getAttribute('minValor') + ' y ' + campoPrueba.getAttribute('maxValor') + '.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validMinLength.length;i++) {
         var campoPrueba = validMinLength[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' no puede tener menos de ' + campoPrueba.getAttribute('minLength') + ' caracteres.', 'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' no puede tener menos de ' + campoPrueba.getAttribute('minLength') + ' caracteres.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validMaxLength.length;i++) {
         var campoPrueba = validMaxLength[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' no puede tener mas de ' + campoPrueba.getAttribute('minLength') + ' caracteres.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' no puede tener mas de ' + campoPrueba.getAttribute('minLength') + ' caracteres.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validCadena.length;i++) {
         var campoPrueba = validCadena[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' contiene dígitos o caracteres especiales.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' contiene dígitos o caracteres especiales.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
     for(var i = 0; i < validAlfanumerico.length;i++) {
         var campoPrueba = validAlfanumerico[i];
 
         var unMensaje = unaFabricaMensajes.getMensaje(0,COD_TIPO_ERROR,'El campo ' + campoPrueba.getAttribute('labelDisplay') + ' no es un cadena alfanúmerica.','El campo ' + campoPrueba.getAttribute('labelDisplay') + ' no es un cadena alfanúmerica.',"","");
         miGestorMensajes.agregarMensaje(unMensaje);
     }
 
     miGestorMensajes.mostrarMensaje();
 }
 
 /**
  * Funcion principal de validacion de formularios Proyecto MUISCA
  */
 function validarFormulario(forma) {
 
     var elementos = forma.elements;
 
     var valida = true;
 
     // inicializar arrays
     validRequerido = new Array();
     validEmail = new Array();
     validFecha = new Array();
     validInteger = new Array();
     validLong = new Array();
     validFloat = new Array();
     validDouble = new Array();
     validRangoInteger = new Array();
     validRangoFloat = new Array();
     validMinLength = new Array();
     validMaxLength = new Array();
     validCadena = new Array();
     validAlfanumerico = new Array();
 
     for(var i = 0; i< elementos.length; i++) {
 
         var campo = elementos[i];
 
         if ((campo.type == 'text' || campo.type == 'textarea'
             || campo.type == 'hidden')) {
 
             var tValid = campo.getAttribute('tipoValidacion');
 
             if (tValid != null && tValid != "") {
 
                 if (tValid.indexOf('requerido') >= 0) {
                     if (!validarRequerido(campo)) {
                         validRequerido.push(campo);
                         valida = false;
                     }
                 }
                 if (tValid.indexOf('fecha') >= 0 && campo.value != '') {
                     var formato = campo.getAttribute('patron');
 
                     if (formato != null && formato != '') {
                         if (!validarFecha(campo)) {
                             validFecha.push(campo);
                             valida = false;
                         }
                     }
                     else {
                         valida = false;
                         alert('Error el campo con id = '+ campo.name + ' no tiene formato de fecha ');
                     }
                 }
                 else if (tValid.indexOf('email') >= 0 && campo.value != '') {
                     if (!validarEmail(campo)) {
                         validEmail.push(campo);
                         valida = false;
                     }
                 }
                 else if (tValid.indexOf('integer') >= 0 && campo.value != '') {
 
                     if (!validarInteger(campo)) {
                         validInteger.push(campo);
                         valida = false;
                     }
                 }
                 else if (tValid.indexOf('long') >= 0 && campo.value != '') {
                     if (!validarLong(campo)) {
                         validLong.push(campo);
                         valida = false;
                     }
                 }
                 else if (tValid.indexOf('cadena') >= 0 && campo.value != '') {
 
                     if (!validarCadena(campo)) {
                         validCadena.push(campo);
                         valida = false;
                     }
                 }
                 else if (tValid.indexOf('alfanumerico') >= 0 && campo.value != '') {
 
                     if (!validarAlfanumerico(campo)) {
                         validAlfanumerico.push(campo);
                         valida = false;
                     }
                 }
 
 
                 if (tValid.indexOf('rangoInteger') >= 0 && campo.value != '') {
                     var minVal = campo.getAttribute('minValor');
                     var maxVal = campo.getAttribute('maxValor');
 
                     if ((minVal != null && minVal != '')
                         && maxVal != null && maxVal != '') {
 
                         if (!validarRangoInteger(campo)) {
                             validRangoInteger.push(campo);
                             valida = false;
                         }
                     }
                     else {
                         valida = false;
                         alert('El campo con id = '+ campo.name + 'debe tener valor en el atributo minValor y maxValor para ejecutar la validación de rangoInteger');
                     }
                 }
                 else if (tValid.indexOf('float') >= 0 && campo.value != '') {
                     var formatDec = campo.getAttribute('formatoDecimal');
                     if (formatDec != null && formatDec != '') {
                         if (!validarFloat(campo) || !validarDecimal(campo)) {
                             validFloat.push(campo);
                             valida = false;
                         }
                     }
                 }
                 else if (tValid.indexOf('double') >= 0 && campo.value != '') {
                     var formatDec = campo.getAttribute('formatoDecimal');
                     if (formatDec != null && formatDec != '') {
                         if (!validarDouble(campo) || !validarDecimal(campo)) {
                             validDouble.push(campo);
                             valida = false;
                        }
                     }
                 }
                 if (tValid.indexOf('rangoFloat') >= 0 && campo.value != '') {
                     var minVal = campo.getAttribute('minValor');
                     var maxVal = campo.getAttribute('maxValor');
 
                     if ((minVal != null && minVal != '')
                         && maxVal != null && maxVal != '') {
 
                         if (!validarRangoFloat(campo)) {
                             validRangoFloat.push(campo);
                             valida = false;
                         }
                     }
                     else {
                         valida = false;
                         alert('El campo con id = '+ campo.name + 'debe tener valor en el atributo minValor y maxValor para ejecutar la validación de rangoInteger');
                     }
                 }
 
                 if (campo.getAttribute('minlength') != null && campo.getAttribute('minlength') != '') {
                     if (!validarMinLength(campo)) {
                         validMinLength.push(campo);
                         valida = false;
                     }
                 }
                 if (campo.getAttribute('maxlength') != null && campo.getAttribute('maxlength') != '') {
                     if (!validarMaxLength(campo)) {
                         validMaxLength.push(campo);
                         valida = false;
                     }
                 }
             }
         }
     }
 
     return valida;
 }
 
 /**
  *
  */
 function trim(str) {
    return str.replace(/^\s*|\s*$/g,"");
 }
 
 function validarRequerido(campo) {
 
     if(campo.value == '' || trim(campo.value) == '') {
         return false;
     }
 
     return true;
 }
 
 /**
  *
  */
 function validarFecha(campo) {
 
     var value = campo.value;
     var datePattern = campo.getAttribute('patron');
     var bValid = true;
 
     if ((value.length > 0) &&  (datePattern.length > 0)) {
         var MONTH = "MM";
         var DAY = "dd";
         var YEAR = "yyyy";
         var orderMonth = datePattern.indexOf(MONTH);
         var orderDay = datePattern.indexOf(DAY);
         var orderYear = datePattern.indexOf(YEAR);
         if ((orderDay < orderYear && orderDay > orderMonth)) {
             var iDelim1 = orderMonth + MONTH.length;
             var iDelim2 = orderDay + DAY.length;
             var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
             var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
             if (iDelim1 == orderDay && iDelim2 == orderYear) {
                dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
             } else if (iDelim1 == orderDay) {
                dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
             } else if (iDelim2 == orderYear) {
                dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
             } else {
                dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
             }
              var matched = dateRegexp.exec(value);
             if(matched != null) {
                 if (!isValidDate(matched[2], matched[1], matched[3])) {
                     bValid =  false;
                 }
             }
             bValid =  false;
         }
     } else if ((orderMonth < orderYear && orderMonth > orderDay)) {
         var iDelim1 = orderDay + DAY.length;
         var iDelim2 = orderMonth + MONTH.length;
         var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
         var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
         if (iDelim1 == orderMonth && iDelim2 == orderYear) {
             dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
         } else if (iDelim1 == orderMonth) {
             dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
         } else if (iDelim2 == orderYear) {
             dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
         } else {
             dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
         }
         var matched = dateRegexp.exec(value);
         if(matched != null) {
             if (!isValidDate(matched[1], matched[2], matched[3])) {
                 bValid =  false;
             }
         } else {
             bValid =  false;
         }
     } else if ((orderMonth > orderYear && orderMonth < orderDay)) {
         var iDelim1 = orderYear + YEAR.length;
         var iDelim2 = orderMonth + MONTH.length;
         var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
         var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
         if (iDelim1 == orderMonth && iDelim2 == orderDay) {
             dateRegexp = new RegExp("^(\\d{4})(\\d{2})(\\d{2})$");
         } else if (iDelim1 == orderMonth) {
             dateRegexp = new RegExp("^(\\d{4})(\\d{2})[" + delim2 + "](\\d{2})$");
         } else if (iDelim2 == orderDay) {
             dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})(\\d{2})$");
         } else {
             dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{2})$");
         }
         var matched = dateRegexp.exec(value);
         if(matched != null) {
             if (!isValidDate(matched[3], matched[2], matched[1])) {
                 bValid =  false;
             }
         } else {
             bValid =  false;
         }
     } else {
         bValid =  false;
     }
 
     return bValid;
 }
 
 function validarMinLength(campo) {
     var bValid = true;
 
     var iMin = parseInt(campo.getAttribute('minLength'));
     if (!(campo.value.length >= iMin)) {
         bValid = false;
     }
 
     return bValid;
 }
 
 function validarMaxLength(campo) {
     var bValid = true;
 
     var iMax = parseInt(campo.getAttribute('maxlength'));
     if (!(campo.value.length <= iMax)) {
         bValid = false;
     }
 
     return bValid;
 }
 
 /**
  *
  */
 function validarInteger(campo) {
     var bValid = true;
 
     if ((campo.value.length > 0)) {
         var iValue = parseInt(campo.value);
         if (isNaN(campo.value) || !(iValue >= -2147483648
                 && iValue <= 2147483647) || campo.value.indexOf('.') > -1) {
 
             bValid = false;
        }
     }
 
 
     return bValid;
 }
 
 
 /**
  *
  */
 function validarLong(campo) {
     var bValid = true;
 
     if(campo.value.length > 0) {
         //var iValue = parseLong(campo.value);
         var iValue = campo.value;
         if (isNaN(campo.value) || !(iValue >= -9223372036854775808
                 && iValue <= 9223372036854775807)
                 //|| form[oLong[x][0]].value.indexOf('.') > -1) {
                 || campo.value.indexOf('.') > -1) {
 
             bValid = false;
        }
     }
 
     return bValid;
 }
 
 /**
  *
  */
 function validarFloat(campo) {
     var bValid = true;
 
     if((campo.value.length > 0) && campo.value.indexOf('.') > 0) {
         var iValue = parseFloat(campo.value);
 
         if (isNaN(campo.value)) {
             bValid = false;
         }
     }
 
     return bValid;
 }
 
 /**
  *
  */
 function validarDouble(campo) {
     var bValid = true;
 
     if((campo.value.length > 0) && campo.value.indexOf('.') > 0) {
         var iValue = parseFloat(campo.value);
 
         if (isNaN(campo.value) || !(iValue >= -9223372036854775808
                 && iValue <= 9223372036854775807)) {
 
             bValid = false;
        }
     }
 
     return bValid;
 }
 
 /**
  *
  */
 function validarDecimal(campo) {
 
     var sValue = campo.value;
     var sFormato = campo.getAttribute('formatoDecimal');
 
     if (isNaN(sValue))
     {
         return false;
     }
 
     if (sFormato != null)  { //  Si no se especifica algún formato, no valida cantidad de enteros y/o decimales
 
         var nMaxFormatInteger = sFormato.indexOf('.');  // cantidad de enteros maximos permitidos
         //(esto lo especifica la cadena con el formato)
         var nFormatDecimalCount = 0; // cantidad de decimales especificados en el formato
 
         if (nMaxFormatInteger < 0) // Si no se encuentra separador de decimales aplica el limite de enteros al limite de la cadena
             // con el formato. (seguramente el formato es 99, 999, 999999, .. no usa 99.99, 999.999 o 9.99
         {
             nMaxFormatInteger = sFormato.length;
         }
         else {
             nFormatDecimalCount = sFormato.length - nMaxFormatInteger - 1;
         }
 
         var nValueIntegerCount = sValue.indexOf('.'); // cantidad de enteros del valor del campo
         var nValueDecimalCount = 0; // cantidad de decimales del campo.
 
         if (nValueIntegerCount < 0) { //  Si no hay separador de decimal, entonces toda la cadena es un entero
             nValueIntegerCount = sValue.length;
         }
         else {
             nValueDecimalCount = sValue.length - nValueIntegerCount - 1;
         }
 
         if (nValueIntegerCount > nMaxFormatInteger)  { // Si el numero tiene mas enteros de lo permitido
             var sMaxNumber = fillString(nMaxFormatInteger, "9");
 
             if (nFormatDecimalCount > 0) {
                 sMaxNumber = sMaxNumber + "." + fillString(nFormatDecimalCount, "9");
             }
 
             return false;
         }
 
         if (nValueDecimalCount > nFormatDecimalCount) { // Si hay más decimales de lo permitido
             if (nFormatDecimalCount == 0) { //el formato dice que el numero es entero y se esta digitando un decimal
                 return false;
             }
             else {
                 return false;
             }
         }
     }
     return true;
 }
 
 /**
  *
  */
 function validarRangoInteger(campo) {
     var isValid = true;
 
     var field = campo;
 
     if (field.value.length > 0) {
 
         var iMin = parseInt(campo.getAttribute('minValor'));
         var iMax = parseInt(campo.getAttribute('maxValor'));
         var iValue = parseInt(field.value);
         if (!(iValue >= iMin && iValue <= iMax)) {
 
             isValid = false;
         }
     }
 
     return isValid;
 }
 
 /**
  *
  */
 function validarRangoFloat(campo) {
     var isValid = true;
 
     var field = campo;
 
     if (field.value.length > 0) {
 
         var fMin = parseFloat(campo.getAttribute('minValor'));
         var fMax = parseFloat(campo.getAttribute('maxValor'));
         var fValue = parseFloat(field.value);
         if (!(fValue >= fMin && fValue <= fMax)) {
 
             isValid = false;
         }
     }
 
     return isValid;
 }
 
 /**
  *
  */
 function validarEmail(campo) {
     var bValid = true;
 
     if (campo.value.length > 0) {
         if (!checkEmail(campo.value)) {
             bValid = false;
         }
     }
 
     return bValid;
 }
 
 /**
  *
  */
 function checkEmail(emailStr) {
    if (emailStr.length == 0) {
        return true;
    }
    var emailPat=/^(.+)@(.+)$/;
    var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
    var validChars="\[^\\s" + specialChars + "\]";
    var quotedUser="(\"[^\"]*\")";
    var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var atom=validChars + '+';
    var word="(" + atom + "|" + quotedUser + ")";
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray=emailStr.match(emailPat);
    if (matchArray == null) {
        return false;
    }
    var user=matchArray[1];
    var domain=matchArray[2];
    if (user.match(userPat) == null) {
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
           if (IPArray[i] > 255) {
              return false;
           }
        }
        return true;
    }
    var domainArray=domain.match(domainPat);
    if (domainArray == null) {
        return false;
    }
    var atomPat=new RegExp(atom,"g");
    var domArr=domain.match(atomPat);
    var len=domArr.length;
    if ((domArr[domArr.length-1].length < 2) ||
        (domArr[domArr.length-1].length > 4)) {
        return false;
    }
    if (len < 2) {
        return false;
    }
    return true;
 }
 
 function validarCadena(campo) {
 
    var cadena = campo.value;
    var car = new String();
 
    for (var i=0;i<cadena.length;i++){
       car = cadena.charAt(i);
       if(!(car.isAlpha() || car.isSpecialChar()))
         return false;
    }
    return true;
 }
 
 function validarAlfanumerico(campo){
 
    var cadena = campo.value;
    var car = new String();
 
    for (var i=0;i<cadena.length;i++){
       car = cadena.charAt(i);
       if(!(car.isAlpha() || car.isDigit()))
          return false;
    }
    return true;
 }
 
 function limpiar(unaForma) {
     var unosElementos = unaForma.elements;
     var indicador = false;
 
     for(i=0; i<unosElementos.length;i++){
         var unElemento = unosElementos[i];
 
         if(unElemento.type == "text"){
             unElemento.value = "";
         }
     }
 }
 
 // Esta funcion es para compara de dos fechas cual es la mayor
 // fecMayor = se determinan como la fecha mayor a comparar
 // fecMenor = se determina como la fecha menor a comparar
 // devuelve 1 si la fecha es mayor, 0 si las fechas son iguales y -1 si la fecha es menor
 function comparaFechas(fecMayor, fecMenor) {
     var arfecMayor = fecMayor.split('-');
     var arfecMenor = fecMenor.split('-');
 
     var yearFecMy = parseInt(arfecMayor[0]);
     var monthFecMy = parseInt(arfecMayor[1]);
     var diaFecMy = parseInt(arfecMayor[2]);
 
     var yearFecMn = parseInt(arfecMenor[0]);
     var monthFecMn = parseInt(arfecMenor[1]);
     var diaFecMn = parseInt(arfecMenor[2]);
 
     if (arfecMayor[1] == '08') {
         monthFecMy = 8;
     } else if (arfecMayor[1] == '09') {
         monthFecMy = 9;
     }
 
     if (arfecMayor[2] == '08') {
         diaFecMy = 8;
     } else if (arfecMayor[2] == '09') {
         diaFecMy = 9;
     }
 
     if (arfecMenor[1] == '08') {
         monthFecMn = 8;
     } else if (arfecMenor[1] == '09') {
         monthFecMn = 9;
     }
 
     if (arfecMenor[2] == '08') {
         diaFecMn = 8;
     } else if (arfecMenor[2] == '09') {
         diaFecMn = 9;
     }
 
     if (yearFecMy > yearFecMn) {
         return 1;
     } else if (yearFecMy == yearFecMn) {
         if (monthFecMy > monthFecMn) {
             return 1;
         } else if (monthFecMy == monthFecMn) {
             if (diaFecMy > diaFecMn) {
                 return 1;
             } else if (diaFecMy == diaFecMn) {
                 return 0;
             } else if (diaFecMy < diaFecMn) {
                 return -1;
             }
         } else if (monthFecMy < monthFecMn) {
             return -1;
         }
     } else if (yearFecMy < yearFecMn) {
         return -1;
     }
 
 }
 
 
 
 