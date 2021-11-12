const semver = require("semver");

const ACCEPTED_VERSION_INCREMENT_TYPES = ["major", "minor", "patch"];
const ACCEPTED_APP_RELEASE_TYPES = ["development", "unpublished", "published"];

const makeNextVersionNumber = async function (
  currentVersion,
  githubContext,
  appReleaseType,
  versionIncrementType
) {
  validateArguments(
    currentVersion,
    githubContext,
    appReleaseType,
    versionIncrementType
  );

  const versionPrefix = appReleaseType === "development" ? "pre" : "";

  return semver.inc(
    currentVersion,
    `${versionPrefix}${versionIncrementType}`,
    getShortCommitHash(githubContext.sha)
  );
};

function validateArguments(
  currentVersion,
  githubContext,
  appReleaseType,
  versionIncrementType
) {
  if (semver.valid(currentVersion) === null) {
    throw new Error(`Invalid version number: ${currentVersion}`);
  }

  if (!githubContext || !githubContext.sha) {
    throw new Error("contex.sha is required");
  }

  if (!ACCEPTED_VERSION_INCREMENT_TYPES.includes(versionIncrementType)) {
    throw new Error(
      `versionIncrementType must be one of ${ACCEPTED_VERSION_INCREMENT_TYPES.join(
        ", "
      )} (provided value is ${versionIncrementType})`
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
