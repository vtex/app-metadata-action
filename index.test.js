const metadataExtractor = require("./metadata-extractor");
const process = require("process");
const cp = require("child_process");
const path = require("path");

const appName = "tested-vtex-manifest";
const appVersion = "0.0.1";
const appId = "vtex.tested-vtex-manifest";
const vendorId = "vtex";
const serviceName = "api";
const serviceFolder = "./";
const serviceImageName = "vtex-docker/service-image";

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
  const metadata = await metadataExtractor();
  expect(metadata.appName).toBe(appName);
  expect(metadata.appVersion).toBe(appVersion);
  expect(metadata.appId).toBe(appId);
  expect(metadata.vendorId).toBe(vendorId);
  expect(metadata.appSpecification).toBe(JSON.stringify(appSpecification));
  expect(metadata.serviceName).toBe(serviceName);
  expect(metadata.serviceFolder).toBe(serviceFolder);
  expect(metadata.serviceImageName).toBe(serviceImageName);
});

// shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {
  const ip = path.join(__dirname, "index.js");
  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  console.log(result);
});
