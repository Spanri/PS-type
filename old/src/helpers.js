"use strict";

/** @see module:helpers */
/** @module helpers */

/**
 * Общие ошибки.
 * @function
 * @param {} res - response
 */
export function dberr(res) {
    res.status(500).send({
        status: 'error',
        message: 'Database error',
        message2: err.message
    });
}

/**
 * Для change js.
 * @function
 * @param {} res - response
 */
export function ok(res) {
    return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    }); 
}

/**
 * Для авторизации.
 * @function
 * @param {} res - response
 */
export function notFound(res) {
    return res.status(404).send({
        status: 'error',
        message: 'User not found'
        });
}

/**
 * Для валидации по токену (время жизни - 10 дней).
 * @function
 * @param {} res - response
 */
export function valerr(res,err){
    if (err.name === 'ValidationError') {
        const firstErr = err.errors[Object.keys(err.errors)[0]];
        let message = 'Unexpected error';
        if (firstErr.kind === 'unique') message = 'User with this username already exists';
        else if (firstErr.message) message = firstErr.message;
        return res.status(400).send({
            status: 'error',
            message
        });
    }
    if (err.name === 'CastError') {
        return res.status(400).send({
            status: 'error',
            message: err.message
        });
    }
    return dberr(res);
}