var DATABASE_NAME = 'acronyms';

exports.createDb = function() {
	Ti.Database.install('/db/nato_acronyms.sqlite', DATABASE_NAME);
	Ti.API.info('creating db '+DATABASE_NAME+'...');
};

exports.countItems = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('SELECT COUNT(*) as howMany FROM acronyms');
	while (rows.isValidRow()){
		retData.push({count:rows.fieldByName('howMany')});
		rows.next();
	}
	db.close();
	return retData[0].count;
}

exports.selectItems = function(_term, _callback) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from acronyms where term LIKE ?', _term+'%');
	while (rows.isValidRow()) {
		retData.push({term:rows.fieldByName('term'), definition:rows.fieldByName('definition')});
		//Ti.API.info(rows.fieldByName('term'));
		rows.next();
	}
	db.close();
	
	if(_callback) {
		_callback(_term, retData);
	}
	
	return retData;
};

exports.selectItem = function(_term, _callback) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from acronyms where term = ?', _term);
	while (rows.isValidRow()) {
		retData.push({term:rows.fieldByName('term'), definition:rows.fieldByName('definition')});
		Ti.API.info(rows.fieldByName('term'));
		rows.next();
	}
	db.close();
	
	if(_callback) {
		_callback(_term, retData);
	}
	
	return retData;
};