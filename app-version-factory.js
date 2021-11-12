const semver = require("semver");

const ACCEPTED_VERSION_INCREMENT_SCOPES = ["major", "minor", "patch"];
const ACCEPTED_APP_RELEASE_TYPES = ["development", "unpublished", "published"];

const makeNextVersionNumber = async function (
  currentVersion,
  githubContext,
  appReleaseType,
  versionIncrementScope
) {
  validateArguments(
    currentVersion,
    githubContext,
    appReleaseType,
    versionIncrementScope
  );

  const versionPrefix = appReleaseType === "development" ? "pre" : "";

  return semver.inc(
    currentVersion,
    `${versionPrefix}${versionIncrementScope}`,
    getShortCommitHash(githubContext.sha)
  );
};

function validateArguments(
  currentVersion,
  githubContext,
  appReleaseType,
  versionIncrementScope
) {
  if (semver.valid(currentVersion) === null) {
    throw new Error(`Invalid version number: ${currentVersion}`);
  }

  if (!githubContext || !githubContext.sha) {
    throw new Error("contex.sha is required");
  }

  if (!ACCEPTED_VERSION_INCREMENT_SCOPES.includes(versionIncrementScope)) {
    throw new Error(
      `versionIncrementScope must be one of ${ACCEPTED_VERSION_INCREMENT_SCOPES.join(
        ", "
      )} (provided value is ${versionIncrementScope})`
    );
  }

  if (!ACCEPTED_APP_RELEASE_TYPES.includes(appReleaseType)) {
    throw new Error(
      `appReleaseType must be one of ${ACCEPTED_APP_RELEASE_TYPES.join(
        ", "
      )} (provided value is ${appReleaseType})`
    );
  }
}

function getShortCommitHash(sha) {
  return sha.substring(0, 7);
}

module.exports = makeNextVersionNumber;
