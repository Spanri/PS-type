"use strict";

export function dberr(res) {
    res.status(500).send({
        status: 'error',
        message: 'Database error'
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
