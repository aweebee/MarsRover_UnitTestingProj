const assert = require('assert');
const Command = require('../command.js');
const Message = require('../message.js');
const Rover = require('../rover.js');

describe("Rover class", function() {
//test 7 
  //Write the code to make them (the tests?) pass in rover.js      
it("constructor sets position and default values for mode and generatorWatts.", function() {
    let rover = new Rover(98382);
    //assert.strictEqual??
    assert.strictEqual(rover.position, 98382);
    assert.strictEqual(rover.mode, 'NORMAL');
    assert.strictEqual(rover.generatorWatts, 110);
  });

//test 8
it("response returned by receiveMessage contains name of message", function() {
  let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE'), new Command ('MOVE')];
  //let message = new Message('test', commands);
  let rover = new Rover(98382);
  let messageReceived = rover.receiveMessage(new Message('name', commands));
      assert.strictEqual(messageReceived.message, 'name');
  });

//test 9
it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let commands = [new Command ('MODE_CHANGE'), new Command('MOVE')];
  let rover = new Rover(98382);
  let messageReceived = rover.receiveMessage(new Message('name', commands));
      assert.strictEqual(messageReceived.results.length, 2);
});

//test 10
/* "responds correctly to status check command"
          a. For the STATUS_CHECK command, receiveMessage(message).results includes a roverStatus object describing the current state of the rover object --- mode, generatorWatts, and position. 
          b. The test should check each of these for accuracy.
                      >>>>>>See the Rover Command Types table for more details.<<<<<
*/

it("responds correctly to status check command", function() {
  let commandArray = [new Command('STATUS_CHECK')];
  let position = 87382098;
  let roverStatus = new Rover(position);
  let messageReceived = roverStatus.receiveMessage(new Message('name', commandArray)).results;
      
      assert.strictEqual(messageReceived[0].roverStatus.mode, 'NORMAL');
      assert.strictEqual(messageReceived[0] .roverStatus.generatorWatts, 110);
      assert.strictEqual(messageReceived[0].roverStatus.position, 87382098);
});

//test 11
    //This test should check the completed property and rover mode for accuracy.
    //The rover has two modes that can be passed a value to a mode change command, 'LOW_POWER' and 'NORMAL'. */

it("responds correctly to 'mode_change' command", function() {
  let commandArray = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let position = 87382098;
  let roverStatus = new Rover(position);
  let messageReceived = roverStatus.receiveMessage(new Message('name', commandArray)).results;
      assert.strictEqual(roverStatus.mode, 'LOW_POWER');
});

//test 12
    //The test should check the completed property for accuracy and confirm that the rover position did not change.
    //Use the Rover Modes table for guidance on how to handle move commands in different modes.

it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
  let commandArray = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 98382)];
  let position = 87382098;
  let roverStatus = new Rover(position)
  let messageReceived = roverStatus.receiveMessage(new Message('name', commandArray)).results;
      assert.strictEqual(messageReceived[1].completed, false);
});

//test 13
    //a MOVE command will update the rover's position with the position value in the command.
it("responds with position for move command", function() {
  let commandArray = [new Command('MOVE', 2)];
  let position = 87382098;
  let roverStatus = new Rover(position);
  let messageReceived = roverStatus.receiveMessage(new Message('name', commandArray)).results;
      assert.strictEqual(roverStatus.position, 2);
  });
});

it("responds to TA message & commands", function() {
   let rover = new Rover(100);
   let commands = [
      new Command('MOVE', 4321),
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 3579),
      new Command('STATUS_CHECK')
   ];
   let message = new Message('TA power', commands);
   let response = rover.receiveMessage(message);
   assert.strictEqual(response.message,'TA power');
   assert.strictEqual(response.results[0].completed, true);
   assert.strictEqual(response.results[1].roverStatus.position, 4321);
   assert.strictEqual(response.results[2].completed, true);
   assert.strictEqual(response.results[3].completed, false);
   assert.strictEqual(response.results[4].roverStatus.position, 4321);
   assert.strictEqual(response.results[4].roverStatus.mode, 'LOW_POWER');
   assert.strictEqual(response.results[4].roverStatus.generatorWatts, 110);
});











