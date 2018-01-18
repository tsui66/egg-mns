'use strict';

const mock = require('egg-mock');

describe('test/mns.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mns-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mns')
      .expect(200);
  });
});
