const BASEURL = 'http://familientagebuch.de:80/axel';
//const BASEURL = 'http://milon.no-ip.info:85';
function shuffle(o) {//v1.0
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

var cats = require('model/db').cats;

exports.getImagesByCategory = function(_args) {
	var bar = [], key = _args.key, value = _args.value, foo = JSON.parse(Ti.App.Properties.getString('images'));
	for (var i = 0; i < foo.length; i++) {
		if (foo[i][key] == value)
			bar.push(foo[i]);
	}
	foo = null;
	return bar;
};

exports.init = function(_args) {
	if (!Ti.Network.online)
		alert('Diese App braucht das Internet.');
	console.log(_args);
	var xhr = Ti.Network.createHTTPClient({
		onerror : function() {
			if (Ti.App.Properties.hasProperty('images'))
				_args && _args.onload(JSON.parse(Ti.App.Properties.getString('images')));
			console.log(this.error);
		},
		onload : function(e) {
			var images = shuffle(JSON.parse(this.responseText));
			var datas = [];
			for (var i = 0; i < images.length; i++) {
				var string = images[i].name.replace(/\.jpg/i, '').replace(/_[\d]+$/, '');
				var res = string.match(/^([\d][\d])([A-Z])([A-Z])_(.*)/);
				if (!res || res.length < 4)
					continue;
				if (!cats.season[res[1]] || !cats.type[res[2]] || !cats.city[res[3]]) {
					continue;
				}
				var a = res[4];
				var data = {
					season : cats.season[res[1]],
					type : cats.type[res[2]],
					city : cats.city[res[3]],
					artist : a,
					agency : (cats.artist[a]) ? cats.artist[a].name : a,
					url : BASEURL + '/photo/high/' + images[i].name,
					lowurl : BASEURL + '/photo/low/' + images[i].name,
				};
				if (cats.artist[a] && cats.artist[a].mp4)
					data.mp4 = cats.artist[a].mp4;
				if (cats.artist[a] && cats.artist[a].wiki)
					data.wiki = cats.artist[a].wiki;
				datas.push(data);
			}
			Ti.App.Properties.setString('images', JSON.stringify(datas));
			_args && _args.onload(datas);
		}
	});
	xhr.open('GET', BASEURL + '/');
	xhr.send();
};
