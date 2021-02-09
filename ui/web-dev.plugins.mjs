import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupReplace from '@rollup/plugin-replace';

const replace = fromRollup(rollupReplace);
const commonjs = fromRollup(rollupCommonjs);

export default [
  replace({
    'process.env.NODE_ENV': '"production"',
    'process.env.CONDUCTOR_URL': `"${process.env.CONDUCTOR_URL}"`,
  }),
  commonjs({
    include: [
      'node_modules/isomorphic-ws/**/*',
      'node_modules/@msgpack/**/*',
      'node_modules/@holochain/conductor-api/**/*'
    ],
  }),
];
