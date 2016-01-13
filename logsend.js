var browser = !(typeof module !== 'undefined' && this.module !== module )
var nodejs = !browser;

var requestURI = "http://localhost:3000/api/Logs/register";

if( browser ) {
	var $request = function( data ) {
		(function($) {
			$.ajax({
				method: "POST",
				url: requestURI,
				data: data
			}).done(function( response ) {
				console.log( response )
			});
		})(jQuery);
	}
}

if( nodejs ){
	var request = require('request');

	var $request = function( data ) {
		request.post( requestURI , {form: data} , function( err, httpResponse, body ) {
			console.log( body );
		});
	}
}

var Logsend = {
	log: function( _message ){
		var message = {
			value: _message.value || "",
			filters: _message.filters || [""]
		}
		$request( message );
	}
}


if( browser ) { window.Logsend = Logsend; }
if( nodejs ) { module.exports = Logsend; }