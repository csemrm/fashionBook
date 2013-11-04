(function() {

	function post2wall(e) {
		if (!e.success)
			return;
		alert('loggedIn');
	};
	var fb = require('facebook');
	console.log(fb);

	alert(Ti.App.Properties.getString('ti.facebook.appid'));
	fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
	fb.permissions = ['publish_stream'];
	fb.forceDialogAuth = true;
	if (fb.loggedIn === false) {
		fb.authorize();
		fb.addEventListener('login', post2wall);
	}

})();
