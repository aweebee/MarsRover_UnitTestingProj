//B. MESSAGES, tests 4-6
// NOTE: assert.Equal() fails if the arguments are != because although the values might be essentially equivalent, they are not the same object.
//assert.deepStrictEqual() measures structural equality. It does not test if the operands are the same object, and instead tests that they're equivalent. deepStrictEqual forces objects to be compared (as if the objects are values)

const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {

//test4 
  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
       }
    );
  });

//test5 
  it("constructor sets name", function() {
    //This test confirms that the constructor in the Message class correctly sets the name property in a new message object.
    let message = new Message("name");
      assert.strictEqual(message.name, "name");
  });

//test 6
  //Use "contains a commands array passed into the constructor as 2nd argument". This test confirms that the commands property of a new message object contains the data passed in from the Message(name, commands) call.
  //HINT: Inside this test, you will have to create a commands array, fill it with some Command objects, and pass it into the Message constructor.

  it("contains a commands array passed into the constructor as 2nd argument", function() {
    let commands = [new Command('MODE_CHANGE'), new Command('MOVE'), new Command('STATUS_CHECK')];
    let message = new Message("name", commands);
    assert.strictEqual(message.commands, commands);
  });
});