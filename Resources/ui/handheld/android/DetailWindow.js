function DetailWindow(_args) {
	var _ = require('/lib/underscore'),
		theme = require('/ui/theme'),
		ui = require('/ui/components'),
		ActionBarView = require('/ui/handheld/android/ActionBarView'),
		DetailView = require('/ui/common/DetailView');

	var self = new ui.Window({
		navBarHidden:true,
		backgroundColor:'#ffffff',
		//backgroundImage:theme.windowBackground
	});
	
	var actionBar = new ActionBarView({
		title:_args.term,
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
	var detailView = new DetailView(_args);
	detailView.top = 45;
	self.add(detailView);
	
	return self;
}
module.exports = DetailWindow;