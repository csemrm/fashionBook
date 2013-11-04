exports.create = function(_data) {
	if (_data) {
		var options = [];
		var keys = ['season', 'city', 'type', 'artist'];
		for (var i = 0; i < keys.length; i++)
			options.push(_data[keys[i]]);
		var opts = {
			options : options,
			title : ' … more from:'
		};
		var self = Ti.UI.createOptionDialog({
			options : options,
			title : 'more from …'
		});
		self.show();
		self.addEventListener('click', function(e) {
			require('ui/tiles.window').create(keys[e.index], options[e.index]).open();
		});
	}
};
