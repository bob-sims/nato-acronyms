function AboutWindow() {
	var _ = require('/lib/underscore'),
		theme = require('/ui/theme'),
		ui = require('/ui/components'),
		ActionBarView = require('/ui/handheld/android/ActionBarView');

	var self = new ui.Window({
		navBarHidden:true,
		//backgroundImage:theme.windowBackground
	});
	
	var actionBar = new ActionBarView({
		title:'About',
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
	
	return self;
}
module.exports = AboutWindow;