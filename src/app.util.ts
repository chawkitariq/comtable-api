export class Env {
  public static isProduction = process.env.APP_ENV === 'production';
  public static isDevelopment = process.env.APP_ENV === 'development';

  public static onNotProduction(fn: () => void) {
    if (!Env.isProduction) {
      fn();
    }
  }

  public static onProduction(fn: () => void) {
    if (Env.isProduction) {
      fn();
    }
  }

  public static onDevelopment(fn: () => void) {
    if (Env.isDevelopment) {
      fn();
    }
  }
}

export class App {
  public static locale = process.env.APP_LOCALE;
  public static env = Env;
}
