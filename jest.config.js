module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  setupFiles: ["./__test__/shims.js", "./__test__/jestsetup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
