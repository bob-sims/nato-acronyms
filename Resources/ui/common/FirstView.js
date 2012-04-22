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

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:String.format(L('welcome'),'Titanium'),
		height:'auto',
		width:'auto'
	});
		
	self.add(createTable());
	self.add(label);	
	
	search.addEventListener('change', tableRefresh);
	
	//db.selectItems('CAP', callBack);

	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
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

function callBack(_data) {
	var tableData = [];
	for (var i = 0; i < _data.length; i++) {
		tableData.push({title:_data[i].term});
		//Ti.API.info(_data[i].term);
	}
	table.setData(tableData);
}

function createTable() {
	//some dummy data for our table view
	var tableData = [
		{title:'Apples', price:'1.25'},
		{title:'Grapes', price:'1.50'},
		{title:'Oranges', price:'2.50'},
		{title:'Bananas', price:'1.50'},
		{title:'Pears', price:'1.40'},
		{title:'Kiwis', price:'1.00'}
	];

	table = Ti.UI.createTableView({
		top:45,
		data:tableData
	});
	
	return table;
	
}

module.exports = FirstView;
