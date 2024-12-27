export function onNotProduction(fn) {
  if (process.env.APP_ENV !== 'production') {
    fn();
  }
}
