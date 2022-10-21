const fs = require('fs');
const { argv } = require('process');

export function getArgs() {
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

export function getPackageJson() {
    const packageJsonString = fs.readFileSync('./package.json', { encoding: 'utf-8' });
    return JSON.parse(packageJsonString);
}
