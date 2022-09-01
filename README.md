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
      - run: yarn install --frozen-lockfile
      - run: node ./scripts/publish repositoryName={repository_name} serviceName={service_name} version={version} buildNumber={buildNumber} environment={environment}
```

Example of the node script standalone:
```cmd
node ./scripts/publish repositoryName=gcc-identity serviceName=identity version=0.0.1 buildNumber=42069 environment=test
```