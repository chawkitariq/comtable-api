export default class AppEnv {
  public static isProduction = process.env.APP_ENV === 'production';
  public static isDevelopment = process.env.APP_ENV === 'development';

  public static onNotProduction(fn: () => void) {
    if (!AppEnv.isProduction) {
      fn();
    }
  }

  public static onProduction(fn: () => void) {
    if (AppEnv.isProduction) {
      fn();
    }
  }

  public static onDevelopment(fn: () => void) {
    if (AppEnv.isDevelopment) {
      fn();
    }
  }
}
