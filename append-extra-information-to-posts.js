const fs = require('fs');
const postsFolder = "./source/_posts";
const backupFolder = "./source/_backup";
const backupPostsPaths = fs.readdirSync(backupFolder);

const extractMetaAttribute  = (text = "", options) => {
    const pattern = new RegExp(`<meta ${options.type}=["']${options.value}["'] ${options.attribute}=["']([^"']+)["']`, "i");
    return text.match(pattern) ? text.match(pattern)[1] : null;
};

const fixAbsoluteWPContentUrl = (url = "") => {
    const configBaseUrl = "https://natalia.blog.br/"
    return url.replace(/(.+?)\/wp-content(.+?)/i, `${configBaseUrl}wp-content$2`);
};

const insertContentBeetweenCommentedTags = (text, tagName, content) => {
    return text.replace(
        new RegExp(`(#\\s<${tagName}>)[\\s\\S]+?(#\\s</${tagName}>)`, "i"),
        `$1\n${content}\n$2`
    );
};

const extraToFrontMatter = (data) => {
    const placeBeetweenQuotes = x => typeof x === "string" ? `'${x}'` : null;

    return `description: ${placeBeetweenQuotes(data.description)}
featured_image: 
  url: ${placeBeetweenQuotes(data.featuredImage.url)}
  width: ${placeBeetweenQuotes(data.featuredImage.width)}
  height: ${placeBeetweenQuotes(data.featuredImage.height)}`
};

backupPostsPaths.map(function (backupPost) {
    const backupPath = [backupFolder, backupPost].join("/");
    const html = fs.readFileSync(backupPath, {encoding:'utf8', flag:'r'}, async function(err, data) {
        return data;
    });
    const head = html.match(/<head>[\s\S]*?<\/head>/gi) ? html.match(/<head>[\s\S]*?<\/head>/)[0] : "";
    const featuredImage = extractMetaAttribute(head, {
        type: "property",
        value: "og:image",
        attribute: "content"
    });
    const featuredImageWidth = extractMetaAttribute(head, {
        type: "property",
        value: "og:image:width",
        attribute: "content"
    });
    const featuredImageHeight = extractMetaAttribute(head, {
        type: "property",
        value: "og:image:width",
        attribute: "content"
    });
    const description = extractMetaAttribute(head, {
        type: "name",
        value: "description",
        attribute: "content"
    });
    const ogDescription = extractMetaAttribute(head, {
        type: "property",
        value: "og:description",
        attribute: "content"
    });

    return {
        backupPath,
        postPath: `${postsFolder}/${backupPost}.md`,
        description: description || ogDescription,
        featuredImage: {
            url: fixAbsoluteWPContentUrl(featuredImage || ""),
            width: featuredImageWidth,
            height: featuredImageHeight
        }
    };
}).forEach(post => {
    const markdown = fs.readFileSync(post.postPath, {encoding:'utf8', flag:'r'}, async function(err, data) {
        return data;
    });
    const data = insertContentBeetweenCommentedTags(
        markdown,
        "extra",
        extraToFrontMatter(post)
    );
    fs.writeFileSync(post.postPath, data);
});
