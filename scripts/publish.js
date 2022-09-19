const fs = require('fs');
const { argv } = require('process');
const { execSync } = require('child_process');

function getArgs() {
    let repositoryName;
    let serviceName;
    let version;
    let buildNumber;
    let environment;

    argv.forEach((v) => {
        if (v.startsWith('repositoryName=')) {
            repositoryName = v.split('=')[1];
        }
        if (v.startsWith('serviceName=')) {
            serviceName = v.split('=')[1];
        }
        if (v.startsWith('version=')) {
            version = v.split('=')[1];
        }
        if (v.startsWith('buildNumber=')) {
            buildNumber = v.split('=')[1];
        }
        if (v.startsWith('environment=')) {
            environment = v.split('=')[1];
        }
    });

    if (!repositoryName) {
        throw new Error('repositoryName must have a value');
    }
    if (!serviceName) {
        throw new Error('serviceName must have a value');
    }
    if (!version) {
        throw new Error('version must have a value');
    }
    if (!buildNumber) {
        throw new Error('buildNumber must have a value');
    }
    if (!environment) {
        throw new Error('environment must have a value');
    }

    return {
        repositoryName,
        serviceName,
        version,
        buildNumber,
        environment,
    };
}

function getPackageJson() {
    const packageJsonString = fs.readFileSync('./package.json', { encoding: 'utf-8' });
    return JSON.parse(packageJsonString);
}

function setup() {
    const { serviceName, buildNumber, repositoryName, environment, version } = getArgs();

    const packageJson = getPackageJson();

    packageJson.name = packageJson.name.replace('{0}', serviceName);
    packageJson.repository.url = packageJson.repository.url.replace('{0}', repositoryName);
    packageJson.bugs.url = packageJson.bugs.url.replace('{0}', repositoryName);
    packageJson.homepage = packageJson.homepage.replace('{0}', repositoryName);

    if (environment.toLowerCase() === 'test') {
        packageJson.version = `${version}-alpha.${buildNumber}`;
    } else if (environment.toLowerCase() === 'staging') {
        packageJson.version = `${version}-rc.${buildNumber}`;
    } else {
        packageJson.version = version;
    }

    fs.writeFileSync('./package.json', JSON.stringify(packageJson), { encoding: 'utf-8' });
}

function build() {
    execSync('rollup -c');
}

function publish() {
    const packageJson = getPackageJson();

    execSync(`yarn publish --new-version ${packageJson.version}`);
}

setup();
build();
publish();
