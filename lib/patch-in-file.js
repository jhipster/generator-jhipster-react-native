/**
/**
 * Inserts a given bit of content to a given file at a matched location
 */
const insertInFile = (filePath, findPattern, content, insertAfter, context) => {
  // read full file - Not a great idea if we ever touch large files
  const data = context.fs.read(filePath, 'utf8');
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
  context.fs.write(filePath, newContents);
};
/**
 * Conditionally places a string into a file before or after another string.
 *
 * @example
 *   patchInFile('thing.js', { before: 'bar', insert: 'foo' })
 *
 */
function patchInFile(file, opts) {
  // console.warn(`USING DEPRECATED PATCH METHOD on ${file}`);
  try {
    if (!this.fs.exists(file)) return;
    const data = this.fs.read(file, 'utf8');
    // If the file already has insert, no-op unless forced
    // stops accidental double inserts unless you're sure you want that
    const dataWithoutWhitespace = data.replace(/\s+/g, '');
    const insertWithoutWhitespace = opts.insert.replace(/\s+/g, '');
    const ignoreIfContains = opts.ignoreIfContains ? opts.ignoreIfContains.replace(/\s+/g, '') : 'unfindableStringToIgnore0911';

    if (!opts.force && (dataWithoutWhitespace.includes(insertWithoutWhitespace) || dataWithoutWhitespace.includes(ignoreIfContains))) {
      this.debug(`Skipped patching of ${file}, content already in file`);
      return;
    }
    // delete <string> is the same as replace <string> + insert ''
    const replaceString = opts.delete || opts.replace;
    const newString = opts.insert || '';
    if (replaceString) {
      if (data.includes(replaceString)) {
        // Replace matching string with new string
        const newContents = data.replace(replaceString, `${newString}`);
        this.fs.write(file, newContents, { atomic: true });
      } else {
        console.warn(`${replaceString} not found`);
      }
    } else {
      // Insert before/after a particular string
      insertInFile(file, opts.before || opts.after, newString, !!opts.after, this);
    }
  } catch (e) {
    console.warn(`Could not find insertion point in ${file}:\n${opts.before}`);
  }
}

export {
  patchInFile,
};
