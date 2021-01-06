function svgIconHelper(icon, prefix = "fas", size = "normal") {
    const sizeToWith = {
        "normal": 22
    };
    return this.fa_inline(icon, {prefix})[0]
        .replace("<svg ", `<svg style="font-size:1em;width:${sizeToWith[size] || sizeToWith.normal }px;" `);
}

module.exports = svgIconHelper;