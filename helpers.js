"use strict";

export function dberr(res) {
    res.status(500).send({
        status: 'error',
        message: 'Database error'
    });
}