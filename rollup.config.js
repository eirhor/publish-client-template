import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    external: [...Object.keys(packageJson.dependencies ?? {})],
    plugins: [
        del({ targets: 'dist/*' }),
        peerDepsExternal(),
        resolve(),
        commonjs({}),
        typescript({ useTsconfigDeclarationDir: true, check: true }),
        uglify(),
    ],
};
