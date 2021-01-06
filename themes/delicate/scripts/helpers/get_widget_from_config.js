function getWidgetFromConfigHelper (){
    const { config } = this;

    const configs = require("../../source/widgets/configs");

    return config.delicate.widgets.map(widget => {
        widget.template = configs[widget.name].template;
        return widget;
    });
}

module.exports = getWidgetFromConfigHelper;