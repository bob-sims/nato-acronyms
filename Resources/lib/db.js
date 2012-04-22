var DATABASE_NAME = 'acronyms';

exports.createDb = function() {
	Ti.Database.install('/db/nato_acronyms.sqlite', DATABASE_NAME);
	Ti.API.info('creating db '+DATABASE_NAME+'...');
};

exports.selectItems = function(_term, _callback) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from acronyms where term LIKE ?', _term+'%');
	while (rows.isValidRow()) {
		retData.push({term:rows.fieldByName('term'), id:rows.fieldByName('definition')});
		//Ti.API.info(rows.fieldByName('term'));
		rows.next();
	}
	db.close();
	
	// no rows returned?
	
	if(retData.length==0 && _callback) {
		_callback(null);
		return;
	}
	
	if(_callback) {
		_callback(retData);
	}
	
	return retData;
};

exports.selectItem = function(_term, _callback) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from acronyms where term = ?', _term);
	while (rows.isValidRow()) {
		retData.push({term:rows.fieldByName('term'), id:rows.fieldByName('definition')});
		Ti.API.info(rows.fieldByName('term'));
		rows.next();
	}
	db.close();
	return retData;
};