
var Bencode = {
  /**
   * Encode the given obj, returning a bencoded string.
   */
  encode: function(obj) {
    if (typeof(obj) == "number") {
      return "i" + obj + "e";
    } else if (typeof(obj) == "string") {
      return obj.length + ":" + obj;
    } else if (obj instanceof Array) {
      return "l" + obj.map(function(element) { return Bencode.encode(element); }).join("") + "e";
    } else if (obj instanceof Object) {
      var value = "d";
      for (attr in obj) {
        value += Bencode.encode(attr) + Bencode.encode(obj[attr]);
      }
      return value + "e";
    }
  }
}
