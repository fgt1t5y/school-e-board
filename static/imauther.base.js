export class app {
  route = new Proxy(location, {
    set(target, p, newValue, rev) {
      console.log('setter: ', newValue);
      target.hash = newValue;
      return true;
    },

    get(target, p, rev) {
      console.log('getter changed: ', p);
      return target.hash;
    }
  });

  /**
   * 
   * @param {Object[]} routes route list
   */
  // constructor(routes) {
  //   routes.forEach(route => {
  //     console.log(route);
  //   })
  // }
}

export function getClearHash() {
  // index?something=1
  var hash = location.hash.slice(2);
  const posi = hash.indexOf('?')
  if (posi === -1) {
    return hash;
  } else {
    return hash.slice(0, posi);
  }
}