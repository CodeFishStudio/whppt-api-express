import debug from 'debug';
export declare type LoggerService = {
    info: debug.Debugger;
    error: debug.Debugger;
    warning: debug.Debugger;
    dev: debug.Debugger;
};
export declare type LoggerServiceConstructor = () => LoggerService;
export declare const Logger: LoggerServiceConstructor;
