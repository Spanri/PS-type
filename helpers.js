"use strict";

export function dberr(res) {
    res.status(500).send({
        status: 'error',
        message: 'Database error',
        message2: err.message
    });
}

export function ok(res) {
    return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    }); 
}

export function notFound(res) {
    return res.status(404).send({
        status: 'error',
        message: 'User not found'
        });
}

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
