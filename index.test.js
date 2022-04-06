const metadataExtractor = require("./metadata-extractor");
const process = require("process");
const cp = require("child_process");
const path = require("path");

const appName = "tested-vtex-manifest";
const appVersion = "0.0.1";
const commitSha = "d33ce0dbe295e1a157109d2c2c3cb8b9fd812415";
const nextAppVersionPrepatch = "0.0.2-d33ce0d.0";
const nextAppVersionPatch = "0.0.2";
const nextAppVersionPreminor = "0.1.0-d33ce0d.0";
const nextAppVersionMinor = "0.1.0";
const nextAppVersionPremajor = "1.0.0-d33ce0d.0";
const nextAppVersionMajor = "1.0.0";
const appId = "vtex.tested-vtex-manifest";
const vendorId = "vtex";
const serviceName = "api";
const serviceFolder = "./";
const frontendName = "app-ui-components";
const frontendFolder = "store-ui-components";
const serviceImageName = "vtex-docker/service-image";

let appSpecification;

const SERVICE_MODULE_KEY = 'services'
const STOREFRONT_COMPONENTS_MODULE_KEY = 'storefront-components'

beforeEach(() => {
  appSpecification = {
    name: appName,
    vendor: vendorId,
    version: appVersion,
    [STOREFRONT_COMPONENTS_MODULE_KEY]: [ { name: 'app-ui-components', folder: 'store-ui-components' } ],
    [SERVICE_MODULE_KEY]: [
      {
        name: serviceName,
        folder: serviceFolder,
        "image-name": serviceImageName,
        public: true,
      },
    ],
  };
});

describe('Metadata action', () => {
  it("read vtex.yml file and generate a pre-patch version", async () => {
    const metadata = await metadataExtractor(
        {
          sha: commitSha,
        },
        "development",
        "patch"
    );
    validateCommonFields(metadata);
    validateNextVersion(metadata, nextAppVersionPrepatch);
  });

  it("read vtex.yml file and generate a patch version", async () => {
    const metadata = await metadataExtractor(
        {
          sha: commitSha,
        },
        "unpublished",
        "patch"
    );
    validateCommonFields(metadata);
    validateNextVersion(metadata, nextAppVersionPatch);
  });

  it("read vtex.yml file and generate a pre-minor version", async () => {
    const metadata = await metadataExtractor(
        {
          sha: commitSha,
        },
        "development",
        "minor"
    );
    validateCommonFields(metadata);
    validateNextVersion(metadata, nextAppVersionPreminor);
  });

  it("read vtex.yml file and generate a minor version", async () => {
    const metadata = await metadataExtractor(
        {
          sha: commitSha,
        },
        "published",
        "minor"
    );
    validateCommonFields(metadata);
    validateNextVersion(metadata, nextAppVersionMinor);
  });

  it("read vtex.yml file and generate a pre-major version", async () => {
    const metadata = await metadataExtractor(
        {
          sha: commitSha,
        },
        "development",
        "major"
    );
    validateCommonFields(metadata);
    validateNextVersion(metadata, nextAppVersionPremajor);
  });

  it("read vtex.yml file and generate a major version", async () => {
    const metadata = await metadataExtractor(
        {
          sha: commitSha,
        },
        "published",
        "major"
    );
    validateCommonFields(metadata);
    validateNextVersion(metadata, nextAppVersionMajor);
  });

  // shows how the runner will run a javascript action with env / stdout protocol
  it.skip("test runs - Disabled because env variables are not passed when running in the Github Actions server", () => {
    process.env["GITHUB_SHA"] = commitSha;
    process.env["INPUT_VERSION-VISIBILITY"] = "development";
    process.env["INPUT_VERSION-INCREMENT-TYPE"] = "patch";
    const ip = path.join(__dirname, "index.js");
    try {
      const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
      console.log(result);
    } catch (err) {
      console.error(err.stdout.toString());
      throw err;
    }
  });

  function validateCommonFields(metadata) {
    expect(metadata.appName).toBe(appName);
    expect(metadata.currentAppVersion).toBe(appVersion);
    expect(metadata.appId).toBe(appId);
    expect(metadata.vendorId).toBe(vendorId);
    expect(metadata.serviceName).toBe(serviceName);
    expect(metadata.serviceFolder).toBe(serviceFolder);
    expect(metadata.serviceImageName).toBe(serviceImageName);
    expect(metadata.frontendName).toBe(frontendName);
    expect(metadata.frontendFolder).toBe(frontendFolder);

    expect(metadata.currentAppSpecification).toBe(
        JSON.stringify(appSpecification)
    );
  }

  function validateNextVersion(metadata, expectedNextVersion) {
    expect(metadata.nextAppVersion).toBe(expectedNextVersion);

    appSpecification.version = expectedNextVersion;
    expect(metadata.nextAppSpecification).toBe(JSON.stringify(appSpecification));
  }
})
