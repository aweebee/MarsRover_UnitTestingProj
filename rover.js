//C. ROVER, class
// This class builds a rover object with a few properties, and it also contains a function outside of constructor to handle updates to its properties.
const assert = require('assert');
const Message = require('./message.js');
const Command = require('./command.js');


class Rover {
  //Refer to the Rover Class description for these default values
  constructor(position) {
    //'position' is a number representing rover's position
    this.position = position, //string
    this.mode = 'NORMAL', //string 'NORMAL'
    this.generatorWatts = 110 //set default value for generatorWatts to 110

  }

  //receiveMessage is a method--NOT a property
    //check syntax for if elses, keeping them inside the for loop
  receiveMessage(message) {
  let messageCommands = message.commands;
  let response = {
      message: message.name,
      results: []
      }

    for (let i = 0; i < messageCommands.length; i++) {
          let updated = true;
         

      if (messageCommands[i].commandType == "MODE_CHANGE") {
          this.mode = messageCommands[i].value;
          response.results.push({completed: updated});
        
      } else if (messageCommands[i].commandType == "MOVE") {
          if (this.mode == "LOW_POWER") {
          updated = false;
          response.results.push({completed: updated});
      } else {
        this.position = messageCommands[i].value;
        response.results.push({completed: updated});
        }
      
      
      } else if (messageCommands[i].commandType == "STATUS_CHECK") {
          response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
          }
      }
            
    return response;
   

      }
    }


module.exports = Rover;

/*
      //ROVER CLASS notes:
      //a. message is a Message object
      //b. returns an object containing at least two properties
              //i. message: the name of the original Message object
              //ii. results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands
      //c. updates certain properties of the rover object
              //i. details about how to respond to different commands are in the (ref. link "Command Types Table")
*/