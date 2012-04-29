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
		if (Ti.Platform.name === 'android') {
	        // Clear search bar
	        search.value ="";
	        search.blur();
	    }
	})


	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:String.format(L('welcome'),'Titanium'),
		height:'auto',
		width:'auto'
	});
	
	var table = createTable();	
	self.add(table);
	table.addEventListener('click', function(e) {
		Ti.API.info(e.rowData.term+': '+e.rowData.title);
		//self.fireEvent('itemSelected', {term:e.rowData.term, definition:e.rowData.title});
		  var dialog = Ti.UI.createAlertDialog({
		    cancel: 0,
		    buttonNames: ['OK','Share'],
		    message: e.rowData.title,
		    title: e.rowData.term
		  }).show();
			});
	//self.add(label);	
	
	search.addEventListener('change', tableRefresh);
	
	search.addEventListener('return', termSearch);
	
	//db.selectItems('CAP', callBack);

	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
}

function termSearch(e) {
	// fire table refresh
	Ti.API.info('Searching for: '+e.value.toUpperCase());
	db.selectItem(e.value.toUpperCase(), callBack)
}

function tableRefresh(e) {
	setTimeout(function(){
		if(e.value.length === search.value.length && e.value.length > 1) {
			// fire table refresh
			Ti.API.info('Too slow, searching: '+e.value);
			db.selectItems(e.value, callBack)
		}
	},500)
	/*
	if (e.value.length > 1) {
		Ti.API.info('old length: '+search.value.length);
		Ti.API.info('new length: '+e.value.length);
	}
	//alert(e.value);
	
	setTimeout(function() {
		if (e.value.length > 1) {
			Ti.API.info(e.value)
		}
	},500) */
}

function callBack(_term, _data) {
	var tableData = [];

	if(_data.length) {
		for (var i = 0; i < _data.length; i++) {
			tableData.push({term:_data[i].term, title:_data[i].definition});
			Ti.API.info(_data[i].term);
		}
	}
	else {
		Ti.API.info('no hit');
		tableData.push({term:_term,title:'no hit for '+_term});
	}
	table.setData(tableData);
	
}

function createTable() {

	table = Ti.UI.createTableView({
		top:45,
		//data:tableData
	});
	
	return table;
	
}

module.exports = FirstView;
