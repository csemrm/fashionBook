exports.post = function(_args) {
	function post2wall(e) {
		if (!e.success)
			return;
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				var data = {
					message : "TEST MESSAGE",
					caption : "TEST CAPTION",
					picture : this.responseData
				};
				fb.requestWithGraphPath('me/photos', data, 'POST', function(e) {
					console.log(e);
					_args.onfinish && _args.onfinish();
				});
			}
		});
		xhr.open('GET', _args.image);
		xhr.send();
	};
	var fb = require('facebook');
	console.log(fb);
	fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
	fb.permissions = ['publish_stream'];
	fb.forceDialogAuth = true;
	if (fb.authorize) {
		fb.authorize();
		fb.addEventListener('login', post2wall);
	}
};

