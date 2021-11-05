const core = require('@actions/core')
const metadataExtractor = require('./metadata-extractor')

async function run() {
  try {
    const metadata = await metadataExtractor()
    core.info(`Exported metadata: ${JSON.stringify(metadata, null, 2)}`)
    core.setOutput('app-name', metadata.appName)
    core.setOutput('app-version', metadata.appVersion)
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
