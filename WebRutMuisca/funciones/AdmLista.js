function removerItemAll(lstValores){
	var i;
	for(i=lstValores.options.length;i>=0;i--){
		if(ie){
           	lstValores.remove(i);
        }else{
           	//lstValores.removeChild(lstValores.options[i]);
            lstValores.remove(i);
        }
    }
}//function removeItemAll
