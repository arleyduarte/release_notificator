var fs = require("fs");

readReadme();
function readReadme() {
  const path = "/Users/arley/Documents/zyght/ZyghtReactNative/README.md";
  const lineReader = require("line-reader");
  let line_counter = 0;
  let issues = [];
  let version;
  lineReader.eachLine(path, function (line) {
    console.log(line_counter, line);
    if (line_counter === 2) {
      version = line.replace("#", "").trim();
    }

    if (line_counter > 4) {
      if (line.startsWith("#")) {
        putIssuesToTemplate(issues, version);
        return false;
      } else if (line.startsWith("-")) {
        issues.push(line);
      }
    }
    line_counter++;
  });
}

function putIssuesToTemplate(issues, version) {
  console.log(version);
  console.log(issues);

  let path = __dirname + "/template.html";
  let template = fs.readFileSync(path, { encoding: "utf-8" });
  var htmlVersion = template.replace("VERSION", version);
  var html = htmlVersion.replace("ISSUES", getIssuesList(issues));

  sendEmail(html);
}

function getIssuesList(issues) {
  const htmlList = issues.map((issue) => {
    return `<li style="margin: 15px 0;" > ${issue.replace("-", "")}</li>`;
  });

  return htmlList.join("");
}

function sendEmail(html) {
  var nodeoutlook = require("nodejs-nodemailer-outlook");

  console.log("Enviando Email");

  nodeoutlook.sendEmail({
    auth: {
      user: process.env.ZYGHT_EMAIL,
      pass: process.env.ZYGHT_EMAIL_PASSWORD,
    },

    from: "arley.duarte@zyght.com",
    // to: "arleymauricio@gmail.com",
    to:
      "arleymauricio@gmail.com,9f088c34.zyght.onmicrosoft.com@amer.teams.ms,magnolia.izarra@zyght.com,greidy.melendez@zyght.com,55e7153a.zyght.com@amer.teams.ms",
    subject: "Nueva versión del App Zyght!",
    html: html,
    text: "",
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
}
