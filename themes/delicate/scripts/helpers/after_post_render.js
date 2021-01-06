const addLazyLoadingToImageTag = content => content.replace(/<img\b/gi, '<img loading=\'lazy\'')
const prependSiteUrlToImageSrc = (content, config) => {
    return content.replace(/<img\b([^>]+)src=(["'])([^'"]+)(["'])/gi, `<img $1src=$2${config.url}$3$4`)
};

function afterPostRenderHelper(data) {
    const { config } = this;
    data.content = addLazyLoadingToImageTag(data.content);
    data.content = prependSiteUrlToImageSrc(data.content, config);
    return data;
}

module.exports = afterPostRenderHelper;