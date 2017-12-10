(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict"

//const User = require('../src/models/user');
console.log('sdfg1');

$.post('api/v1/data',{token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlkMTM2OTU1Mjk2IiwiX2lkIjoiNWExZWYyZmZlZDViMWQwMDIxYTM4ZjI0IiwiaWF0IjoxNTExOTgzMDE2LCJleHAiOjE1MTI4NDcwMTZ9.OIt9GOcS1Dr55-EDqOPjx4-LmyqtQco5IbeBZy-pUhY'},(data)=>{
    console.log(data.name);
})

// $.post( "test.php", { func: "getNameAndTime" }, function( data ) {
//     console.log( data.name ); // John
//     console.log( data.time ); // 2pm
//   }, "json");

console.log('sdfg');

$(document).ready(async function(){
    var all = await User.find({}).exec();
    for(i in all)
        $("#tr").append(`<p>${all[i]}</p>`);
});

},{}]},{},[1]);
