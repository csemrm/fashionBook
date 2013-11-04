const W = Ti.Platform.displayCaps.platformWidth;
H = W * 0.9 * 170 / 514;
exports.create = function(_callback) {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		navBarHidden : true,
		locked : true,
		backgroundImage : '/default.png',
		exitOnClose : true
	});
	var label = Ti.UI.createLabel({
		top : '50dp',
		color : 'white',
		text : 'fashionBook',
		font : {
			fontSize : '50dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	var copyright = Ti.UI.createLabel({
		bottom : '50dp',
		color : 'white',
		textAlign : 'center',
		opacity : 0,
		text : 'All rights by\nPHOTOSTUDIO AXEL SIEBMANN',
		font : {
			fontSize : '18dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	copyright.animate({
		opacity : 1,
		duration : 5000
	});
	self.add(label);
	self.girlscontainer = Ti.UI.createView({
		top : '110dp',
		backgroundColor : '#333',
		height : 4 * H
	});
	var girls = [];
	for (var i = 0; i < 4; i++) {
		girls[i] = Ti.UI.createImageView({
			image : '/assets/g' + i + '.jpg',
			width : W,
			height : W * 170 / 514,
			center : {
				x : (i % 2) ? W * 0.9 : -W * 0.9,
				y : H * i
			},
		});
		self.girlscontainer.add(girls[i]);
		girls[i].animate(Ti.UI.createAnimation({
			duration : 1700 + i * 1500,
			center : {
				x : (i % 2) ? -0.5 * W : 0.5 * W,
				y : 0
			}
		}));
	}
	self.add(copyright);
	self.add(self.girlscontainer);
	self.open();
	if (Ti.App.Properties.hasProperty('auth'))
		_callback(self);
	else {
		var LoginModule = require('ui/logindialog.widget');
		self.login = new LoginModule();
		self.login.show();
		self.login.addEventListener('success', function() {
			_callback(self);
		});
		self.login.addEventListener('error', function() {
			self.close();
		});
	}
	//	_callback();
};
