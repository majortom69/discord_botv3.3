// goofy ahhh file loader by major_tom69 2/18/2023
//updated 3/14/2023

const { glob } = require("glob");
const path = require("path");

async function deleteCachedFile(file) {
    const filePath = path.resolve(file);
    if (require.cache[filePath]) {
        delete require.cache[filePath];
    }
}

async function loadFiles(dirName) {
    try {
        const files = await glob(path.join(process.cwd(), dirName, "**/*.js").replace(/\\/g, "/"));
        const jsFiles = files.filter(file => path.extname(file) === '.js');
        await Promise.all(jsFiles.map(deleteCachedFile));
        return jsFiles;

    } catch (error) {
        console.error(`error loading files from dir ${dirName} : ${error} `);
        throw error;

    }
}

module.exports = { loadFiles };