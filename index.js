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

    test(directory);
  }
}

function test(directory) {
  var fileSystem = require('fs');
  xml2js = require('xml2js');

  var parser = new xml2js.Parser();
  fileSystem.readFile(directory + '/foo.xml', function(error, data) {
    parser.parseString(data, function (error, result) {
      console.dir(result);
      console.log('Done');
    });
  });
}
