import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // verbose: true,
  // debug: true,
  schema: './schema.graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    'src/__apolloGenerated__/': {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;
