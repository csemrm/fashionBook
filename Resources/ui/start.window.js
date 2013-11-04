exports.create = function() {
	require('ui/intro.window').create(function(self) {
		var viewsinScrollableView = [];
		var scrollableView = Ti.UI.createScrollableView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			cacheSize : 11,
			showPagingControl : (Ti.Android) ? true : false
		});
		scrollableView.bottombar = require('ui/bottombar.widget').create();

		setTimeout(function() {
			self.add(scrollableView);
			self.locked = false;
			setTimeout(function() {
				scrollableView.scrollToView(5);
			}, 500);
			self.backgroundImage = '';
			self.backgroundColor = '#333';
		}, 5000);

		scrollableView.bottombar.addEventListener('click', function(e) {
			require('ui/dialog.widget').create(e.source.data);
		});

		scrollableView.addEventListener('scrollend', function(e) {
			if (e.view.data && e.view.data.city) {
				scrollableView.bottombar.title.setText(e.view.data.agency);
				scrollableView.bottombar.data = e.view.data;
				if (e.view.data.mp4 && Ti.Network.online && Ti.Network.networkType != Ti.Network.NETWORK_MOBILE) {
					console.log(e.view.data.mp4);
					scrollableView.camera.mp4 = e.view.data.mp4;
					scrollableView.camera.show();
				} else {
					scrollableView.camera.mp4 = null;
					scrollableView.camera.hide();
				}
				if (e.view.data.wiki && Ti.Network.online && scrollableView.wiki) {
					scrollableView.wiki.url = e.view.data.wiki;
					scrollableView.wiki.show();
				} else {
					scrollableView.wiki.hide();
				}
				Ti.Android && Ti.UI.createNotification({
					message : 'Photos: Kolja von der Lippe',
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				}).show();
			}
		});
		var viewsinScrollableView = [];
		require('model/fashionbook').init({
			onload : function(_images) {
				scrollableView.add(scrollableView.bottombar);
				var total = _images.length;
				Ti.Android && Ti.UI.createNotification({
					message : total + ' fashion pictures received'
				}).show();
				for (var i = 0; i < total; i++) {
					viewsinScrollableView.push(Ti.UI.createImageView({
						image : _images[i].url,
						width : Ti.UI.FILL,
						data : _images[i],
						height : Ti.UI.FILL
					}));
				}
				scrollableView.bottombar.title.setText(_images[0].city + ' | ' + _images[0].artist);
				scrollableView.setViews(viewsinScrollableView);
				scrollableView.camera = Ti.UI.createButton({
					top : '5dp',
					right : '5dp',
					visible : false,
					width : '60dp',
					height : '40dp',
					backgroundImage : '/assets/camera.png'
				});
				scrollableView.add(scrollableView.camera);
				scrollableView.camera.addEventListener('click', function(e) {
					require('ui/video.widget').create({
						mp4 : e.source.mp4
					});
				});

				scrollableView.wiki = Ti.UI.createButton({
					top : '5dp',
					left : '5dp',
					visible : false,
					width : '50dp',
					height : '50dp',
					backgroundImage : '/assets/wiki.png'
				});
				scrollableView.add(scrollableView.wiki);
				scrollableView.wiki.addEventListener('click', function(e) {
					require('ui/web.window').create(e.source.url).open();
				});
			}
		});
		self.addEventListener('androidback', function() {
			if (self.locked == true)
				return false;
			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['OK', 'Cancel'],
				message : 'You really want to terminate this app?',
				title : 'End'
			});
			dialog.addEventListener('click', function(e) {
				if (e.index === e.source.cancel) {
					return false;
				} else {
					self.close();
					return true;
				}
			});
			dialog.show();
		});
	});
};
