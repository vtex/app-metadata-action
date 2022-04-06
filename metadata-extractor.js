const { promises: fs } = require("fs");
const yaml = require("js-yaml");
const makeNextVersionNumber = require("./app-version-factory");

const SERVICE_MODULE_KEY = 'services'
const STOREFRONT_COMPONENTS_MODULE_KEY = 'storefront-components'

const vtexMetadataFilePath = "./vtex.yml";

const metadataExtractor = async function (
  context,
  appVersionVisibility,
  versionIncrementType
) {
  const content = await fs.readFile(vtexMetadataFilePath, "utf8");
  const appSpecification = yaml.load(content);

  const nextVersionNumber = await makeNextVersionNumber(
    appSpecification.version,
    context,
    appVersionVisibility,
    versionIncrementType
  );
  const nextAppSpecification = Object.assign({}, appSpecification);
  nextAppSpecification.version = nextVersionNumber;

  const metadata = {
    appName: appSpecification.name,
    currentAppVersion: appSpecification.version,
    nextAppVersion: nextVersionNumber,
    appId: `${appSpecification.vendor}.${appSpecification.name}`,
    vendorId: appSpecification.vendor,
    currentAppSpecification: JSON.stringify(appSpecification),
    nextAppSpecification: JSON.stringify(nextAppSpecification),
  };

  if (appSpecification[SERVICE_MODULE_KEY] && appSpecification[SERVICE_MODULE_KEY].length > 0) {
    // TODO get all services, not only first
    const service = appSpecification[SERVICE_MODULE_KEY][0];
    metadata.serviceName = service.name;
    metadata.serviceFolder = service.folder;
    metadata.serviceImageName = service["image-name"];
  }

  if (appSpecification[STOREFRONT_COMPONENTS_MODULE_KEY] && appSpecification[STOREFRONT_COMPONENTS_MODULE_KEY].length > 0) {
    // TODO get all fronts, not only first
    const component = appSpecification[STOREFRONT_COMPONENTS_MODULE_KEY][0];
    metadata.frontendName = component.name;
    metadata.frontendFolder = component.folder;
  }
  return metadata;
};

module.exports = metadataExtractor;
