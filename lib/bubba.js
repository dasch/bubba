
var Bubba = {
  /**
   * Encode the given obj, returning a bencoded string.
   */
  encode: function(obj) {
    if (typeof(obj) == "number") {
      if (obj.toString().indexOf('.') == -1) {
        return "i" + obj + "e";
      } else {
        throw SyntaxError;
      }
    } else if (typeof(obj) == "string") {
      return obj.length + ":" + obj;
    } else if (obj instanceof Array) {
      return "l" + obj.map(function(element) { return Bubba.encode(element); }).join("") + "e";
    } else if (obj instanceof Object) {
      var value = "d";
      for (attr in obj) {
        value += Bubba.encode(attr) + Bubba.encode(obj[attr]);
      }
      return value + "e";
    } else {
      throw SyntaxError;
    }
  },

  /**
   * Decode the given string, returning a JavaScript object.
   */
  decode: function(str) {
    function parseObject(str) {
      if (str.substr(0, 1) == 'i') {
        return parseInteger(str.substring(1, str.length));
      } else if (str.substr(0, 1) == 'l') {
        return parseList(str.substring(1, str.length));
      }
    }

    function parseInteger(str) {
      if (str.indexOf('e') < 1)
        throw SyntaxError;

      var value = parseInt(str.substring(0, str.indexOf('e')));

      if (value == NaN)
        throw SyntaxError;

      return value;
    }

    function parseList(str) {
      var elements = [];
      while (str.substr(0, 1) != "e") {
        elements.push(parseObject(str));
      }
    }

    return parseObject(str);
  }
}
