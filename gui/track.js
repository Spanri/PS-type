"use strict"

const User = require('../src/models/user');

console.log('sdfg');

$(document).ready(async ()=>{
    var all = await User.find({}).exec();
    for(i in all)
        $("#tr").append(`<p>${all[i]}</p>`);
});
