var db = require('/lib/db');

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
	self.add(search);	
	
	search.addEventListener('cancel', function(e) {
	    Ti.API.info('cancel clicked');
	    search.value='';
	    search.blur();
	})
	
	var table = createTable();
	var alertDialog = function(e) {
		Ti.API.info(e.rowData.term+': '+e.rowData.title);
	 	var dialog = Ti.UI.createAlertDialog({
		    cancel: 0,
		    buttonNames: ['OK','Copy'],
		    message: e.rowData.title,
		    title: e.rowData.term
		  });
		dialog.addEventListener('click', function(e) {
		  	Ti.API.info(e.source.title+': '+e.source.message);
		  	if(e.index=1) {
		  		Ti.UI.Clipboard.setText(e.source.message+' ('+e.source.title+')');
		  	};
		  });
		// only show dialog if results exist
		if (table.results) {		
			dialog.show();
		};
	};	
	table.addEventListener('click', alertDialog);
	self.add(table);
	search.focus();
	
	var lasttipView =  Titanium.UI.createView({
		width:205,
		height:57,
		backgroundImage:"images/bubble.png",
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
	
	var anim_out = Titanium.UI.createAnimation({opacity:0,duration:750});
	table.add(lasttipView);
	
	search.addEventListener('change', function(e){
		lasttipView.animate(anim_out);
	});
	
	search.addEventListener('change', tableRefresh);
	
	search.addEventListener('return', termSearch);
	
	return self;
}

function termSearch(e) {
	// fire table refresh
	Ti.API.info('Searching for: '+e.value.toUpperCase());
	db.selectItem(e.value.toUpperCase(), searchCallBack)
	search.blur();
}

function tableRefresh(e) {
	setTimeout(function(){
		if(e.value.length === search.value.length && e.value.length > 1) {
			// fire table refresh
			Ti.API.info('Too slow, searching: '+e.value);
			db.selectItems(e.value, refreshCallBack)
		}
	},500)
}

function searchCallBack(_term, _data) {
	var tableData = [];
	if(_data.length) {
		for (var i = 0; i < _data.length; i++) {
			tableData.push({term:_data[i].term, title:_data[i].definition, color:'black'});
			Ti.API.info(_data[i].term);
			table.results = true;
		}
		table.setData(tableData);
	}
	else {
		Ti.API.info('no hit');
		//tableData.push({term:_term,title:'no entry for '+_term, color:'black'});
		//alert('Sorry, no entry for '+_term+'.');
		var dialog = Ti.UI.createAlertDialog({
		    message: ('Sorry, no entry for '+_term+'.'),
		    //title: 'Oops!'
		  });
		dialog.addEventListener('click', function(e) {
		  	Ti.API.info(e.source.title+': '+e.source.message);
			search.focus();
		  	});
		  dialog.show();
		  
		table.results = false;
	}
	//table.setData(tableData);
}

function refreshCallBack(_term, _data) {
	var tableData = [];
	if(_data.length) {
		for (var i = 0; i < _data.length; i++) {
			tableData.push({term:_data[i].term, title:_data[i].definition, color:'black'});
			Ti.API.info(_data[i].term);
			table.results = true;
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
