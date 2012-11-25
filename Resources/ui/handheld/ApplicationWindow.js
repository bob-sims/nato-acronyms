//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView'),
		AboutView = require('ui/common/AboutView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		//"navBarHidden":"true"
		//backgroundImage:'/images/back.jpg'
	});
		
	var firstView = new FirstView(),
		aboutView = new AboutView();
		
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


	firstView.setBottom(40);
	
	//create master view container
	var firstContainerWindow = Ti.UI.createWindow({
		"navBarHidden":"true",
	});
	firstContainerWindow.add(toolbar);
	firstContainerWindow.add(firstView);
	
	//create detail view container
	var aboutContainerWindow = Ti.UI.createWindow({
		title:'About',
		"navBarHidden":"false"
	});
	aboutContainerWindow.add(aboutView);
	
	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:firstContainerWindow
	});
	self.add(navGroup);
	
		about.addEventListener('click',function(e){
		Ti.API.info('info clicked!');
//		var Window = require('/ui/handheld/android/AboutWindow');
//		var w = new Window();
//		w.open();
		//create detail view container
//		var aboutView = new AboutView();
//		var aboutContainerWindow = Ti.UI.createWindow({
//			title:'About This App'
//		});
//		aboutContainerWindow.add(aboutView);
//		aboutContainerWindow.open();
		navGroup.open(aboutContainerWindow);
	});
	
	/*
	//add behavior for master view
	firstView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		navGroup.open(detailContainerWindow);
	});
	*/
	//self.add(firstView);
	
	//Ti.API.info(JSON.stringify(toolbar));
		
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
