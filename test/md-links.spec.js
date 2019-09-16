const mdLnksUtls = require('../src/mdLinks.js');

//  read de path
describe('validateFileMd', () => {
  it('should be validateFileMd a function', () => {
    expect(typeof mdLnksUtls.validateFileMd).toEqual('function');
  });
});

// directory or file
describe('directoryOrFile', () => {
  it('should be directoryOrFile a function', () => {
    expect(typeof mdLnksUtls.directoryOrFile).toEqual('function');
  });
});

test('Show name of file', () => {
  mdLnksUtls.directoryOrFile('prueba.md').then(result => {
    expect(result).toBe(Promise);
  });
});

test('Show name of a directory', () => {
  mdLnksUtls.directoryOrFile('prueba.md').then(result => {
    expect(result).toBe(Promise);
  });
});

// get links
describe('getLinks', () => {
  it('should be getLinks a function', () => {
    expect(typeof mdLnksUtls.getLinks).toEqual('function');
  });
});
// read complete path
describe(' readCompletePath', () => {
  it('should be  readCompletePath a function', () => {
    expect(typeof mdLnksUtls.readCompletePath).toEqual('function');
  });
});
// path Status
describe('readPathStatus', () => {
  it('should be readPathStatus a function', () => {
    expect(typeof mdLnksUtls.readPathStatus).toEqual('function');
  });
});
// stats
describe('functionStats', () => {
  it('should be functionStats a function', () => {
    expect(typeof mdLnksUtls.functionStats).toEqual('function');
  });
});
// validate and stats
describe('validateAndStats', () => {
  it('should be validateAndStats a function', () => {
    expect(typeof mdLnksUtls.validateAndStats).toEqual('function');
  });
});
// menu
describe('menuOptions', () => {
  it('should be menuOptions a function', () => {
    expect(typeof mdLnksUtls.menuOptions).toEqual('function');
  });
});





