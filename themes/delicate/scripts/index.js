// ## Helpers
hexo.extend.filter.register("after_post_render", require("./helpers/after_post_render"));
hexo.extend.helper.register("replace_classes", require("./helpers/replace_classe"));
hexo.extend.helper.register("get_widgets_from_config", require("./helpers/get_widget_from_config"));
hexo.extend.helper.register("print_tags_with_template", require("./helpers/print_tags_with_template"));
hexo.extend.helper.register("print_categories_with_template", require("./helpers/print_categories_with_template"));
hexo.extend.helper.register("print_with_condition", require("./helpers/print_with_condition"));