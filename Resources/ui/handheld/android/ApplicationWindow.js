//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView'),
		ActionBarView = require('ActionBarView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
	
	//home action bar
	var actionBar = new ActionBarView({
		buttons: {
/*			checkin: {
				title:'checkin',
				width:80
		}, */
			about: {
				icon:'/images/light_info@2x.png',
				width:40
	}  
		}
	});
	self.add(actionBar.viewProxy);
		
	//construct UI
	var firstView = new FirstView();
	firstView.top = 45;
	self.add(firstView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
