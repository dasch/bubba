
var Bencode = {
  /**
   * Encode the given object, returning a bencoded string.
   */
  encode: function(object) {
    switch (typeof(object)) {
    case "number":
      return "i" + object + "e";
    default:
      return NULL;
    }
  }
}
