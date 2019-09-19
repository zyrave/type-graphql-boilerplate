module.exports = {
  roots: [__dirname + '/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
};
