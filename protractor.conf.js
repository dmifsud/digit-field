exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['digit.field.e2e.js'],
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }]
};
