const fs = require('fs');

const { getArgs, getPackageJson } = require('./_shared');

function setup() {
    const { serviceName, buildNumber, repositoryName, environment, version } = getArgs();

    const packageJson = getPackageJson();

    packageJson.name = packageJson.name.replace('{0}', serviceName);
    packageJson.repository.url = packageJson.repository.url.replace('{0}', repositoryName);
    packageJson.bugs.url = packageJson.bugs.url.replace('{0}', repositoryName);
    packageJson.homepage = packageJson.homepage.replace('{0}', repositoryName);

    if (environment.toLowerCase() === 'test') {
        packageJson.version = `${version}-alpha.${buildNumber}`;
    } else {
        packageJson.version = `${version}-${buildNumber}`;
    }

    fs.writeFileSync('./package.json', JSON.stringify(packageJson), { encoding: 'utf-8' });
}

setup();
