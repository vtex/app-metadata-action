const semver = require('semver')

const makeNextVersionNumber = async function (currentVersion, context) {
  return semver.inc(currentVersion, 'prepatch', getShortCommitHash(context.sha))
};

function getShortCommitHash(sha) {
  return sha ? sha.substring(0, 7) : ''
}

module.exports = makeNextVersionNumber;
