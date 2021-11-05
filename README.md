# VTEX App Metadata Action

Reads metadata from a VTEX app. The action will parse the VTEX.yml file from your app and make parts of it available in environment variables.

## Usage

You can consume the action by referencing one of the existing branches. Example:

```yaml
uses: vtex/app-metadata-action@v1
```

## Contribute

### Development

Install the dependencies

```bash
yarn install
```

Run the tests :heavy_check_mark:

```bash
yarn run test
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages. This action is based in the [JavaScript Action template](https://github.com/actions/javascript-action).

### Package for distribution

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

### Create a release branch

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
