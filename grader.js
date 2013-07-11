#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var sys = require('util');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1);
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};

var checkHtmlString = function(str, checksfile) {
    $ = cheerio.load(str);
    var checks = JSON.parse(fs.readFileSync(checksfile));
    var out = {};
    for(var ii in checks) {
       var present = $(checks[ii]).length>0;
       out[checks[ii]] = present;
    }
    return out;
};

var clone = function(fn) {
    return fn.bind({});
};

var loadURLAndCheck = function(url, checksfile) {
    rest.get(url).on('complete', function(result){
       var outjson = checkHtmlString(result, checksfile);
       var strjson = JSON.stringify(outjson, null, 4);
       console.log(strjson);
    });
};

var loadFileAndCheck = function(file, checksfile) {
    var htmlstr = fs.readFileSync(file);
    var outjson = checkHtmlString(htmlstr, checksfile);
    var strjson = JSON.stringify(outjson, null, 4);
    console.log(strjson);
};

if(require.main == module) {
    program
        .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
        .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-u, --url <html_url>', 'URL to html file')
        .parse(process.argv);

    if (program.url)
        loadURLAndCheck(program.url, program.checks);
    else
        loadFileAndCheck(program.file, program.checks);
 } else {
    exports.checkHtmlFile = checkHtmlFile;
}
