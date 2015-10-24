var mc = {
    //Pasamos lo de la documentacion de Jquery para tomar fotos para aca y adaptamos eso como metodos, 
    //quitando el var, los igual y cambiando los : .... para el llamado le hacemos su propia funcion y le pusimos start ya que venia solo
    
    // capture callback
    captureSuccess: function(mediaFiles) {
    var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // Desplegar la foto
            // se pone # para obener por id
            $("#fotoTomada").html('<img src="'+path+'" width="100%" >');
            $("#fotoTomada").attr("rel", path);
        }
    },
    // capture error callback
    captureError: function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    },
    // start image capture
    start: function{
        //Igual al momento de llamar a los metodos, ponerle la llamda al objeto
        navigator.device.capture.captureImage(mc.captureSuccess, mc.captureError, {limit:1}); //Solo quiero una foto
    }
};