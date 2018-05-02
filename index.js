//Dependencies
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const { parse } = require('pixl-XML');

//Variables
const shouldValidate = args => args['v'];
const validationDir = args => args['d'];

//Functions
const validateDirectories = (path, depth) =>
{
  console.log(path);
  if (isChangeLogPath(path))
  {
    //validate ChangeLog directories
    return validateChangeLogs(getChangeLogDirectories(path));
  }
  else
  {
    //look one level below
    if (depth > 0)
    {
      //Look recursively below, join paths
      //getDirectories(path).filter(directory => validateDirectories(path + "/"))
    }
    else
    {
      return;
    }
  }
}

const validateChangeLogs = (directories, path) => directories.filter(isValidChangeLogDiretory(directory, path)) > 0;
const isValidChangeLogDirectory = (directory, path) => referencedImpexFilesExist(getChangeLogXMLs(directory), path);
const referencedImpexFilesExist = (changeLogXMLFiles, path) => changeLogXMLFiles.filter(changeLogXMLFile => referencedImpexFileExists(changeLogXMLFile, path)) > 0;
const referencedImpexFileExists = (changeLogXMLFile, path) =>
{
  changeLog = parseXML(changeLogXMLFile);
  referencedImpex = changeLog["file"];

  if (referencedImpex)
  {
    impexesAtPath = readdirSync(path).filter(file => file.split('.').pop() == 'impex');

    console.log("Huray.");
  }
}

const parseXML = file =>
{
  try
  {
    return (parse(file, { preserveDocumentNode: true }))
  }
  catch (error)
  {
    console.log("Could not parse file " + file + ": " + error);
  }
}

const isChangeLogPath = path => getChangeLogDirectories(path) > 0;
const getChangeLogDirectories = path => {console.log("!" + path); getDirectories(path).filter(directory => isChangeLogDirectory(directory)); }
const isChangeLogDirectory = directory => containsXMLFile(directory) && containsChangeLogXML(directory);
const getChangeLogXMLs = directory => getXMLFiles(directory).filter(XMLFile => isChangeLogXML(parseXML(XMLFile)));
const containsChangeLogXML = directory => getChangeLogXMLs(directory) > 0;
const isChangeLogXML = XML => XML['databaseChangeLog'] ? true : false;
const containsXMLFile = path => getXMLFiles(path).length > 0;
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const getXMLFiles = path => readdirSync(path).filter(file => file.split('.').pop() == 'XML');

//Main
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
/*
*       PARAMETERS
        -v validate
          -d directory to validate in
        -c create
*/

if (shouldValidate(argv))
{
  if (!validationDir(argv))
  {
    console.error("Argument for directory is missing. Please define a directory with -d.");
  }
  else
  {
    var directory = validationDir(argv);
    console.log("Starting validation in directory " + directory);

      //Is there an impex for each changelogXML?
      //Is there a changelogXML for each impex?
      //are there any left over files?
      //Are there any two files with the same changelog id?
      //IF we are in the parent directory for the changelogs, go into each changelogfolder and start validation

    console.dir(validateDirectories(directory, 5));
  }
}
