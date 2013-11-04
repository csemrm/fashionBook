exports.create = function(_key, _value) {
	var self = Titanium.UI.createWindow({
		fullscreen : true,
		navBarHidden : true,
		backgroundColor : 'black',
	});
	self.container = Ti.UI.createView({
		layout : 'horizontal'
	});
	self.add(self.container);
	var label = Ti.UI.createLabel({
		text : _value,
		color : 'white',
		top : '10dp',
		zIndex : 999,
		width : Ti.UI.FILL,
		textAlign : 'center',
		opacity : 0.6,
		height : Ti.UI.SIZE,
		font : {
			fontSize : '40dp',
			fontFamily : 'PoetsenOne-Regular'
		}
	});
	/*label.animate(Ti.UI.createAnimation({
		transform : Ti.UI.create2DMatrix({
			scale : 0.2,
			duration : 700
		})
	}));*/
	self.add(label);
	var cols = [];
	setTimeout(function() {
		for (var c = 0; c < 3; c++) {
			cols[c] = Ti.UI.createScrollView({
				scrollType : 'vertical',
				width : '33.3%',
				layout : 'vertical',
				height : Ti.UI.SIZE
			});
			self.container.add(cols[c]);
			cols[c].addEventListener('click', function(e) {
				require('ui/full.window').create(e.source.data).open();
			});
		}
		var datas = require('model/fashionbook').getImagesByCategory({
			key : _key,
			value : _value
		});
		for (var i = 0; i < datas.length && i<80; i++) {
			cols[i % 3].add(Ti.UI.createImageView({
				image : datas[i].lowurl,
				data : datas[i],
				width : Ti.UI.FILL,
				height : 0.5 * Ti.Platform.displayCaps.platformWidth,
				top : '1dp'
			}));
		}
	}, 10);
	return self;
};
