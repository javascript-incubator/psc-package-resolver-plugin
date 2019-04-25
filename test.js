const spawn = require('@ahmadnassri/spawn-promise');
const test = require('ava');

test('Build is running fine', t => {
  return spawn('yarn', ['build'], { stdio: 'inherit', cwd: process.cwd(), env: process.env })
    .then(_ => t.pass())
    .catch(_e => {
      console.log(_e);
      t.fail();
    });
});
