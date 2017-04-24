//console.log(new Date().getDay());
//console.log(Object.keys(process));

var methods = require('./command.js');

var done = function(output){
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
};

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  var args = cmd.split(" ").slice(1);
  var func = cmd.split(" ")[0];
  methods[func](args, done);
});
//unique
//unique
//unique
//unique
