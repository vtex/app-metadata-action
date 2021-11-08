const semver = require('semver')

const makeNextVersionNumber = async function (currentVersion, context) {
  return semver.inc(currentVersion, 'prepatch', getShortCommitHash(context.sha))
};

function getShortCommitHash(sha) {
  if (!sha) {
    throw new Error('contex.sha is required')
  }
  return sha.substring(0, 7)
}

module.exports = makeNextVersionNumber;
