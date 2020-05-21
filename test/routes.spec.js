process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../backend/server');
var knex = require('../backend/db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function() {

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('GET /ping', function() {
    it('should return pong', function(done) {
      chai.request(server)
      .get('/ping')
      .end(function(err, res) {
      res.should.have.status(200);
      done();
      });
    });
  });

  describe('GET /users', function() {
    it('should return all users', function(done) {
      chai.request(server)
      .get('/users')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('array');
      res.body.length.should.equal(4);
      res.body[0].id.should.equal(1);
      res.body[0].username.should.equal("test");
      res.body[0].password.should.equal("123");
      done();
      });
    });
  });



describe('GET /users/1', function() {
  it('should return username and password of userID', function(done) {
    chai.request(server)
    .get('/users/1')
    .end(function(err, res) {
      res.should.have.status(200);
      res.body.username.should.equal("test");
      res.body.password.should.equal("123");
      done();
    })
  })
});



  describe('GET /allHabits/1', function() {
    it('should return habits of selected user', function(done) {
      chai.request(server)
      .get('/allHabits/1')
      .end(function(err, res) {
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('array');
      res.body.length.should.equal(2);
      res.body[0].should.have.property('habit_name');
      res.body[0].habit_name.should.equal('water');
      res.body[0].current_value.should.equal(0);
      res.body[0].should.have.property('current_value');
      res.body[0].should.have.property('target_value');
      res.body[0].target_value.should.equal(2000);
      res.body[0].should.have.property('frequency');
      res.body[0].frequency.should.equal(1);
      res.body[0].should.have.property('start_date');
      res.body[0].start_date.should.equal(1589760000);
      res.body[0].should.have.property('end_date');
      res.body[0].end_date.should.equal(1589846399);
      res.body[0].should.have.property('streak');
      res.body[0].streak.should.equal(0);
      res.body[0].should.have.property('completed');
      res.body[0].completed.should.equal(0);

      res.body[1].habit_name.should.equal("exercise");
      res.body[1].current_value.should.equal(0);
      res.body[1].should.have.property('target_value');
      res.body[1].target_value.should.equal(5);
      res.body[1].should.have.property('frequency');
      res.body[1].frequency.should.equal(3);
      res.body[1].should.have.property('start_date');
      res.body[1].start_date.should.equal(1589760000);
      res.body[1].should.have.property('end_date');
      res.body[1].end_date.should.equal(1589846399);
      res.body[1].should.have.property('streak');
      res.body[1].streak.should.equal(0);
      res.body[1].should.have.property('completed');
      res.body[1].completed.should.equal(1);  

      done();
      });
    });
  });

  describe('GET /habits/2', function() {
    it('should return habit info of selected habit', function(done) {
      chai.request(server)
      .get('/habits/2')
      .end(function(err, res) {
        res.should.be.json; // jshint ignore:line
        res.body.habit_name.should.equal("exercise");
        res.body.current_value.should.equal(0);
        res.body.should.have.property('target_value');
        res.body.target_value.should.equal(5);
        res.body.should.have.property('frequency');
        res.body.frequency.should.equal(3);
        res.body.should.have.property('start_date');
        res.body.start_date.should.equal(1589760000);
        res.body.should.have.property('end_date');
        res.body.end_date.should.equal(1589846399);
        res.body.should.have.property('streak');
        res.body.streak.should.equal(0);
        res.body.should.have.property('completed');
        res.body.completed.should.equal(1);
        done();
      })
    })
  });

  describe('POST /login', function() {
    it('should test login functionality', function(done){
      chai.request(server)
      .post('/login')
      .send({
        username: 'test',
        password: '1234'
      })
      .end(function(err, res){
        console.log("login response: ", res.body)
        res.body.errorMessage.should.equal("Username or password is incorrect.");
        done();
      })
    })
  })

  describe('PUT /users', function() {
    it('should update a user', function(done){
      chai.request(server)
      .put('/users')
      .send({
        id: 1,
        username: 'edittest',
        password: '123'
      })
      .end(function(err, res){
        console.log("PUT RESPONSE", res.body);
        res.body.successMessage.should.equal("Username updated to: edittest");
        done();
      })
    })
  })

  describe('PUT /users', function() {
    it('should fail to update a user (no username)', function(done){
      chai.request(server)
      .put('/users')
      .send({
        id: 1,
        username: '',
        password: '123'
      })
      .end(function(err, res){
        console.log("PUT RESPONSE", res.body);
        res.body.errorMessage.should.equal("Enter a username");
        done();
      })
    })
  })


  // describe('GET /api/v1/shows/:id', function() {
  //   it('should return a single show', function(done) {
  //     chai.request(server)
  //     .get('/api/v1/shows/1')
  //     .end(function(err, res) {
  //       res.should.have.status(200);
  //       res.should.be.json; // jshint ignore:line
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('name');
  //       res.body.name.should.equal('Suits');
  //       res.body.should.have.property('channel');
  //       res.body.channel.should.equal('USA Network');
  //       res.body.should.have.property('genre');
  //       res.body.genre.should.equal('Drama');
  //       res.body.should.have.property('rating');
  //       res.body.rating.should.equal(3);
  //       res.body.should.have.property('explicit');
  //       res.body.explicit.should.equal(false);
  //       done();
  //     });
  //   });
  // });

  // describe('POST /api/v1/shows', function() {
  //   it('should add a show', function(done) {
  //     chai.request(server)
  //     .post('/api/v1/shows')
  //     .send({
  //       name: 'Family Guy',
  //       channel : 'Fox',
  //       genre: 'Comedy',
  //       rating: 4,
  //       explicit: true
  //     })
  //     .end(function(err, res) {
  //       res.should.have.status(200);
  //       res.should.be.json; // jshint ignore:line
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('name');
  //       res.body.name.should.equal('Family Guy');
  //       res.body.should.have.property('channel');
  //       res.body.channel.should.equal('Fox');
  //       res.body.should.have.property('genre');
  //       res.body.genre.should.equal('Comedy');
  //       res.body.should.have.property('rating');
  //       res.body.rating.should.equal(4);
  //       res.body.should.have.property('explicit');
  //       res.body.explicit.should.equal(true);
  //       done();
  //     });
  //   });
  // });

  // describe('PUT /api/v1/shows/:id', function() {
  //   it('should update a show', function(done) {
  //     chai.request(server)
  //     .put('/api/v1/shows/1')
  //     .send({
  //       rating: 4,
  //       explicit: true
  //     })
  //     .end(function(err, res) {
  //       res.should.have.status(200);
  //       res.should.be.json; // jshint ignore:line
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('name');
  //       res.body.name.should.equal('Suits');
  //       res.body.should.have.property('channel');
  //       res.body.channel.should.equal('USA Network');
  //       res.body.should.have.property('genre');
  //       res.body.genre.should.equal('Drama');
  //       res.body.should.have.property('rating');
  //       res.body.rating.should.equal(4);
  //       res.body.should.have.property('explicit');
  //       res.body.explicit.should.equal(true);
  //       done();
  //     });
  //   });
  //   it('should NOT update a show if the id field is part of the request', function(done) {
  //     chai.request(server)
  //     .put('/api/v1/shows/1')
  //     .send({
  //       id: 20,
  //       rating: 4,
  //       explicit: true
  //     })
  //     .end(function(err, res) {
  //       res.should.have.status(422);
  //       res.should.be.json; // jshint ignore:line
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('error');
  //       res.body.error.should.equal('You cannot update the id field');
  //       done();
  //     });
  //   });
  // });

  // describe('DELETE /api/v1/shows/:id', function() {
  //   it('should delete a show', function(done) {
  //     chai.request(server)
  //     .delete('/api/v1/shows/1')
  //     .end(function(error, response) {
  //       response.should.have.status(200);
  //       response.should.be.json; // jshint ignore:line
  //       response.body.should.be.a('object');
  //       response.body.should.have.property('name');
  //       response.body.name.should.equal('Suits');
  //       response.body.should.have.property('channel');
  //       response.body.channel.should.equal('USA Network');
  //       response.body.should.have.property('genre');
  //       response.body.genre.should.equal('Drama');
  //       response.body.should.have.property('rating');
  //       response.body.rating.should.equal(3);
  //       response.body.should.have.property('explicit');
  //       response.body.explicit.should.equal(false);
  //       chai.request(server)
  //       .get('/api/v1/shows')
  //       .end(function(err, res) {
  //         res.should.have.status(200);
  //         res.should.be.json; // jshint ignore:line
  //         res.body.should.be.a('array');
  //         res.body.length.should.equal(3);
  //         res.body[0].should.have.property('name');
  //         res.body[0].name.should.equal('Game of Thrones');
  //         res.body[0].should.have.property('channel');
  //         res.body[0].channel.should.equal('HBO');
  //         res.body[0].should.have.property('genre');
  //         res.body[0].genre.should.equal('Fantasy');
  //         res.body[0].should.have.property('rating');
  //         res.body[0].rating.should.equal(5);
  //         res.body[0].should.have.property('explicit');
  //         res.body[0].explicit.should.equal(true);
  //         done();
  //       });
  //     });
  //   });
  // });

  



  describe('POST /users', function() {
    it('should add a user to database ', function(done) {
      chai.request(server)
      .post('/users')
      .send({
        username: 'username5',
        password: '5555'
      })
      .end(function(err,res) {
       console.log("msg", res.body)
       done();
      })
    });
  });


  describe('DELETE /users', function() {
    it('should delete specified user ', function(done) {
      chai.request(server)
      .delete('/users')
      .send({
        id: 1,
      })
      .end(function(err,res) {
        res.should.be.json;
        // res.body.should.equal({message: 'User deleted with id: 1'})
        res.body.message.should.equal('User deleted with id: 1');
        done();
      })
    });
  });

  describe('DELETE /habits', function() {
    it('should delete specified habit ', function(done) {
      chai.request(server)
      .delete('/habits')
      .send({
        id:1,
        // habit_name: 'beer',
        // current_value: 0,
        // target_value: 2000,
        // frequency: 1,
        // start_date: 1589760000,
        // end_date: 1589846399,
        // streak: 0,
        // completed: false
      })
      .end(function(err,res) {
        res.should.be.json;
        res.body.successMessage.should.equal(`Habit deleted with id: 1`)
        done();
      })
    });
  });

  
  //======================//

});
