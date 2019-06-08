module.exports = {
  verbose: true,
  collectCoverage:true,
  collectCoverageFrom : ["src/**/*.js"],
  setupFiles: ["./__test__/rafShim.js","./__test__/jestsetup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
