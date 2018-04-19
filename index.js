var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

/*
*       PARAMETERS
        -v validate
          -d directory to validate in
        -c create
*/

if (argv['v'])
{
  if (!argv['d'])
  {
    console.error("Argument for directory is missing. Please define a directory with -d.");
  }
  else
  {
    var directory = argv['d'];
    console.log("Starting validation in directory " + directory);

    readXML(directory + '/foo.xml', function(parsedXml) {
        console.log(parsedXml);
    });
  }
}

function readXML(file, callback) {
  var fileSystem = require('fs');
  xml2js = require('xml2js');

  console.log("Trying to read file " + file);

  var parser = new xml2js.Parser();
  fileSystem.readFile(file, function(error, rawXml) {
    parser.parseString(rawXml, function (error, parsedXml) {
      callback(parsedXml);
    });
  });
}
