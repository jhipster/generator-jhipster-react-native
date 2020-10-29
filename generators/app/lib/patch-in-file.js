const jetpack = require('fs-jetpack');

const fs = {
    copy: jetpack.copy,
    remove: jetpack.remove,
    read: jetpack.read,
    write: jetpack.write,
    exists: jetpack.exists,
    append: jetpack.append,
    appendAsync: jetpack.appendAsync,
};

/**
/**
 * Inserts a given bit of content to a given file at a matched location
 */
const insertInFile = (filePath, findPattern, content, insertAfter = true) => {
    // read full file - Not a great idea if we ever touch large files
    const data = fs.read(filePath, 'utf8');
    let newContents = '';
    // get the full line of first occurance
    const finder = new RegExp(`.*${findPattern}.*`, '');
    const matches = data.match(finder);
    // Quick error check
    if (matches === null) throw new Error(`'${findPattern}' was not found in file ${filePath}.`);
    if (insertAfter) {
        newContents = data.replace(finder, `${matches[0]}\n${content}`);
    } else {
        newContents = data.replace(finder, `${content}\n${matches[0]}`);
    }
    // overwrite file with modified contents
    fs.write(filePath, newContents);
};
/**
 * Conditionally places a string into a file before or after another string.
 *
 * @example
 *   patchInFile('thing.js', { before: 'bar', insert: 'foo' })
 *
 */
function patchInFile(file, opts) {
    console.warn(`USING DEPRECATED PATCH METHOD on ${file}`);
    try {
        if (!fs.exists(file)) return;
        const data = fs.read(file, 'utf8');
        // If the file already has insert, no-op unless forced
        // stops accidental double inserts unless you're sure you want that
        if (data.includes(opts.insert) && !opts.force) return;
        // delete <string> is the same as replace <string> + insert ''
        const replaceString = opts.delete || opts.replace;
        const newString = opts.insert || '';
        if (replaceString) {
            if (data.includes(replaceString)) {
                // Replace matching string with new string
                const newContents = data.replace(replaceString, `${newString}`);
                fs.write(file, newContents, { atomic: true });
            } else {
                console.warn(`${replaceString} not found`);
            }
        } else {
            // Insert before/after a particular string
            insertInFile(file, opts.before || opts.after, newString, !!opts.after);
        }
    } catch (e) {
        console.warn(`Could not find insertion point in ${file}:\n${opts.before}`);
    }
}

module.exports = {
    patchInFile,
};
