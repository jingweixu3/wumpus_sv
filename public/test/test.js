'use strict';

// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;
// Import our ColorIncreaser class.
const Cells = require('./mock_cells');

describe('Cells tests', function() {
  // Will hold the reference to the ColorIncreaser class
  let cells;

  // beforeEach is a special function that is similar to the setup function in
  // p5.js.  The major difference it that this function runs before each it()
  // test you create instead of running just once before the draw loop
  // beforeEach lets you setup the objects you want to test in an easy fashion.
  beforeEach(function() {
      cells = new Cells(5);
  });

  it('cells be an object', function(done) {
    expect(cells).to.be.a('object');
    done();
  });

  
  it('should be array', function(done) {
    expect(cells.cellsArray).to.be.a('array');
    done();
  });

  it('should be array of size 25', function(done) {
    expect(cells.cellsArray.length).to.equal(25);
    done();
  });

  it('should be cell of pos', function(done) {
      for(let y = 0; y < cells.side_number; y++){
          for (let x = 0; x < cells.side_number; x++){
            expect(cells.cellsArray[y*cells.side_number + x].pos).to.eql([x,y]);
          }
      }
      done();
  });
});