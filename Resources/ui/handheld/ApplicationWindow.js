//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var about = Titanium.UI.createButton({
		title: 'About',
    	systemButton: Titanium.UI.iPhone.SystemButton.INFO_LIGHT,
	});
	
	var flexSpace = Titanium.UI.createButton({
    	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
	    items:[flexSpace, about, flexSpace],
	    height:40,
	    bottom:0,
	    borderTop:true,
	    borderBottom:false
	}); 
	
	//construct UI
	var firstView = new FirstView();
	firstView.setBottom(40);
	self.add(firstView);
	self.add(toolbar);
	Ti.API.info(JSON.stringify(toolbar));
		
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
