const { promises: fs } = require("fs");
const yaml = require("js-yaml");
const makeNextVersionNumber = require("./app-version-factory");

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

  if (appSpecification.services && appSpecification.services.length > 0) {
    // TODO get all services, not only first
    const service = appSpecification.services[0];
    metadata.serviceName = service.name;
    metadata.serviceFolder = service.folder;
    metadata.serviceImageName = service["image-name"];
  }
  return metadata;
};

module.exports = metadataExtractor;
