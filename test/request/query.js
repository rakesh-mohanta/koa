
var context = require('../context');

describe('ctx.query', function(){
  describe('when missing', function(){
    it('should return an empty object', function(){
      var ctx = context({ url: '/' });
      ctx.query.should.eql({});
    })
  })

  it('should return a parsed query-string', function(){
    var ctx = context({ url: '/?page=2' });
    ctx.query.page.should.equal('2');
  })
})

describe('ctx.query=', function(){
  it('should stringify and replace the querystring and search', function(){
    var ctx = context({ url: '/store/shoes' });
    ctx.query = { page: 2, color: 'blue' };
    ctx.url.should.equal('/store/shoes?page=2&color=blue');
    ctx.querystring.should.equal('page=2&color=blue');
    ctx.search.should.equal('?page=2&color=blue')
  })

  it('should change .url but not .originalUrl', function(){
    var ctx = context({ url: '/store/shoes' });
    ctx.query = { page: 2 };
    ctx.url.should.equal('/store/shoes?page=2');
    ctx.originalUrl.should.equal('/store/shoes');
    ctx.request.originalUrl.should.equal('/store/shoes');
  })
})