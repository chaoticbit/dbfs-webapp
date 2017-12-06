'use strict';

window.DBFS = new (function() {
  var DBFS = this;


  /**
   * Private Helpers
   */

  var fields = {
    sign: ['data', 'type', 'prev', 'timestamp'],
    hash: ['data', 'type', 'prev', 'timestamp', 'creator', 'signature']
  };

  var pluck = function(source, keys) {
    var object = {};
    keys.forEach((key) => { object[key] = source[key]; });
    return object;
  };

  var publicFromPrivate = function(rsa) {
    var pub = KEYUTIL.getKey({n: rsa.n, e: rsa.e});
    return keyToString(pub);
  };

  var parsePrivateKey = function(pem) {
    var rsa = new RSAKey();
    rsa.readPrivateKeyFromPEMString(pem);
    return rsa;
  };

  var keyToString = function(key) {
    return KEYUTIL.getPEM(key);
  };


  var toUtf8 = function(string) {
    return unescape(encodeURIComponent(string));
  }

  var fromUtf8 = function(string) {
    return decodeURIComponent(escape(string));
  }



  /**
   * Block Creation Functions
   */
  DBFS.Block = new (function() {
    var $$$ = this;

    $$$.fileCreate = function(prevBlock, file, privateKey) {
      var file = DBFS.File.encrypt(file, privateKey);

      var block = {
        type: 'file_create',
        prev: prevBlock.hash,
        timestamp: DBFS.JSON.timestamp(),
        data: {
          file_name: file.name,
          file_hash: file.hash
        }
      };

      var signed = DBFS.Crypto.sign(block, privateKey);
      var hashed = DBFS.Crypto.hash(signed);

      return {block: hashed, data: file.encoded};
    };

    return $$$;
  })();



  /**
   * JSON Functions
   */
  DBFS.JSON = new (function() {
    var $$$ = this;

    // Encode an Object
    $$$.encode = function(object, fields) {
      if (_.isPlainObject(object)) {
        object = (fields ? pluck(object, fields) : object);

        var encoded =
          Object
            .keys(object)
            .sort()
            .map((k) => $$$.encode(k) + ':' + $$$.encode(object[k]))
            .join(',');

        return ('{' + encoded + '}');

      } else {
        return JSON.stringify(object);
      }
    };


    // Get Timestamp
    $$$.timestamp = function() {
      return (new Date()).toISOString();
    };


    return $$$;
  })();



  /**
   * Crypto Functions
   */
  DBFS.Crypto = new (function() {
    var $$$ = this;




    // Verify a block is valid
    $$$.verify = function(block) {
      var sign = block.signature;
      var json = DBFS.JSON.encode(block, fields.sign);
      var pubk = KEYUTIL.getKey($$$.decode(block.creator));

      return pubk.verify(json, sign);
    };


    // Returns a signed block
    $$$.sign = function(block, privateKey) {
      var block = _.clone(block);
      var json  = DBFS.JSON.encode(block, fields.sign);
      var rsa   = parsePrivateKey(privateKey);

      block.signature = rsa.sign(json, 'sha256').toUpperCase();
      block.creator = $$$.encode(publicFromPrivate(rsa));

      return block;
    };


    // Returns a hashed block
    $$$.hash = function(block) {
      var block = _.clone(block);
      var json  = DBFS.JSON.encode(block, fields.hash);

      block.hash = $$$.sha256(json);

      return block;
    };


    // Base 16 Encoding
    $$$.encode = function(text) {
      var text = text.replace(/\r/g, '');
      var digits = "0123456789ABCDEF";
      var hex = "";

      for (var i = 0; i < text.length; i++) {
        var hc = (text.charCodeAt(i) >>> 4) & 0x0F;
        var lc = text.charCodeAt(i) & 0x0F;
        hex += digits[hc];
        hex += digits[lc];
      }

      return hex;
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
      return sha256.hex(string).toUpperCase();
    };

    return $$$;
  })();




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

      link.href = 'data:application/octet-stream;base64,' + encodeURIComponent(encoded);
      link.target = '_self';
      link.download = name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


    // Check if browser has support for reading files
    $$$.canRead = function() {
      return !!(window.File && window.FileReader && window.FileList && window.Blob);
    };


    // Read a file and get contents
    $$$.read = function(file, onRead) {
      if (file && file.files && file.files[0]) {
        $$$.read(file.files[0], onRead);

      } else if (file && onRead) {
        var reader = new FileReader();

        reader.onerror = function(ev) {
          console.error("Unable to read file: ", file);
        };

        reader.onload = function(ev) {
          onRead({
            name: file.name,
            type: file.type,
            data: ev.target.result
          });
        };

        reader.readAsBinaryString(file);
      }
    };


    // Encrypt File and prepare params for upload
    $$$.encrypt = function(file, privateKey) {
      var encrypted = file.data; // do actual encryption here

      file.encoded = $$$.encode(encrypted);
      file.hash    = DBFS.Crypto.sha256(file.encoded);

      return file;
    };


    return $$$;
  })();

})();
