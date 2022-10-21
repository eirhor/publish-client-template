const { execSync } = require('child_process');

function build() {
    execSync('rollup -c');
}

build();
