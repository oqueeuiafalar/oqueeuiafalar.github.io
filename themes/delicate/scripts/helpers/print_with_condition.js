const { url_for } = require("hexo-util");

function printWithConditionHelper(condition = true, content, otherwise = "") {
    return !!condition ? content : otherwise;
}

module.exports = printWithConditionHelper;