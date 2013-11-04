exports.create = function(_url) {
	var self = Ti.UI.createWindow({
		fullscreen : true
	});
	var web = Ti.UI.createWebView({
		url : _url
	});
	self.add(web);
	return self;
};
