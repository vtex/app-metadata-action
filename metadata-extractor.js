const { promises: fs } = require('fs')
const yaml = require("js-yaml")

const vtexMetadataFilePath = './vtex.yml'

const metadataExtractor = async function () {
  const content = await fs.readFile(vtexMetadataFilePath, 'utf8')
  const appSpecification = yaml.load(content)
  const metadata = {
    appName: appSpecification.name,
    appVersion: appSpecification.version,
    appId: `${appSpecification.vendor}.${appSpecification.name}`,
    vendorId: appSpecification.vendor,
    appSpecification: JSON.stringify(appSpecification),
  }
  if (appSpecification.services && appSpecification.services.length > 0) {
    // TODO get all services, not only first
    const service = appSpecification.services[0]
    metadata.serviceName = service.name
    metadata.serviceFolder = service.folder
    metadata.serviceImageName = service['image-name']
  }
  return metadata
};

module.exports = metadataExtractor;
