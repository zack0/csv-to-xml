var csv = require('fast-csv');
var mu = require('mustache');
var fs = require('fs');
var file = fs.createWriteStream('output.xml');
var xmlTemplate = "<customer>\r\n\t<salutation>{{salutation}}</salutation>\r\n\t<contactid>{{contactid}}</contactid>\r\n\t<firstname>{{firstname}}</firstname>\r\n\t<lastname>{{lastname}}</lastname>\r\n\t<mailingstreet>{{mailingstreet}}</mailingstreet>\r\n\t<mailingcity>{{mailingcity}}</mailingcity>\r\n\t<mailingstate>{{mailingstate}}</mailingstate>\r\n\t<mailingcountry>{{mailingcountry}}</mailingcountry>\r\n\t<phone>{{phone}}</phone>\r\n\t<mobile>{{mobile}}</mobile>\r\n\t<fax>{{fax}}</fax>\r\n\t<email>{{email}}</email>\r\n\t<accountname>{{accountname}}</accountname>\r\n\t<contactrecordtype>{{contactrecordtype}}</contactrecordtype>\r\n\t<contactowner>{{contactowner}}</contactowner>\r\n</customer>\r\n";
// var xmlTemplate = require('./template-xml.mustache');

csv
 .fromPath("input.csv")
 .on("data", function(data){
	var	customer = {
			"contactid": data[0].toString(),
			"Salutation": data[1],
			"firstname": data[2].toString(),
			"lastname": data[3].toString(),
			"mailingstreet": data[4].toString(),
			"mailingcity": data[5].toString(),
			"mailingstate": data[6].toString(),
			"mailingpostalcode": data[7].toString(),
			"mailingcountry": data[8].toString(),
			"phone": data[9].toString(),
			"mobile": data[10].toString(),
			"fax": data[11].toString(),
			"email": data[12].toString(),
			"accountname": data[13].toString(),
			"contactrecordtype": data[14].toString(),
			"contactowner": data[15].toString()
		}
		if (data[12] != '')
			{
				file.write(mu.render(xmlTemplate, customer));
				console.log('Processed record: ' + data[0]);
			}
			else {
				console.log('Skipped Customer: ' + data[0] + ' for no email');
			}
 })
 .on("end", function(){
     console.log('All records parsed.');
 });