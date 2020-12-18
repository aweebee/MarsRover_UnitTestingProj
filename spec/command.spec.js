//A. COMMANDS, tests 1-3
// NOTE: assert.Equal() fails if the arguments are != because although the values might be essentially equivalent, they are not the same object.
  // ** assert.deepStrictEqual() measures structural equality. It does not test if the operands are the same object; instead, it tests for equivalency. 
  // ** assert.deepStrictEqual forces objects to be compared (as if the objects are values).
const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

//test1
    //assert.throws verifies if a specific error is thrown. Look at constructor in command.js and the description (below) for reference:
    // NOTE: assert.throws will evaluate expressions, but only if the validate object contains an identical expression will the test pass.
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

});

//test2 
  //test checks that the constructor in the Command class correctly sets the commandType property in the new object
it("constructor sets command type", function() {
  //is not assert.throws statement
  //creates new test object
  let command = new Command('STATUS_CHECK');
    assert.strictEqual(command.commandType, 'STATUS_CHECK')
});

//test3
    //checks that name property has been set
  it("constructor sets a value passed in as the 2nd argument", function() {
    //testing that an object sets the values we anticipate
    //create object
  let command = new Command('LOW_POWER');
    assert.strictEqual(command.commandType, 'LOW_POWER');

  });