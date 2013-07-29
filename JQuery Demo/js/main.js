/* ===================
   INICIALIZADORES
   =================== */

var DEBUG = true;
var myCodeMirrors = {};

/* JQuery Load */
jQuery(window).load(function(){
	$('#alert-error').hide();
	$('#alert-success').hide();
	startCodemirror();
	initHelpers();

	//Binds
	$('#btnDemoDiv1').click({editorID: "editorDemoDiv1"}, compilar);
	$('#btnDemoDiv2').click({editorID: "editorDemoDiv2"}, compilar);
	$('#btnDemoDiv3').click({editorID: "editorDemoDiv3"}, compilar);
	$('#btnDemoDiv4').click({editorID: "editorDemoDiv1"}, compilar);


	//Utils
	$('#alert-error .close').click(closeAlertError);
	$('#alert-success .close').click(closeAlertSuccess);
	$('.borrar').click(eraseText);
});

function startCodemirror() {

	$('.myEditor').each(function(index, el){
		var myCodeMirror = CodeMirror.fromTextArea(el, 
			{
				mode: "javascript",
				theme: "monokai",
				lineNumbers: true
			});
		myCodeMirror.setSize("100%", 100);		
		myCodeMirrors[el.id] = myCodeMirror;

		if(DEBUG) console.log("EQUAL...", el.id); //DEBUG
	});
}

/* ===================
   COMPILADORES
   =================== */

function compilar(e) {	
	var mirror = myCodeMirrors[e.data.editorID];
	//var script = mirror.getValue().replace(/"/g,"'");
	var script = mirror.getValue();

	if(DEBUG) console.log("COMPILANDO...", e.data.editorID); //DEBUG
	if(DEBUG) console.log("COMPILANDO...", mirror); //DEBUG
	if(DEBUG) console.log("COMPILANDO...", script); //DEBUG

	try{
	  	eval(script);
	  	if(DEBUG) console.log("COMPILÓ!"); //DEBUG
		$('#alert-error').hide();
		$('#alert-success').fadeIn();
  		$('#alert-success span').text("Código ejecutado sin problemas");
	} catch(err) {
  		if(DEBUG) console.log("NO COMPILÓ! " + err); //DEBUG
  		$('#alert-success').hide();
  		$('#alert-error').fadeIn();
  		$('#alert-error span').text("Hay un error con el código que ingresó: \n" + err);

	}
	
}

/* ===================
   UTILS
   =================== */

function closeAlertError(){
	if(DEBUG) console.log("CERRANDO..."); //DEBUG
	$('#alert-error').fadeOut();
}

function closeAlertSuccess(){
	if(DEBUG) console.log("CERRANDO..."); //DEBUG
	$('#alert-success').fadeOut();
}

function eraseText(){
	if(DEBUG) console.log("BORRANDO..."); //DEBUG
	for (element in myCodeMirrors) {
		if(DEBUG) console.log("EL: ", myCodeMirrors[element]); //DEBUG
  		myCodeMirrors[element].setValue("");
  		myCodeMirrors[element].refresh();
    }
}

function initHelpers() {

	if(DEBUG) console.log("HIDING... "); //DEBUG

	$('.init-hide').each(
		function(){
			if(DEBUG) console.log("HIDING: ", $(this)); //DEBUG
			$(this).hide();
		});
}