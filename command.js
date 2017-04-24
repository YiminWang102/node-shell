var fs = require('fs');
var request = require('request');

var obj = {
// intToDay: function(i){
//   var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   return days[i];
// },
//
// intToMonth: function(i){
//   var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   return months[i];
// },
//
// processInput: function(input){
//   var output;
//   if(input === 'pwd'){
//     output = process.cwd();
//   } else if (input === 'date'){
//     var date = new Date();
//     var week = this.intToDay(date.getDay());
//     var month = this.intToMonth(date.getMonth());
//     var day = date.getDate();
//     var year = date.getFullYear();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var seconds = date.getSeconds();
//
//     output = week + ' ' + month + ' ' + day + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + 'GMT-0400 (EDT)';
//   }
//
//   process.stdout.write(output);
//   process.stdout.write('\nprompt > ');
// },
  pwd: function(args, done){
    done(process.cwd());
  },

  ls: function(args, done){
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        var output = ""
        files.forEach(function(file) {
          output += file.toString() + "\n"
        })
        done(output);
    });
  },

  echo: function(args, done){
    args = args.map(function(ele){
      if(ele[0] === '$'){
        return process.env[ele.slice(1)];
      } else return ele;
    })
    done(args.join(" "));
  },

  cat: function(args, done){
    fs.readFile(args[0], (err, data) => {
      if(err) throw err;
      done(data);
    });
  },

  head: function(args, done){
    fs.readFile(args[0],'utf8', (err, data) => {
      if(err) throw err;
      done(data.split("\n").slice(0,6).join("\n"));
    });
  },

  tail: function(args, done){
    fs.readFile(args[0],'utf8', (err, data) => {
      if(err) throw err;
      done(data.split("\n").slice(-6,-1).join("\n"));
    });
  },

  sort: function(args, done){
    fs.readFile(args[0],'utf8', (err, data) => {
      if(err) throw err;
      done(data.split("\n").sort().join('\n'));
    });
  },

  wc: function(args, done){
    fs.readFile(args[0],'utf8', (err, data) => {
      if(err) throw err;
      done(data.split("\n").length);
    });
  },

  uniq: function(args, done){
    fs.readFile(args[0],'utf8', (err, data) => {
      if(err) throw err;
      var lines = data.split('\n');
      for(var i = 0; i < lines.length - 1; i++){
        if(lines[i] === lines[i+1]){
          lines.splice(i,1);
          i--;
        }
      }
      done(lines.join('\n'));
    });
  },

  curl: function(args, done){
    request('http://' + args[0], function(error, response, body){
      done(response.body);
    })
  }
}


module.exports = obj;
