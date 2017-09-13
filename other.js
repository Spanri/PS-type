// userSchema.pre('save', function(next) {
//   console.log("presave");
//   var user = this;
//   if (!user.isModified('password')) {
//     console.log("not modified");
//     return next();
//   }
//   bcrypt.genSalt(10, function(err, salt) {
//       if (err) return next(err);
//       bcrypt.hash(user.password, salt, function(err, hash) {
//           if (err) return next(err);
//           user.password = hash;
//           next();
//       });
//   });
// });

//токены для запросов в постмане, пользователи asdfgh
//vk eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHZrIjoiYXNkZmdoIiwiX2lkIjoiNTk2NTNjYzM2NzA5MzExOTQ0YzRhZjlmIiwiaWF0IjoxNDk5ODA2OTE2LCJleHAiOjE1MDA2NzA5MTZ9.a1tV8GwWQhtzZ89F3kkNYLlRoE10VbOx8MkMxjTGDFU
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZGZnaCIsIl9pZCI6IjU5NjUzZWE1NjcwOTMxMTk0NGM0YWZhMCIsImlhdCI6MTQ5OTgwNzM5NywiZXhwIjoxNTAwNjcxMzk3fQ.Ww4xxFd65Oez0hVPED4mH4NaiVn9IeD8Hl0DckjEdJY

//User.update({ username: user.username }, { $set: { age: req.body.age } }, function (err) { }); 