"use strict"

import User from '../src/models/user';

console.log('sdfg');

(async () => {
    var all = await User.find({}).exec();
    console.log(all);
})
