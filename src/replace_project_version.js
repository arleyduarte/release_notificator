var fs = require("fs");
var path_package_json =
  "/Users/arley/Documents/zyght/ZyghtReactNative/package.json";

getVersionFromReadme();

function getVersionFromReadme() {
  const path = "/Users/arley/Documents/zyght/ZyghtReactNative/README.md";
  const lineReader = require("line-reader");
  let line_counter = 0;
  let issues = [];
  let version;
  lineReader.eachLine(path, function (line) {
    //console.log(line_counter, line);
    if (line_counter === 2) {
      version = line.replace("#", "").trim();
      replaceProjectVersion(version);
      return false;
    }

    line_counter++;
  });
}

function replaceProjectVersion(version) {
  const lineReader = require("line-reader");

  lineReader.eachLine(path_package_json, function (line) {
    //console.log(line);
    if (line.includes('"version')) {
      replaceForReadmeVersion(line, version);
      return false;
    }
  });
}

function replaceForReadmeVersion(line, version) {
  fs.readFile(path_package_json, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(line, `  "version\":\ "${version}",`);
    console.log("Replace version in package.json", version);
    fs.writeFile(path_package_json, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}
