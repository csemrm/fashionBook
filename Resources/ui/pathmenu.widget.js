exports.create = function(_image, _win) {
	function getImage(_callback) {
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				_callback(this.responseData.length);
			}
		});
		xhr.open('GET', _image);
		xhr.send();
	}

	var self = require('vendor/pathmenu').createMenu({
		buttonImage : '/assets/share.png',
		radius : 200,
		iconList : [{
			image : '/assets/save.png',
			id : 'save'
		}, {
			image : '/assets/star.png',
			id : 'star'
		}, {
			image : '/assets/iphone.png',
			id : 'wallpaper'
		}, {
			image : '/assets/facebook.png',
			id : 'facebook'
		}, {
			image : '/assets/twitter.png',
			id : 'twitter'
		}]
	});
	self.initMenu();
	self.addEventListener('iconClick', function(e) {
		switch (e.id) {
			case 'wallpaper' :
				getImage(function(imageblob) {
					Ti.UI.createNotification({
						message : 'Photo set as wallpaper of your ' + Ti.Platform.getModel()
					}).show();
					Ti.Media.Android.setSystemWallpaper(imageblob, true);
				});
				self.resetMenu();
				break;
			case	  'save' :
				getImage(function(imageblob) {
					f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "runway	.jpg");
					f.write(image);
					Ti.UI.createNotification({
						message : 'Photo saved'
					}).show();
					self.resetMenu();
				});
				break;
			case  'facebook' :
				require('ui/facebook').post({
					image : _image,
					onfinish : self.resetMenu
				});
				break;
			case 'star' :
				var ratingbar = require("titutorial.ratingbar");
				console.log('ratingbar='+ratingbar);
				var ratingBar = ratingbar.createRatingBar({
					top : 50,
					left : 15,
					rating : 2,
					stars : 6,
					stepSize : 1.5,
					isIndicator : false
				});
				_win.add(ratingBar);
				break;
		}

	});
	self.resetMenu = function() {
		setTimeout(function() {
			self.initMenu();
		}, 100);
	};
	return self;
};
