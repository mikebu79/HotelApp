var almacen = {
    db: null,
    th: null,
    np: null,
    nh: null,
    nd: null,
    guardarReserva: function (th, np, nh, nd) {
        //el tamaño en el bytes (ultimo campo)
        almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
        almacen.th = th;
        almacen.np = np;
        almacen.nh = nh;
        almacen.nd = nd;
        //accion a ejecutar, accion de error, accion si hubo exito
        almacen.db.transaction(almacen.tablaReserva, almacen.error, almacen.exito);
    },
    tablaReserva: function (tx) {
        tx.executeSql(‘CREATE TABLE IF NOT EXISTS reservas (th, np, nh, nd)’);
        tx.executeSql(‘INSERT INTO reservas (th, np, nh, nd) VALUES(“’+almacen.th+’”, “’+almacen.np+’”, “’+almacen.nh+’”, “’+almacen.nd+’”)’);
    },
    tablaHistorial:function (tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS historial (th, np, nh, nd)");
        tx.executeSql("INSERT INTO historial (th, np, nh, nd) VALUES ('"+almacen.th+"','"+almacen.np+"','"+almacen.nh+"','"+almacen.nd+"')");
    },
     guardarHistorial:function(th,np,nh,nd){
        //almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
        almacen.th = th;
        almacen.np = np;
        almacen.nh = nh;
        almacen.nd = nd;
        
        almacen.db.transaction(almacen.tablaHistorial, almacen.error, null);
        
    },    
    error: function (e) {
        alert("Error, código: "+ e.code);
    },
    
    exito: function () {
        alert("Reserva guardada en dispositivo, en espera de sincornización.");
    },
    syncData: function() {
	almacen.db = window.openDatabase("hotelApp", "1.0", "Hotel App", 200000);
        almacen.db.transaction (almacen.leerReservas, almacen.error, almacen.reservaLeida);
    },
    leerReservas: function (tx){
	tx.executeSql(“SELECT * FROM reservas”, [], function(tx2, response){
		for (i=0; i<response.rows.length;i++){
			server.envRes(response.rows.item(i).th, response.rows.item(i).np, response.rows.item(i).nh, response.rows.item(i).nd);
		}
                tx2.executeSql("DELETE FROM reservas");
	}, almacen.error);
    },
	reservaLeida: function(){
		alert("Reservas Sincronizadas");
	}
}