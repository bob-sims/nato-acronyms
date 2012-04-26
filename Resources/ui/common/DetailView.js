//FirstView Component Constructor
function DetailView(_args) {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
		//Ti.API.info(JSON.stringify(_args));
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		//text:String.format(L('welcome'),'Titanium'),
		text: _args.term+': '+_args.definition,
		height:'auto',
		width:'auto'
	});
	self.add(label);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
}

module.exports = DetailView;