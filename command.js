var fs = require('fs');
var request = require('request');
var obj = {
  date: function(args, done){
    done(Date());
  },

  pwd: function(args, done){
    done(process.cwd());
  },

  ls: function(args, done){
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        var output = "";
        files.forEach(function(file) {
          output += file.toString() + "\n";
        });
        done(output);
    });
  },

  echo: function(args, done){
    args = args.map(function(ele){
      if(ele[0] === '$'){
        return process.env[ele.slice(1)];
      } else return ele;
    });
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
    });
  }
};


module.exports = obj;
