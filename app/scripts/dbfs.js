'use strict';

window.DBFS = new (function() {
  var DBFS = this;


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
