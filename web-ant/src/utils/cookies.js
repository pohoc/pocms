import Cookie from "js-cookie";

class Cookies {
  setCookies(key, value, expires = 0) {
    Cookie.set(key, value, {
      expires,
    });
  }

  getCookies(key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  }

  deleteCookies(key) {
    Cookies.remove(key)
  }
}

export default new Cookies();
