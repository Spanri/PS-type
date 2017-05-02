"use strict";

export function dberr(res) {
    res.status(500).send({
        status: 'error',
        message: 'Database error'
    });
}

export function encerr(res) {
    res.status(500).send({
        status: 'error',
        message: 'Encryption error'
    });
}

export function invup(res) {
    res.status(400).send({
        status: 'error',
        message: 'Invalid username or password'
    });
}

export function invage(res) {
    res.status(400).send({
        status: 'error',
        message: 'Invalid age. (must be 14..110)'
    });
}

export function usralrex(res) {
    res.status(400).send({
        status: 'error',
        message: 'User already exists'
    });
}