var ui = require('/ui/components');
var aboutArray =[];

Ti.API.info('count: '+require('/lib/db').countItems());

aboutArray.push({"text":'This simple app finds definitions for NATO acronyms. The current database contains '+require('/lib/db').countItems()
	+' acronyms sourced from an unofficial spreadsheet on the ACT Tidepedia wiki.'});
aboutArray.push({"text":'Bob Sims developed this app, along with help and inspiration from several others.'});
aboutArray.push({"email":'bob.sims@gmail.com',"title":'Email Developer'});
aboutArray.push({"www":'bobsims.tumblr.com',"title":'Visit Developer Website'});
aboutArray.push({"www":'www.jftc.nato.int',"title":'Visit JFTC Website'});
aboutArray.push({"text":'This app is currently provided as-is, not officially endorsed or supported by JFTC or NATO.'});

function createTextRow(e) {
	var row = Ti.UI.createTableViewRow({"touchEnabled":'false',"selectedBackgroundColor":'transparent'});
	var label = new ui.Label(e.text,{"text":e.text,"touchEnabled":'false',"width":'90%',top:5,bottom:5});
	row.add(label);
	
	return row;
}

function createEmailButtonRow(e) {
	var button = new ui.Button({
			"title":e.title,
			"email":e.email,
			"width":'80%',
			//"height":50,
			//"backgroundColor":'blue',
			//"borderRadius":10,
			top:5
		});
	button.addEventListener('click', function(e){
		createEmail(e.source);
	})
	var row = Ti.UI.createTableViewRow({"selectedBackgroundColor":'transparent',"touchEnabled":'false'});
	row.add(button);
	return row;
}

function createEmail(args) {
	//Ti.API.info(JSON.stringify(args));
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "NATO Acronyms Application";
	emailDialog.toRecipients = [args.email];
	emailDialog.open();
}

function createWebButtonRow(e) {
	var button = new ui.Button({"title":e.title,"www":e.www,"width":'80%',top:5});
	button.addEventListener('click', function(e){
		Ti.Platform.openURL('http://'+e.source.www);
	})
	var row = Ti.UI.createTableViewRow({"selectedBackgroundColor":'transparent'});
	row.add(button);
	return row;
}

var table = Ti.UI.createTableView({"separatorColor":'transparent',"selectedBackgroundColor":'transparent'}), rowData=[];

for(var i in aboutArray) {
	if(aboutArray[i].text) {
		rowData.push(createTextRow(aboutArray[i]));
	}
	if(aboutArray[i].email) {
		rowData.push(createEmailButtonRow(aboutArray[i]));
	}
	if(aboutArray[i].www) {
		rowData.push(createWebButtonRow(aboutArray[i]));
	}
}

table.setData(rowData);

//FirstView Component Constructor
function AboutView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		//text:String.format(L('welcome'),'Titanium'),
		text:aboutArray[0].text,
		height:'auto',
		width:'auto'
	});
	//self.add(label);
	self.add(table);
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
}

module.exports = AboutView;