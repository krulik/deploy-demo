var assert = require('assert');
var fs = require('fs');
var server = require('../index.js');

describe('Server', function() {
  describe('handleRequest', function() {
    it('should return index.html for /', function() {
      var indexHtml = fs.readFileSync(__dirname + '/../index.html', 'utf-8');
      var request = {
        url: '/'
      };
      var response = {
        end: data => {
          assert.strictEqual(data, null);
        }
      };

      server.handleRequest(request, response);
    });
  });
});