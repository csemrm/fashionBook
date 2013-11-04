exports.create = function(_image) {
	var self = Titanium.UI.createWindow({
		fullscreen : true,
		navBarHidden : true,
		backgroundColor : 'black',
		layout : 'horizontal'
	});
	self.container = Ti.UI.createView();
	setTimeout(function() {
		self.add(self.container);
		var titouchgallery = require("com.gbaldera.titouchgallery");
		self.zoomview = titouchgallery.createTouchGallery({
			images : [_image.url],
			width : Ti.UI.FILL,
			height : Ti.UI.FILL

		});
		self.container.add(self.zoomview);
		var pb = Ti.UI.createProgressBar({
			height : '30dp',
			min : 0,
			max : 1,
			value : 0,
			width : '90%',
			bottom : '10dp'
		});
		var darker = Ti.UI.createView({
			backgroundColor : 'black',
			opacity : 1
		});
		self.container.add(darker);
		darker.animate({
			opacity : 0,
			duration : 4000
		});
		var cron = setInterval(function() {
			pb.value = pb.value + 0.03;
			if (pb.value > 0.95) {
				clearInterval(cron);
				pb.hide();
				var hints = Ti.App.Properties.getInt('zoomhint', 0);
				if (hints < 3) {
					Ti.Android && Ti.UI.createNotification({
						message : 'You can zoom and pan by double click or pinch.'
					}).show();
					Ti.App.Properties.setInt('zoomhint', hints + 1);
				}
				self.zoomview.fireEvent('dblclick', {});
				self.container.remove(darker);
				self.menucontainer = Ti.UI.createView({
					bottom : '20dp',
					left : '5dp',
					touchEnabled : false
				});
				self.pathmenu = require('ui/pathmenu.widget').create(_image.url, self);
				self.menucontainer.add(self.pathmenu);
				self.container.add(self.menucontainer);

			}
		}, 20);
		self.container.add(pb);
		pb.show();
		self.topbar = Ti.UI.createView({
			top : 0,
			height : '60dp',
		});
		//	self.container.add(self.topbar);
	}, 10);
	self.addEventListener('close', function() {
		self.pathmenu && self.pathmenu.initMenu();
	});
	return self;
};
