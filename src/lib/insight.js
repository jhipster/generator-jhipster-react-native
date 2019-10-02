const Insight = require('insight')
const pkg = require('../../package.json')

const insight = new Insight({
  // Google Analytics tracking code
  trackingCode: 'UA-57259414-5',
  pkg,
})

/**
 * Check for opt out when generating an initial project
 */

const askForOptOut = (context = {}) => {
  const noInsight = context.parameters.options['disable-insight']

  // Ask for permission the first time
  if (insight.optOut === undefined && !noInsight) {
    insight.askPermission()
  }
}

/**
 * Tracks which options are the most popular
 *
 * Attempts to read "disable-insight" from the command line, and if not there, falls
 * back to false.  This is one way to disable the tracking after opting-in.
 *
 *   $ ignite new CustomApp -b jhipster --disable-insight
 *
 * @param {*} context - The gluegun context.
 * @param {*} props - The template options.
 */

const trackAppOptions = (context = {}, props) => {
  const noInsight = context.parameters.options['disable-insight']
  if (!noInsight) {
    insight.trackEvent({ category: 'generator', action: 'app' })
    insight.track('app/igniteVersion', props.igniteVersion)
    insight.track('app/igniteJhipsterVersion', pkg.version)
    insight.track('app/reactNativeVersion', props.reactNativeVersion)
    insight.track('app/searchEngine', props.searchEngine)
    insight.track('app/authType', props.authType)
    insight.track('app/websockets', props.websockets)
  }
}

const trackGenerator = (context = {}, generatorName) => {
  const noInsight = context.parameters.options['disable-insight']
  if (!noInsight) {
    insight.trackEvent({ category: 'generator', action: generatorName })
  }
}
// i18n: params.i18n
module.exports = {
  insight,
  askForOptOut,
  trackAppOptions,
  trackGenerator,
}
