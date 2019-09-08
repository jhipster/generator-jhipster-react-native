// wrapped version of ignite's copyBatch to run prettier on files before generation
const { prettierTransformBatch } = require('./prettier-transform')
const copyBatch = async (context, files, props, copyBatchOptions) => {
  const { ignite, print } = context
  try {
    await ignite.copyBatch(context, files, props, copyBatchOptions)
  } catch (e) {
    print.warning('Could not copy files, error:')
    print.error(e)
  }
  try {
    await prettierTransformBatch(files)
  } catch (e) {
    print.warning('Could not run prettier on files, error:')
    print.error(e)
  }
}

module.exports = {
  copyBatch,
}
