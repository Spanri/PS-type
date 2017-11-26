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

//токены для запросов в постмане, пользователи asdfgh
//vk eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHZrIjoiYXNkZmdoIiwiX2lkIjoiNTk2NTNjYzM2NzA5MzExOTQ0YzRhZjlmIiwiaWF0IjoxNDk5ODA2OTE2LCJleHAiOjE1MDA2NzA5MTZ9.a1tV8GwWQhtzZ89F3kkNYLlRoE10VbOx8MkMxjTGDFU
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZGZnaCIsIl9pZCI6IjU5NjUzZWE1NjcwOTMxMTk0NGM0YWZhMCIsImlhdCI6MTQ5OTgwNzM5NywiZXhwIjoxNTAwNjcxMzk3fQ.Ww4xxFd65Oez0hVPED4mH4NaiVn9IeD8Hl0DckjEdJY
