module.exports = {
  verbose: true,
  collectCoverage:true,
  collectCoverageFrom : ["src/*.{js,jsx}"],
  setupFiles: ["./__test__/rafShim.js","./__test__/jestsetup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
