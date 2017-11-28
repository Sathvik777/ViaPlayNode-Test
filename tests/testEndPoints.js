process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


describe('/POST url Positive', () => {
      it('it should POST URL and return youtube url', (done) => {
        let requestBody = {
            "url" : "https://content.viaplay.se/pc-se/film/arrival-2016"
        }
        chai.request(server)
            .post('/viaplay-trailer-gen/url')
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('youtubeTrailerLink');
              done();
            });
      });
 });



describe('/POST url Negative', () => {
    it('it should POST URL and NOT return youtube url', (done) => {
      let requestBody = {
          "url" : ""
      }
      chai.request(server)
          .post('/viaplay-trailer-gen/url')
          .send(requestBody)
          .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
            done();
          });
    });
});

describe('/POST url To test if response value is correct', () => {
    it('should return Arrival Trailer link', (done) => {
        let requestBody = {
            "url" : "https://content.viaplay.se/pc-se/film/arrival-2016"
        }
        let expectedvalue = "https://www.youtube.com/watch?v=gwqSi_ToNPs";
      chai.request(server)
          .post('/viaplay-trailer-gen/url')
          .send(requestBody)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('youtubeTrailerLink');
              res.body.youtubeTrailerLink.should.equal(expectedvalue)
            done();
          });
    });
});
