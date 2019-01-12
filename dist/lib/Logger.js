"use strict";
// Copyright (C) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(level, callback) {
        /**
         * Level to log at
         */
        this.logLevel = LogLevel.DISABLED;
        if (level) {
            this.logLevel = level;
        }
    }
    /**
     * @param message       The message to log
     * @param level         The level to log at
     * @param categories    The categories this message belongs to, if any
     *
     * Logs a message either to console.log, or the callback if defined
     */
    log(message, level, categories) {
        if (level === LogLevel.DISABLED) {
            throw new Error('You cannot log at the "DISABLED" level!');
        }
        if (!categories) {
            categories = [];
        }
        const date = new Date().toUTCString();
        let output = `[${date}] [${logLevelToString(level)}]`;
        for (const category of categories) {
            output += ` [${logCategoryToString(category)}]`;
        }
        output += `: ${message}`;
        if (level >= this.logLevel) {
            /* If the user provides a callback, log to that instead */
            if (this.callback) {
                this.callback(output, message, level, categories);
            }
            else {
                console.log(output);
            }
        }
    }
    /**
     * Sets the log level. Log messages below this level are not shown.
     */
    setLogLevel(logLevel) {
        this.logLevel = logLevel;
    }
    /**
     * @param callback The callback to use for log messages
     * @param callback.prettyMessage A nicely formatted log message, with timestamp, levels, and categories
     * @param callback.message       The raw log message
     * @param callback.level         The level at which the message was logged at
     * @param callback.categories    The categories this log message falls into
     *
     * Sets a callback to be used instead of console.log for more fined control
     * of the logging output.
     *
     * Usage:
     * ```
     * wallet.setLoggerCallback((prettyMessage, message, level, categories) => {
     *       if (categories.includes(LogCategory.SYNC)) {
     *           console.log(prettyMessage);
     *       }
     *   });
     * ```
     *
     */
    setLoggerCallback(callback) {
        this.callback = callback;
    }
}
/**
 * Levels to log at
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["DISABLED"] = 4] = "DISABLED";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * Convert a log level to a string
 */
function logLevelToString(level) {
    switch (level) {
        case LogLevel.DISABLED: {
            return 'Disabled';
        }
        case LogLevel.DEBUG: {
            return 'Debug';
        }
        case LogLevel.INFO: {
            return 'Info';
        }
        case LogLevel.WARNING: {
            return 'Warning';
        }
        case LogLevel.ERROR: {
            return 'Error';
        }
    }
}
/**
 * Possible categories log messages can be in
 */
var LogCategory;
(function (LogCategory) {
    LogCategory[LogCategory["SYNC"] = 0] = "SYNC";
    LogCategory[LogCategory["TRANSACTIONS"] = 1] = "TRANSACTIONS";
})(LogCategory = exports.LogCategory || (exports.LogCategory = {}));
/**
 * Convert a log category to a string
 */
function logCategoryToString(category) {
    switch (category) {
        case LogCategory.SYNC: {
            return 'Sync';
        }
        case LogCategory.TRANSACTIONS: {
            return 'Transactions';
        }
    }
}
exports.logger = new Logger();
