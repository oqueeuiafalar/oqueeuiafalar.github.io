const addLazyLoadingToImageTag = content => content.replace(/<img\b/gi, '<img loading=\'lazy\'')
const prependSiteUrlToImageSrc = (content, config) => {
    return content.replace(/<img\b([^>]+)src=(["'])([^'"]+)(["'])/gi, `<img $1src=$2${config.url}$3$4`)
};

hexo.extend.filter.register('after_post_render', function(data) {
    const { config } = this;
    data.content = addLazyLoadingToImageTag(data.content);
    data.content = prependSiteUrlToImageSrc(data.content, config);
    return data;
});

hexo.extend.helper.register("replaceClasses", function(classesMap, data) {
    return Object.keys(classesMap).reduce(function(replaceData, key) {
        const pattern = new RegExp(`(class=["'])${key}?(["'])`, "gi");
        replaceData = replaceData.replace(pattern, `$1${classesMap[key]}$2`);
        return replaceData;
    }, data);
});

hexo.extend.helper.register("getWidgetByName", function(widgetName) {
    const { config } = this;
    const widgets = config.delicate.widgets;
    return widgets.find(widget => widget.name === widgetName || {});
});

hexo.extend.helper.register("getWidgetsFromConfig", function(){
    const { config } = this;

    const configs = require("../source/widgets/configs");

    return config.delicate.widgets.map(widget => {
        widget.template = configs[widget.name].template;
        return widget;
    });
});
