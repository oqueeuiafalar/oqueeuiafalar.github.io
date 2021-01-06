// https://stackoverflow.com/a/4403189
function minimizeData( _content ) {
    var content = _content;
    content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
    // now all comments, newlines and tabs have been removed
    content = content.replace( / {2,}/g, ' ' );
    // now there are no more than single adjacent spaces left
    // now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
    content = content.replace( / ([{:}]) /g, '$1' );
    content = content.replace( /([;,]) /g, '$1' );
    content = content.replace( / !/g, '!' );
    return content;
}

function afterRenderHelper(html) {
    const styleTagPattern = /<style>[\s\S]+?<\/style>/g;
    const styleTags = minimizeData((html.match(styleTagPattern) || []).join("\n"));
    html = html.replace(styleTagPattern, "");
    html = html.replace("</head>", `${styleTags}\n</head>`);
    return html;
}

module.exports = afterRenderHelper;