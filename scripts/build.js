import { execSync } from 'child_process';

function build() {
    execSync('rollup -c');
}

build();
