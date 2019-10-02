/**
 * The questions to ask during the entity generation process.
 */

const entityPrompts = [
  {
    name: 'filePath',
    message: 'Enter the path to your JHipster project root directory:',
    type: 'input',
    store: true,
    default: '../',
    validate: function(resp) {
      if (resp === '' || resp === undefined) {
        console.log('Path is required')
        return false
      }
      return true
    },
  },
]

module.exports = {
  entityPrompts,
}
