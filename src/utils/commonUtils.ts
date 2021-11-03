export default {
  urlQueryStringParse: async function(search: string) {
    if (search && typeof search === 'string') {
      let resultObj: { [x: string]: unknown } = {};
      let parseStr = search;
      if (search.indexOf('?') > -1) {
        parseStr = parseStr.substring(1, search?.length + 1);
      }
      if (search.indexOf('=') > -1) {
        const splitStrArr = parseStr.split('&');
        await Promise.all(splitStrArr.map((str: string) => {
          return Promise.resolve(() => {
            const splitKeyValue = str.split('=');
            resultObj[splitKeyValue[0]] = splitKeyValue[1];
          })
        }))
      }
      return resultObj;
    }
    return {};
  },
  priceComma: (num: string) => {
    if (typeof num === 'string') {
      return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return num;
  },
  discountPrice: (price: number, discount: number) => {
    return String(price - Math.floor(Number(price) * (Number(discount) / 100)))
  }
}