const solc = require("solc");
function solidityCompiler(code) {
  const input = {
    language: "Solidity",
    sources: {
      "test.sol": {
        content: `${code}`,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  var output = JSON.parse(solc.compile(JSON.stringify(input)));
  return output;
}

module.exports = { solidityCompiler };
