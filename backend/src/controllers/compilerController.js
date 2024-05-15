const { exec } = require("child_process");
const fs = require("fs");
const solc = require("solc");
const path = require("path");
const { solidityCompiler } = require("../views/solidityCompiler");

const compileCode = (req, res) => {
  const { code, language } = req.body;
  const fileName = language === "rust" ? "temp.rs" : "contract.sol";
  const filePath = path.join(__dirname, `../../temp/${fileName}`);
  console.log(filePath);
  if (language === "rust") fs.writeFileSync(filePath, code);

  let command;
  if (language === "rust") {
    command = `docker-compose run --rm rust-compiler`;
  } else if (language === "solidity") {
    const output = solidityCompiler(code);
    res.json({ output: output });
  } else {
    return res.status(400).json({ error: "Unsupported language" });
  }

  if (language === "rust") {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        res.json({ output: stderr });
      } else {
        res.json({ output: stdout });
      }
    });
  }
};

module.exports = { compileCode };
