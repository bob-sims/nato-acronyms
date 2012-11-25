//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView'),
		ActionBarView = require('ActionBarView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		//backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true,
		backgroundImage:'/images/back.jpg'
	});
	
	//home action bar
	var actionBar = new ActionBarView({
		buttons: {
			about: {
				icon:'/images/light_info@2x.png',
				width:40
	}  
		}
	});
	self.add(actionBar.viewProxy);
	
	actionBar.addEventListener('buttonPress', function(e) {
		if (e.id === 'about') {
			var Window = require('/ui/handheld/android/AboutWindow');
			var w = new Window();
			w.open();
		}
	});
		
	//construct UI
	var firstView = new FirstView();
	firstView.top = 45;
	self.add(firstView);
	
	firstView.addEventListener('itemSelected', function(e) {
		Ti.API.info('itemSelected event fired! '+e.term+': '+e.definition);	
		// todo: make this x-platform
		var Window = require('DetailWindow');
		var w = new Window(e);
		w.open();
	});
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
