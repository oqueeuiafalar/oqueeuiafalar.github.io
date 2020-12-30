const fs = require('fs');
const postsFolder = "./source/_posts";
const backupFolder = "./source/_backup";
const backupPostsPaths = fs.readdirSync(backupFolder);

const extractMetaAttribute  = (text = "", options) => {
    const pattern = new RegExp(`<meta ${options.type}=["']${options.value}["'] ${options.attribute}=["']([^"']+)["']`, "i");
    return text.match(pattern) ? text.match(pattern)[1] : null;
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
        description: description || ogDescription,
        featuredImage: {
            url: featuredImage,
            width: featuredImageWidth,
            height: featuredImageHeight
        }
    };
}).forEach(post => {
    console.log(post);
});