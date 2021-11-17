const semver = require("semver");

const ACCEPTED_VERSION_INCREMENT_TYPES = ["major", "minor", "patch"];
const ACCEPTED_APP_VERSION_VISIBILITIES = ["development", "unpublished", "published"];

const makeNextVersionNumber = async function (
  currentVersion,
  githubContext,
  appVersionVisibility,
  versionIncrementType
) {
  validateArguments(
    currentVersion,
    githubContext,
    appVersionVisibility,
    versionIncrementType
  );

  const versionPrefix = appVersionVisibility === "development" ? "pre" : ""

  return semver.inc(
    currentVersion,
    `${versionPrefix}${versionIncrementType}`,
    getShortCommitHash(githubContext.sha)
  );
};

function validateArguments(
  currentVersion,
  githubContext,
  appVersionVisibility,
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

  if (!ACCEPTED_APP_VERSION_VISIBILITIES.includes(appVersionVisibility)) {
    throw new Error(
      `appVersionVisibility must be one of ${ACCEPTED_APP_VERSION_VISIBILITIES.join(
        ", "
      )} (provided value is ${appVersionVisibility})`
    );
  }
}

function getShortCommitHash(sha) {
  return sha.substring(0, 7);
}

module.exports = makeNextVersionNumber;
