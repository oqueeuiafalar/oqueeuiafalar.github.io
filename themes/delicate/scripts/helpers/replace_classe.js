function replaceClassesHelper(classesMap, data) {
    return Object.keys(classesMap).reduce(function(replaceData, key) {
        const pattern = new RegExp(`(class=["'])${key}?(["'])`, "gi");
        replaceData = replaceData.replace(pattern, `$1${classesMap[key]}$2`);
        return replaceData;
    }, data);
}
module.exports = replaceClassesHelper;