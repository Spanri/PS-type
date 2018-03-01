"use strict";

//There is func for input error

//common error
export function dberr(res) {
    res.status(500).send({
        status: 'error',
        message: 'Database error',
        message2: err.message
    });
}

//for change.js
export function ok(res) {
    return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    }); 
}

//for authorization
export function notFound(res) {
    return res.status(404).send({
        status: 'error',
        message: 'User not found'
        });
}

//for validation of token (time of life - 10days) ???
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