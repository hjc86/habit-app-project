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

    it('should catch habit error', function(done){
      chai.request(server)
      .get('/habits/')
      .end(function(err, res){
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
        res.body.errorMessage.should.equal('Username or password is incorrect.');
        done();
      })
    })
  
    it('should return error if attempt to login in with incorrect username or password', function(done){
      chai.request(server)
      .post('/login')
      .send({
        username: '',
        password: ''
      })
      .end(function(err, res){

        res.body.errorMessage.should.equal('Please enter a valid username and password');
        done();
      })
    })
  
    it('should return error if username does not exist', function(done){
      chai.request(server)
      .post('/login')
      .send({
        username: 'xxxx',
        password: '1234'
      })
      .end(function(err, res){

        res.body.errorMessage.should.equal('Username or password is incorrect.');
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

        res.body.errorMessage.should.equal("Enter a username");
        done();
      })
    })
  })

  describe('PUT /habits', function(){
    it('should update a habit', function(done){
      chai.request(server)
      .put('/habits')
      .send({
        id: 1,
        habit_name: "water",
        target_value: "2000",
        frequency: "3"
      })
      .end(function(err, res){

        res.body.successMessage.should.equal("Habit updated successfully")
        done();
      })
    })

    it('should fail to update a habit (no username)', function(done){
      chai.request(server)
      .put('/habits')
      .send({
        id: 1,
        target_value: "2000",
        frequency: "3"
      })
      .end(function(err, res){

        res.body.errorMessage.should.equal("Please fill out all information.")
        done();
      })
    })

    it('should fail to update a habit (id does not exist)', function(done){
      chai.request(server)
      .put('/habits')
      .send({
        id: 999,
        habit_name: "water",
        target_value: "2000",
        frequency: "3"
      })
      .end(function(err, res){

        res.body.errorMessage.should.equal("A habit with that habit ID does not exist")
        done();
      })
    })

  })


  describe('POST /users', function() {
    it('should add a user to database ', function(done) {
      chai.request(server)
      .post('/users')
      .send({
        username: 'username5',
        password: '5555'
      })
      .end(function(err,res) {
        res.body.successMessage.should.equal('User created!')
       done();
      })
    });
  
    it('should respond with error if invalid password and/or username submitted ', function(done) {
      chai.request(server)
      .post('/users')
      .send({
        username: '',
        password: ''
      })
      .end(function(err,res) {
        res.body.errorMessage.should.equal('Please enter a valid username and password')
       done();
      })
    });

    it('should respond with error if username already exits ', function(done) {
      chai.request(server)
      .post('/users')
      .send({
        username: 'test',
        password: '123'
      })
      .end(function(err,res) {
        res.body.errorMessage.should.equal('Username already exists')
       done();
      })
    });
  
    it('should respond with default error for server acces issu', function(done) {
      chai.request(server)
      .post('/users')
      .send({
        username: 'test',
        password: '123'
      })
      .end(function(err,res) {
        res.body.errorMessage.should.equal('Username already exists')
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
      })
      .end(function(err,res) {
        res.should.be.json;
        res.body.successMessage.should.equal(`Habit deleted with id: 1`)
        done();
      })
    });
  });
  
  describe('POST /habits', function() {
    it('should create a new habit for a givent user', function(done) {
      chai.request(server)
      .post('/habits')
      .send({
        user_id: 1,
        habit_name: 'beer',
        current_value: 0,
        target_value: 28,
        frequency: 10,
        start_date: 1589760000,
        end_date: 1589846399,
        streak: 0,
        completed: false
      })
      .end(function(err,res) {
        res.should.be.json;
        res.body.successMessage.should.equal('Habit created successfully')
        done();
      })
    });

    it('should return error if not all iinformation include in post to /habits', function(done) {
      chai.request(server)
      .post('/habits')
      .send({
        user_id: 1,
        habit_name: 'beer',
        current_value: 0,
        target_value: 28,
        frequency: 10,
        start_date: 1589760000,
        streak: 0,
        completed: false
      })
      .end(function(err,res) {
        res.should.be.json;
        res.body.errorMessage.should.equal('Please fill out all information')
        done();
      })
    }); 


    
  });

});
