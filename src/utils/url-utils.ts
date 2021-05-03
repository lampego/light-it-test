export default class UrlUtils {
  public static encodeToQueryString(obj: any, prefix = '') {
    const str: string[] = [];
    let p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? prefix + '[' + p + ']' : p;
        const v = obj[p];
        str.push(
          v !== null && typeof v === 'object'
            ? this.encodeToQueryString(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v),
        );
      }
    }
    return str.join('&');
  }
}
