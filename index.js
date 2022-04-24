const fs = require("fs");
const inquirer = require("inquirer");
const { table } = require("console");
const { title } = require("process");

// prompt questions //
const questions = [
  {
    type: "input",
    name: "repositoryName",
    message: "To Start please enter the application name (Required):",
    validate: (repoName) => {
      if (repoName) {
        return true;
      } else {
        console.log("You must enter an application name to continue");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "githubUser",
    message: "Please enter your Github username (Required):",
    validate: (githubUser2) => {
      if (githubUser2) {
        return true;
      } else {
        console.log("You must enter your Github username to continue");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "description",
    message: "Please describe your application (Required):",
    validate: (descript) => {
      if (descript) {
        return true;
      } else {
        console.log("Enter a description to continue");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "installation",
    message:
      "Please enter instructions for the installation (Required):",
    validate: (install) => {
      if (install) {
        return true;
      } else {
        console.log("Installation Instructions are required");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "usage",
    message: "Enter some instructions for users (Required):",
    validate: (instructions) => {
      if (instructions) {
        return true;
      } else {
        console.log("please enter some instructions!");
        return false;
      }
    },
  },

  {
    type: "list",
    name: "license",
    message: "Please chose a license (Required):",
    choices: ["GPL V3", "EPL 1.0", "MIT", "MPL 2.0"],
    validate: (license) => {
      if (license) {
        return true;
      } else {
        console.log("Please choose a license");
        return false;
      }
    },
  },

  {
    type: "confirm",
    name: "confirmIssues",
    message: "Would you like to contribute to this project?",
    validate: (confirm) => {
        if (confirm) {
            return true;
        } else {
            console.log("Please provide a method to contact you");
            return false;
        }
    },
  },

  {
    type: "input",
    name: "issues",
    message: "Provide a way for users to contact you!",
    when: ({confirm}) => confirm,
  },

  {
    type: "input",
    name: "contributors",
    message: 'Will anyone else contribute to this project?, if not please type "none" (Required):',
    validate: (contributors2) => {
      if (contributors2) {
        return true;
      } else {
        console.log("Enter none if no one else with help");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "tests",
    message: "List any tests that have been preformed (Required):",
    validate: (test) => {
      if (test) {
        return true;
      } else {
        console.log("List any tests please");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "contact",
    message:
      "Please provide a contact email address for any user questions (Required):",
    validate: (contactInfo) => {
      if (contactInfo) {
        return true;
      } else {
        console.log("Please add your contact information");
        return false;
      }
    },
  },
];

// table of contents readMe // generate 
function init() {
  const toc =
    "  \n ## Table of Contents:  \n[1. Description](#Description)  \n[2. Installation](#Installation)  \n[3. Applicaton Usage](#App-Usage)  \n[4. License Details](#License-Details)  \n[5. List of Any Other Contributors](#List-of-Contributors)  \n[6. Any Prior Tests](#Tests)  \n[7. Any Questions](#Questions)  \n";
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
          console.log("Congradulations! A Repository Name Was Added");
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
            console.log("The License you chose was GPL V3");
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
            console.log("The License you chose was MIT");
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
            console.log("The License you chsoe was EPL 1.0");
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
            console.log("The License you chose was MPL 2.0");
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
        console.log("Congradulations! A Table of Contents Was Added");
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
          console.log("Congradulations! A Description Was Added");
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
          console.log("Congradulatons. Installation Instructions Were Added");
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
          console.log("Congradulations! User Instructions Were Added!");
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
          console.log("A License Was Added!");
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
          console.log("Other Contributors Were Added");
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
        console.log("Multiple Tests Were Added");
        questioning();
      });
    }
    function questioning() {
      fs.appendFile(
        "./dist/README.md",
        `## Questions:\n Here is a Link to my Github:  \nhttps://github.com/${res.githubUser}  \n Email:  \n${res.contact}  \nFor Any Questions or Comments\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Your Contact Info Was Added");
        }
      );
    }
  });
}

init();
