const utils = require('../src/utils');
const test = require('tape');

test('timing test', (t) => {
  t.ok('Im ok');
  t.ok(utils.test());

  t.end();
});
