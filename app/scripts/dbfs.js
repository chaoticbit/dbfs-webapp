'use strict';

window.DBFS = new (function() {
  var DBFS = this;



  /**
   * Crypto Functions
   */
  DBFS.Crypto = new (function() {
    var $$$ = this;

    // Base 16 Encoding
    $$$.encode = function(st) {
      var s = unescape(encodeURIComponent(st));
      var h = '';
      for (var i = 0; i < s.length; i++) {
        h += s.charCodeAt(i).toString(16);
      }
      return h.toUpperCase();
    };


    // Base 16 Decoding
    $$$.decode = function(h) {
      var s = '';
      for (var i = 0; i < h.length; i+=2) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
      }
      return decodeURIComponent(escape(s));
    };


    // SHA256 Hashing
    $$$.sha256 = function(string) {
      return sha256(string).toUpperCase();
    };

    return $$$;
  })();



  // var sign_fields = ['data', 'type', 'prev', 'timestamp'];
  // var hash_fields = ['data', 'type', 'prev', 'timestamp', 'creator', 'signature'];

  // function verify(block) {
  //   sign = decode(block.signature);
  //   key  = decode(block.creator);
  // }



  /**
   * File Helper functions
   */
  DBFS.File = new (function() {
    var $$$ = this;

    // Base 64 Encoding / Decoding
    $$$.encode = function(string) { return btoa(string); };
    $$$.decode = function(string) { return atob(string); };


    // Download Raw Bytes
    $$$.downloadRaw = function(name, bytes) {
      var encoded = $$$.encode(bytes);
      $$$.downloadEncoded(name, encoded);
    };


    // Download Base64 Encoded File
    $$$.downloadEncoded = function(name, encoded) {
      var link = document.createElement('a');

      link.href = ('data:application/octet-stream;base64,' + encoded);
      link.download = name;
      link.click();
    };


    return $$$;
  })();

})();
