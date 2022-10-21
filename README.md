# Actions setup

```yaml
jobs:
    name:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/cache@v2
              with:
                  path: '**/node_modules'
                  key: ${{ runner.os }}-modules-${{ hashFiles('**/yarn.lock') }}
            - uses: actions/setup-node@v2
              with:
                  node-version: '16'
                  cache: 'yarn'
            - run: node ./scripts/setup repositoryName={repository_name} serviceName={service_name} version={version} buildNumber={buildNumber} environment={environment}
            - run: yarn install --frozen-lockfile
            - run: node ./scripts/build
            - run: node ./scripts/publish
```

Example of the node scripts standalone:

1 - Setup

```cmd
node ./scripts/setup repositoryName=gcc-identity serviceName=identity version=0.0.1 buildNumber=42069 environment=test
```

2 - Build

```cmd
node ./scripts/build
```

3 - Publish

```cmd
node ./scripts/publish
```
