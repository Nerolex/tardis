//Dependencies
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const { parse } = require('pixl-xml');

const parseXml = file => {
                            try
                            {
                              return (parse(file))
                            }
                            catch (error)
                            {
                              console.log("Could not parse file " + file + ": " + error);
                            } 
                          }
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

//Main
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

    console.dir(getDirectories("."));

    console.log(parseXml(directory + "/foo.xml"));
  }
}
