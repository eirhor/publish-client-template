const { execSync } = require('child_process');
const { getPackageJson } = require('./_shared');

function publish() {
    const packageJson = getPackageJson();

    execSync(`yarn publish --new-version ${packageJson.version}`);
}

publish();
