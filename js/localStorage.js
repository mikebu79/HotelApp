//Archivo de Bases de Datos no relacionales...
var ls = {
    registroLocal: function(){
        //Agregar llave
        navigator.notification.alert("Asignando device.uuid: "+ device.uuid, null, "Test", "Cerrar");
        window.localStorage.setItem("nom", device.uuid);
        navigator.notification.alert("Enviando a Home", null, "Test", "Cerrar");
        window.location.href = '#home';
    },
    
    estaRegistrado: function(){
        var nom = window.localStorage.getItem("nom");
        if (nom != undefined){
            return true;
        } else{
            return false;
        }
    }
};