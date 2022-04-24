const fs = require("fs");
const inquirer = require("inquirer");
const { table } = require("console");
const { title } = require("process");


// prompt questions //
const questions = [
  {
    type: "input",
    name: "repositoryName",
    message: "To Start please enter the application name: (Required)",
    validate: (repoNameInput) => {
      if (repoNameInput) {
        return true;
      } else {
        console.log("Enter the name:");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "githubUser",
    message: "Please enter your Github username: (Required)",
    validate: (githubUserInput) => {
      if (githubUserInput) {
        return true;
      } else {
        console.log("Enter your Github username:");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "Please describe your application: (Required)",
    validate: (descInput) => {
      if (descInput) {
        return true;
      } else {
        console.log("Enter a description:");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "installation",
    message:
      "Please enter instructions for the installation:(Required)",
    validate: (instalInput) => {
      if (instalInput) {
        return true;
      } else {
        console.log("Installation Instructions:");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "usage",
    message: "Enter some instructions for users to use your app! (Required)",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log("Enter some instructions!");
        return false;
      }
    },
  },
  {
    type: "list",
    name: "license",
    message: "What is the license?(Required)",
    choices: ["GPL V3", "EPL 1.0", "MIT", "MPL 2.0"],
    validate: (licenseInput) => {
      if (licenseInput) {
        return true;
      } else {
        console.log("Enter none for no license!");
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmIssues",
    message: "Would you like people to report issues?",
    default: false,
  },
  {
    type: "input",
    name: "issues",
    message: "Provide a way for users to contact you!",
    when: ({ confirmIssues }) => confirmIssues,
  },
  {
    type: "input",
    name: "contributors",
    message: 'List other contributors, if no others type "none"?(Required)',
    validate: (contributorsInput) => {
      if (contributorsInput) {
        return true;
      } else {
        console.log("Enter none for no contributors!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "tests",
    message: "List the tests that have been preformed on this app!(Required)",
    validate: (testsInput) => {
      if (testsInput) {
        return true;
      } else {
        console.log("List Tests Completed!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "contact",
    message:
      "Please provide a contact email address for any user questions:(Required)",
    validate: (contactInput) => {
      if (contactInput) {
        return true;
      } else {
        console.log("Contact info added!");
        return false;
      }
    },
  },
];

/* ===============[ 2. Functions () ]======================*/
/**
 * 2.1 init()
 */
function init() {
  const toc =
    "  \n ## Table of Contents:  \n[1. Description](#Description)  \n[2. Installation](#Installation)  \n[3. App Usage](#App-Usage)  \n[4. License Details](#License-Details)  \n[5. List of Contributors](#List-of-Contributors)  \n[6. Tests](#Tests)  \n[7. Questions](#Questions)  \n";
  inquirer.prompt(questions).then((res) => {
    title();
    function title() {
      fs.writeFile(
        "./dist/README.md",
        `# ${res.repositoryName}  \r\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Repository Name added!");
          licenseBadge();
        }
      );
    }
    function licenseBadge() {
      if (res.license === "GPL V3") {
        fs.appendFileSync(
          "./dist/README.md",
          `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("License is GPL V3!");
            table();
          }
        );
      } else if (res.license === "EPL 1.0") {
        fs.appendFileSync(
          "./dist/README.md",
          `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("License is EPL 1.0!");
            table();
          }
        );
      } else if (res.license === "MIT") {
        fs.appendFileSync(
          "./dist/README.md",
          `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("License is MIT!");
            table();
          }
        );
      } else if (res.license === "MPL 2.0") {
        fs.appendFileSync(
          "./dist/README.md",
          `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("License is MPL 2.0!");
            table();
          }
        );
      }
      table();
    }
    function table() {
      fs.appendFile("./dist/README.md", `${toc}`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Table of Contents added!");
        description();
      });
    }
    function description() {
      fs.appendFile(
        "./dist/README.md",
        `## Description:\n${res.description}\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Description added!");
          instal();
        }
      );
    }
    function instal() {
      fs.appendFile(
        "./dist/README.md",
        `## Installation:\n${res.installation}\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Install instructions added!");
          usageFunc();
        }
      );
    }
    function usageFunc() {
      fs.appendFile(
        "./dist/README.md",
        `## App Usage:\n${res.usage}\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("User instructions added!");
          licensing();
        }
      );
    }

    function licensing() {
      fs.appendFile(
        "./dist/README.md",
        `## License Details:  \n The Eclipse Public License (EPL) is a free and open source software license most notably used for the Eclipse IDE and other projects by the Eclipse Foundation.  \n  \n Software under the GPL may be run for all purposes, including commercial purposes and even as a tool for creating proprietary software, such as when using GPL-licensed compilers.  \n  \n The MIT License is a free software license that was created at the Massachusetts Institute of Technology (MIT). It is a permissive license, meaning that it allows programmers to put the code in proprietary software on the condition that the license is given with that software, and GPL-compatible, meaning that the GPL permits programmers to combine and redistribute it with software that uses the MIT License.  \n  \n The MPL is a simple copyleft license. The MPL's "file-level" copyleft is designed to encourage contributors to share modifications they make to your code, while still allowing them to combine your code with code under other licenses (open or proprietary) with minimal restrictions. `,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("License added!");
          loc();
        }
      );
    }
    function loc() {
      fs.appendFile(
        "./dist/README.md",
        `  \n## List of Contributors:\n${res.contributors}\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Contributor list added!");
          testing();
        }
      );
    }
    function testing() {
      fs.appendFile("./dist/README.md", `## Tests:\n${res.tests}\n`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Tests Listed!");
        questioning();
      });
    }
    function questioning() {
      fs.appendFile(
        "./dist/README.md",
        `## Questions:\n Here is a link to my github:  \nhttps://github.com/${res.githubUser}  \n Email me at:  \n${res.contact}  \nfor additional questions\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Contact info added!");
        }
      );
    }
  });
}

init();
