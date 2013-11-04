var Dialog = function() {
	var androidView = Ti.UI.createView({
		layout : 'vertical',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundImage : '/assets/bg.png'
	});
	androidView.add(Ti.UI.createLabel({
		top : '50dp',
		left : '20dp',
		right : '20dp',
		color : '#333',
		font : {
			fontSize : '24dp',
			fontFamily : 'PoetsenOne-Regular'
		},
		text : "This app in only for internal use. Please gives us your ident number or scan the QR code."
	}));
	androidView.password = Ti.UI.createTextField({
		width : Ti.UI.FILL,
		top : '35dp',
		left : '50dp',
		right : '50dp',
		height : '50dp',
		bottom : '1	5dp',
		hintText : 'Ident code',
		passwordMask : true
	});
	androidView.add(androidView.password);
	var self = Ti.UI.createAlertDialog({
		buttonNames : ['QR-Code', 'OK'],
		title : 'fashionBook login',
		androidView : androidView
	});
	self.addEventListener('click', function(_e) {
		if (_e.index == 0) {
			return;
			require('ui/qrcode.widget').start({
				onsuccess : function(_res) {
					self.fireEvent('login', {
						user : _res.split('::')[0],
						password : _res.split('::')[1]
					});
				},
				oncancel : function(_res) {
				}
			});
		} else {
			if (androidView.password.getValue() == 'gertigstrasse') {
				Ti.App.Properties.setString('auth', '1');
				self.fireEvent('success', {});
			} else
				self.fireEvent('error', {});
		}
	});
	return self;
};
module.exports = Dialog;
