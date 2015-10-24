var fn = {
    init: function () {
        //Se comento esta variable y se cambio su !x en el IF porque se añadio la function estaRegistrado
        //var x = false;
        
        //Si no esta registrado nos manda al registro
        if (!fn.estaRegistrado()){
            window.location.href = '#registro';
        }
        $('#regSend').click(fn.getReg);
        $('#tomarFoto').click(mc.start());
    },
    
    deviceready: function(){
        document.addEventListener("deviceready", fn.init, false);
    },
    
    estaRegistrado: function(){
        if (window.localStorage.getItem('uuid') != undefined){
            return true;
        } 
        
        return false;
    },
    
    getReg: function () {
        //var nom = document.getElementById('regNom').value;
        var nom = $('#regNom').val(); //inputs, textarea y select
        var tel = $('#regTel').val();
        var mail = $('#regMail').val();
        var foto = $('#fotoTomada').attr("rel");
        
        if (nom != '' && tel != '' && mail != '' && foto != undefined && foto != '') {
            //alert(nom+ ' - '+ tel+' - '+ mail+' - '+ foto);    
            fn.enviarRegistro(nom, mail, tel, foto);
        } else {
            navigator.notification.alert('Todos los campos son requeridos.');
        }
    },
    
    enviarRegistro: function(nombre, mail, telefono, foto){
        $.ajax({
            method: "POST",
            url: "http://carlos.igitsoft.com/apps/test.php",
            data: {
                nom: nombre,
                mail: mail,
                tel: telefono
            }
        }).done(function(msg){
            if (msg == 1){
                // ENVIAR FOTO
                ft.start(foto);
            }else{
                alert("Datos incorrectos");
            }
        })
    }
};

//window.addEventListener("load", fn.init, false);
//jQuery(document).ready(fn.init);
//$(document).ready(fn.init);

// COMENTAR LINEA DE ABAJO CUANDO
// LA APP ESTE LISTA PARA COMPILAR
//$(fn.init);

// DESCOMENTAR LINEA DE ABAJO CUANDO
// LA APP ESTE LISTA PARA COMPILAR

$(fn.deviceready);