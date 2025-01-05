export function successStatus(status: number) {
  return status >= 200 && status < 300;
}

export function errorStatus(status: number) {
  return status >= 400 && status < 500;
}

export function authenticationStatus(status: number) {
  return status === 401 || status === 403;
}

export function serverStatus(status: number) {
  return status >= 500 && status < 599;
}

export function errorMaker(status: number, message: string, code?: string) {
  return {
    status,
    message,
    code,
  };
}

export const convertToMillionToman = (priceInRials: number) => {
  let priceInTomans = priceInRials / 10; // تبدیل قیمت به میلیون تومان
  let priceInMillionTomans = priceInTomans / 1000000; // نمایش قیمت به میلیون تومان
  if (priceInMillionTomans === 0) return 0;
  return priceInMillionTomans.toFixed(1);
};
