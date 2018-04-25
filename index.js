//Dependencies
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const { parse } = require('pixl-xml');

const parseXML = file => {
                            try
                            {
                              return (parse(file, { preserveDocumentNode: true }))
                            }
                            catch (error)
                            {
                              console.log("Could not parse file " + file + ": " + error);
                            }
                          }

const isSubDirectory = directory => containsXMLFile(directory) && containsChangeLogXML(directory);
const containsChangeLogXML = directory => getXMLFiles(directory).filter(xmlFile => isChangeLogXML(parseXML(xmlFile))) > 0;
const isChangeLogXML = xml => xml['databaseChangeLog'] ? true : false;
const containsXMLFile = path => getXMLFiles(path).length > 0;
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const getXMLFiles = path => readdirSync(path).filter(file => file.split('.').pop() == 'xml');

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

    if (isSubDirectory(directory))
    {
      //Is there an impex for each changelogxml?
      //Is there a changelogxml for each impex?
      //are there any left over files?
      //Are there any two files with the same changelog id?
    }
    else
    {
      //Should we check for date convention of folder names?
      //IF we are in the parent directory for the changelogs, go into each changelogfolder and start validation
    }
  }
}
