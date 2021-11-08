const core = require('@actions/core')
const github = require('@actions/github')
const metadataExtractor = require('./metadata-extractor')

async function run() {
  try {
    const metadata = await metadataExtractor(github.context.payload)
    core.info(`Exported metadata: ${JSON.stringify(metadata, null, 2)}`)
    core.setOutput('app-name', metadata.appName)
    core.setOutput('current-app-version', metadata.currentAppVersion)
    core.setOutput('next-app-version', metadata.nextAppVersion)
    core.setOutput('app-id', metadata.appId)
    core.setOutput('vendor-id', metadata.vendorId)
    core.setOutput('app-specification', metadata.appSpecification)
    core.setOutput('service-name', metadata.serviceName)
    core.setOutput('service-folder', metadata.serviceFolder)
    core.setOutput('service-image-name', metadata.serviceImageName)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
