/**
 * Implementation of Hashtable in JavaScript
 * @author fmorenop@dian.gov.co
 */
Hashtable = function Hashtable(Map) {
    this.table = new Object();
    if (Map){
      this.putAll(Map);
    }
}

/** Tests if the specified object is a key in this hashtable. */
Hashtable.prototype.containsKey = function(key) {
    var value = false;
    if (this.table[key]) {
        value = true;
    }
    return false;
}

/** Returns the value to which the specified key is mapped in this hashtable. */
Hashtable.prototype.get = function(key) {
    return this.table[key];
}

/**  Tests if this hashtable maps no keys to values. */
Hashtable.prototype.isEmpty = function() {
    var isEmpty = true;
    for (var p in this.table){
        isEmpty = false;
        break;
    }
    return isEmpty;
}

/** Maps the specified key to the specified value in this hashtable. */
Hashtable.prototype.put = function(key, value) {
    this.table[key] = value;
}

/** Removes the key (and its corresponding value) from this hashtable. */
Hashtable.prototype.remove = function(key) {
    delete this.table[key];
}

/** Returns an enumeration of the keys in this hashtable. */
Hashtable.prototype.keys = function() {
    var keys = new Array();
    for (var k in this.table){
        keys.push(k);
    }
    return keys;
}

/** Returns an enumeration of the values in this hashtable. */
Hashtable.prototype.elements = function() {
    var elements = new Array();
    for (var e in this.table) {
        elements.push(this.table[e]);
    }
    return elements;
}

/**  Copies all of the mappings from the specified Map to this Hashtable
* These mappings will replace any mappings that this Hashtable had for any of the keys
* currently in the specified Map.*/
Hashtable.prototype.putAll = function(Map) {
    var keys = Map.keys();
    if (keys) {
        for (var k =0; k < keys.length; k++) {
            var key = keys[k];
            if (key) {
                this.put(key, Map.get(key));
            }
      }
    }
}

/** Returns the number of keys in this hashtable. */
Hashtable.prototype.size = function() {
    var size = 0;
    for (var p in this.table) {
        size++;
    }
    return size;
}
