var fn = {
	init: function () {
		if(!fn.islogged())
			window.location.href = "#reg";
		
        //window.location.href="#nr1";
        
		//Funcionalidades de Registro
		$('#regSend').click(fn.getRegister);
		$('#takePhoto').click(mediaCapture.takePhoto);
        $('#nr1 ul[data-role=listview] a').click(fn.seleccionarTipo);
        $('#nr1 div[data-role=navbar] li').click(fn.nr1Siguiente);
        $('#nr2 div[data-role=navbar] li').click(fn.nr2Reservar);
conexion.eventoConectado();
	},
	ready:function () {
		document.addEventListener("deviceready", fn.init, false);
	},
	islogged: function () {
		return ls.estaRegistrado();
	},
	getRegister: function () {
		var nom = $('#regName').val();
		var tel = $('#regTel').val();
		var mail = $('#regMail').val();
		var foto = $('#regPhoto').attr('rel');
		if(nom != '' && tel != '' && mail != '' && foto != undefined && foto != ''){
			server.regSend(nom, tel, mail, foto);
		} else {
			navigator.notification.alert('Todos los campos son requeridos', null, "Error de Registro", "Aceptar");
		}
	},
    seleccionarTipo: function () {
        //console.log("Evento click");
        //console.log($(this));
        //subir de jerarquia y busca el ul mas cercano. luego busca los a
        $(this).parents("ul").find("a").removeClass('ui-btn-active');
        $(this).addClass("ui-btn-active");
        $("#nr1").attr("tipoHabitacion", $(this).text());
    },
    nr1Siguiente: function () {
        if ($(this).index () == 1 && $("#nr1").attr("tipoHabitacion") != undefined){
            /* Opcion seleccionada, pasar a la siguiente pantalla */
            window.location.href = "#nr2";
        } else {
            if ($(this).index () != 0 ) {
                alert("Es necesario seleccionar un tipo de habitacion");
            }
            
        }
        
    },
    nr2Reservar: function () {
        var th = $("#nr1").attr("tipoHabitacion");
        var np = $("#numPersonas").val();
        var nh = $("#numHabitaciones").val();
        var nd = $("#numDias").val();
        
        console.log(th+np+nh+nd);
        
        if (conexion.estaConectado()){
            //Enviar informacion al servidor
            server.envRes(th, np, nh, nd);
        } else {
            //Almacenar en el dispositivo
            $.mobile.loading("show");
            almacen.guardarReserva (th, np, nh, nd);
            $.mobile.loading("hide");
        }
    }
};

$(fn.ready);
//fn.init();