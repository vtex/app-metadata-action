const metadataExtractor = require("./metadata-extractor")
const process = require("process")
const cp = require("child_process")
const path = require("path")

const appName = "tested-vtex-manifest"
const appVersion = "0.0.1"
const commitSha = 'd33ce0dbe295e1a157109d2c2c3cb8b9fd812415'
const nextAppVersion = "0.0.2-d33ce0d.0"
const appId = "vtex.tested-vtex-manifest"
const vendorId = "vtex"
const serviceName = "api"
const serviceFolder = "./"
const serviceImageName = "vtex-docker/service-image"

const appSpecification = {
  name: appName,
  vendor: vendorId,
  version: appVersion,
  services: [
    {
      name: serviceName,
      folder: serviceFolder,
      "image-name": serviceImageName,
      public: true,
    },
  ],
};

test("read vtex.yml file", async () => {
  const metadata = await metadataExtractor({
    sha: commitSha,
  });
  expect(metadata.appName).toBe(appName)
  expect(metadata.currentAppVersion).toBe(appVersion)
  expect(metadata.nextAppVersion).toBe(nextAppVersion)
  expect(metadata.appId).toBe(appId)
  expect(metadata.vendorId).toBe(vendorId)
  expect(metadata.serviceName).toBe(serviceName)
  expect(metadata.serviceFolder).toBe(serviceFolder)
  expect(metadata.serviceImageName).toBe(serviceImageName)

  expect(metadata.currentAppSpecification).toBe(JSON.stringify(appSpecification))
  appSpecification.version = nextAppVersion
  expect(metadata.nextAppSpecification).toBe(JSON.stringify(appSpecification))
});

// shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {
  const ip = path.join(__dirname, "index.js");
  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  console.log(result);
});
