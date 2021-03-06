
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
  }
}
