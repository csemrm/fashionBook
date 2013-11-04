exports.create = function(_args) {
	if (Ti.Network.online == false || !_args.mp4)
		return;
	var url = _args.mp4;
	Ti.Android || Ti.UI.createNotification({
		message : 'Loading of video …'
	}).show();
	var self = Ti.UI.createWindow({
		backgroundColor : '#000',
		orientationModes : [Ti.UI.LANDSCAPE_RIGHT, Ti.UI.LANDSCAPE_LEFT]
	});
	Ti.Android || self.open();
	var videoplayer = Ti.Media.createVideoPlayer({
		autoplay : true,
		fullscreen : true,
		backgroundColor : '#000',
		url : url,
		mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Ti.Media.VIDEO_SCALING_ASPECT_FILL
	});
	if (!Ti.Android) {
		self.add(videoplayer);
		self.addEventListener('longpress', function() {
			videoplayer.stop();
			self.close();
		});
	}
	videoplayer.addEventListener('complete', function(e) {
		if (e.reason == 0) {
			self.close();
		};
	});
	videoplayer.addEventListener('fullscreen', function(e) {
		if (e.entering == 0) {
			self.close();
		};
	});

};
