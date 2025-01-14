const rootConfig = require("../../packages/config/prettier-preset");

module.exports = {
  ...rootConfig,
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  parserPlugins: ["decorators", "decorators-legacy", "typescript"]
};
