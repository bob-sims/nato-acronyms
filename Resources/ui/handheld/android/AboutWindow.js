function AboutWindow() {
	var _ = require('/lib/underscore'),
		theme = require('/ui/theme'),
		ui = require('/ui/components'),
		ActionBarView = require('/ui/handheld/android/ActionBarView'),
		AboutView = require('/ui/common/AboutView');

	var self = new ui.Window({
		navBarHidden:true,
		backgroundColor:'#ffffff',
		backgroundImage:'/images/back.jpg'
		//backgroundImage:theme.windowBackground
	});
	
	var actionBar = new ActionBarView({
		title:'About',
		//color:'#dbddde',
		color: 'red',
		buttons: {
			cancel: {
				icon:'/images/light_x-2@2x.png',
				width:40
			}
		}
	});
	self.add(actionBar.viewProxy);
	
	actionBar.addEventListener('buttonPress', function() {
		self.close();
	});
	
	//construct UI
	var aboutView = new AboutView();
	aboutView.top = 45;
	self.add(aboutView);
	
	return self;
}
module.exports = AboutWindow;