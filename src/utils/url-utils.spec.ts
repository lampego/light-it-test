import UrlUtils from './url-utils';

describe('UrlUtils encoding tests', () => {
  it('Should encode simple object', () => {
    const data = {
      param1: '11',
      param2: '222',
    };
    expect(UrlUtils.encodeToQueryString(data))
      .toBe('param1=11&param2=222');
  });

  it('Should encode object with array', () => {
    const data = {
      param1: '11',
      param2: ['222', '333'],
    };
    expect(UrlUtils.encodeToQueryString(data)).toBe(
      'param1=11&param2%5B0%5D=222&param2%5B1%5D=333'
    );
  });
});
