class Helpers {
  static stringReplace(find, replace, string) {
    return `${string}`.split(find).join(replace);
  }
  static persianNumber(string) {
    const numbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return string.replace(/[0-9]/g, word => numbers[+word]);
  }
  static englishNumber(string) {
    return string
      .replace(/[\u0660-\u0669]/g, c => c.charCodeAt(0) - 0x0660)
      .replace(/[\u06f0-\u06f9]/g, c => c.charCodeAt(0) - 0x06f0);
  }
  static generateKey() {
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const rand = Math.floor(Math.random() * 10000 + 1);
    return `${timeStamp}${rand}`;
  }

  /* eslint-disable no-useless-escape */
  static getQueryString(url, parameter) {
    const myParameter = parameter.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${myParameter}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  static getCookie(key) {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let index = 0; index < cookies.length; index += 1) {
      let cookie = cookies[index];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }
  static bulkStringReplace(replacements, string) {
    let modifiedString = string;
    Object.keys(replacements).forEach(key => {
      modifiedString = this.stringReplace(
        key,
        replacements[key],
        modifiedString,
      );
    });
    return modifiedString;
  }
  static getOSName(OSVersion) {
    let OSName = OSVersion;
    const oSMapper = {
      Win: 'Windows',
      Mac: 'MacOS',
      X11: 'UNIX',
      Linux: 'Linux',
      Android: 'Android',
      iPhone: 'IOS',
    };
    Object.keys(oSMapper).forEach(key => {
      if (OSVersion.indexOf(key) !== -1) {
        OSName = oSMapper[key];
      }
    });
    return OSName;
  }
}
export default Helpers;
