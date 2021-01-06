const { url_for } = require("hexo-util");

function printTagsWithTemplateHelper(tags = [], template = "<li><a href=\"{tag.path}\">{tag.name}</a></li>") {
    return tags.map(tag => {
        return template
            .replace("{tag.path}",  url_for.call(this, tag.path))
            .replace("{tag.name}",  tag.name);
    }).join("\n");
}

module.exports = printTagsWithTemplateHelper;