declare module 'pino' {
  type PinoInstance = {
    child: (bindings?: Record<string, unknown>) => PinoInstance;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    debug: (...args: any[]) => void;
  };

  function pino(options?: Record<string, unknown>): PinoInstance;
  export = pino;
}
