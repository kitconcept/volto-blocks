module.exports = {
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  roots: ['<rootDir>/../src/'],
  transformIgnorePatterns: ['node_modules/(?!(volto-slate|@plone/volto)/)'],
  moduleNameMapper: {
    '@plone/volto/cypress': '<rootDir>/node_modules/@plone/volto/cypress',
    '@plone/volto/babel': '<rootDir>/node_modules/@plone/volto/babel',
    '@plone/volto/(.*)$': '<rootDir>/node_modules/@plone/volto/src/$1',
    '@package/(.*)$': '<rootDir>/src/$1',
    '@kitconcept/volto-blocks/(.*)$':
      '<rootDir>/src/addons/volto-blocks/src/$1',
    'volto-slate/(.*)$': '<rootDir>/node_modules/volto-slate/src/$1',
    '~/(.*)$': '<rootDir>/src/$1',
    'load-volto-addons':
      '<rootDir>/node_modules/@plone/volto/jest-addons-loader.js',
  },
  transform: {
    '^.+\\.js(x)?$': 'babel-jest',
    '^.+\\.css$': 'jest-css-modules',
    '^.+\\.less$': 'jest-css-modules',
    '^.+\\.scss$': 'jest-css-modules',
    '^.+\\.(png)$': 'jest-file',
    '^.+\\.(jpg)$': 'jest-file',
    '^.+\\.(svg)$': './node_modules/@plone/volto/jest-svgsystem-transform.js',
  },
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
};
