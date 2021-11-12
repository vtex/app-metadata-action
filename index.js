const core = require('@actions/core')
const github = require('@actions/github')
const metadataExtractor = require('./metadata-extractor')

async function run() {
  try {
    const appReleaseType = core.getInput("release-type");
    const versionIncrementScope = core.getInput("version-increment-scope");
    const metadata = await metadataExtractor(github.context, appReleaseType, versionIncrementScope);
    core.info(`Exported metadata: ${JSON.stringify(metadata, null, 2)}`)
    core.setOutput('app-name', metadata.appName)
    core.setOutput('current-app-version', metadata.currentAppVersion)
    core.setOutput('next-app-version', metadata.nextAppVersion)
    core.setOutput('app-id', metadata.appId)
    core.setOutput('vendor-id', metadata.vendorId)
    core.setOutput('current-app-specification', metadata.currentAppSpecification)
    core.setOutput('next-app-specification', metadata.nextAppSpecification)
    core.setOutput('service-name', metadata.serviceName)
    core.setOutput('service-folder', metadata.serviceFolder)
    core.setOutput('service-image-name', metadata.serviceImageName)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
