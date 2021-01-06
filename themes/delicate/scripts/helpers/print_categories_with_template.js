const { url_for } = require("hexo-util");

function printCategoriesWithTemplateHelper(categories = [], template = "<li><a href=\"{category.path}\">{category.name}</a></li>") {
    return categories.map(category => {
        return template
            .replace("{category.path}",  url_for.call(this, category.path))
            .replace("{category.name}",  category.name);
    }).join("\n");
}

module.exports = printCategoriesWithTemplateHelper;