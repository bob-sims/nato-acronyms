var db = require('/lib/db'), ui = require('/ui/components'), theme = require('/ui/theme');

var table, search;

//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	search = Titanium.UI.createSearchBar({
		showCancel:true,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_SEARCH,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		height:45,
		top:0,
		hintText:'Enter search term.'
	});
	
	search.addEventListener('change', tableRefresh);
		
	search.addEventListener('return', termSearch);
		
	search.addEventListener('cancel', function(e) {
	    Ti.API.info('cancel clicked');
	    search.value='';
	    search.blur();
	});
	self.add(search);	
	
	var table = createTable();
	var alertDialog = function(e) {
		Ti.API.info(JSON.stringify(e.rowData));
		if(e.rowData) {
			//Ti.API.info(e.rowData.term+': '+e.rowData.definition);
		 	var dialog = Ti.UI.createAlertDialog({
			    cancel: 0,
			    buttonNames: ['OK','Copy'],
			    message: e.rowData.definition,
			    title: e.rowData.term
			  });
			dialog.addEventListener('click', function(e) {
			  	if(e.index=1) {
			  		Ti.UI.Clipboard.setText(e.source.message+' ('+e.source.t+')');
			  	};
			  });
		}
		// only show dialog if results exist
		if (e.rowData.definition) {		
			dialog.show();
		};
	};	
	table.addEventListener('click', alertDialog);
	self.add(table);
	//search.focus();
	
	var lasttipView =  Titanium.UI.createView({
		width:205,
		height:57,
		backgroundImage:"/images/bubble.png",
		top:0,
		left:'10%'
	});

	var lasttipLabel =  Titanium.UI.createLabel({
		text:'Enter search term above.',
		color:'#fff',
		width:205,
		height:34,
		top:16,
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13,
			fontWeight:'bold'
			},
		textAlign:'center'
	});
	 
	lasttipView.add(lasttipLabel);
	
	var anim_out = Titanium.UI.createAnimation({opacity:0,duration:3000});
	table.add(lasttipView);
	lasttipView.animate(anim_out);
	
	return self;
}

function termSearch(e) {
	// fire table refresh
	var term = e.value.toUpperCase();
	//var term = e.value;
	Ti.API.info('Searching for: '+term);
	db.selectItem(term, searchCallBack)
	search.blur();
}

function tableRefresh(e) {
	setTimeout(function(){
		if(e.value.length === search.value.length && e.value.length > 1) {
			// fire table refresh
			//var term = e.value.toUpperCase();
			var term = e.value;
			Ti.API.info('Too slow, searching: '+term);
			db.selectItems(term, refreshCallBack)
		}
	},250)
}
function createRow(_data) {
	var label = new ui.Label(_data.definition, theme.rowLabel);
	label.text = _data.definition;
	label.term = _data.term;
	var tableRow = Ti.UI.createTableViewRow({term:_data.term, definition:_data.definition});
	tableRow.add(label);
	return tableRow;
}

function searchCallBack(_term, _data) {
	var tableData = [];
	if(_data.length) {
		for (var i = 0; i < _data.length; i++) {
			tableData.push(createRow(_data[i]));
			Ti.API.info(_data[i].term);
			table.results = true;
		}
		table.setData(tableData);
	}
	else {
		Ti.API.info('no hit');
		var dialog = Ti.UI.createAlertDialog({
			title: 'Sorry.',
		    message: ('No entry for '+_term+'.'),
		    buttonNames: ['OK'],
		    cancel: 0,
		  });
		dialog.addEventListener('click', function(e) {
		  	Ti.API.info(e.source.title+': '+e.source.message);
			//search.focus();
		  	});
		  dialog.show();
	}
	//table.setData(tableData);
}

function refreshCallBack(_term, _data) {
	var tableData = [];
	if(_data.length) {
		for (var i = 0; i < _data.length; i++) {
			tableData.push(createRow(_data[i]));
			Ti.API.info(_data[i].term);
		}
	table.setData(tableData);
	}
}

function createTable() {
	table = Ti.UI.createTableView({
		top:45,
	});
	return table;
}

module.exports = FirstView;
