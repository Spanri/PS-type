"use strict"

console.log('sdfg');

$(document).ready(function () {
    var token, all;
    $("#login").click(()=>{
        let username = $('#username').val();
        let password = $('#password').val();
        $.post('/api/v1/signin', { "username": username, "password": password }, (auth) => {
            token = auth.token;
            $.post('/api/v1/data',
                { "token": token },
                (data) => {
                    if (data.username == 'admin0' || data.username == 'id136955296') {
                        $("#auth").css('display','none');
                        $("#hello").html('Admin`s panel');
                        $("#panel").css('display','block');
                        $.post('/api/v1/data/all',
                            { "token": token },
                            (dataAll) => {
                                all = dataAll.all;
                                console.log(dataAll.all);
                                for (let k = 0; k < all.length; k++)
                                    $("#data").append(`<p>${all[k].username}</p>`);
                            }).fail(function (response, status, error) {
                                console.log('Error: ' + response.responseText);
                            });
                    }
                    else $("#tr").html('Ok, but you are not admin:^(');
                }).fail(function (response, status, error) {
                    console.log('Error: ' + response.responseText);
                    $("#tr").html(error);
                });
        }).fail(function (response, status, error) {
            console.log('Error: ' + response.responseText);
            $("#tr").html(error);
        });
    });
    $("#watch").click(()=>{
        var i = -1;
        let name = $('#username2').val();
        for (let k = 0; k < all.length; k++)
            if (name == all[k].username) {
                i = k;
                var all2 = {
                    'username': all[i].username,
                    'age': all[i].age,
                    'date': all[i].date,
                    'latitude': all[i].latitude,
                    'longitude': all[i].longitude,
                    'type': all[i].obr.type,
                    'date': all[i].obr.date,
                    'sex': all[i].sex,
                    'speed': all[i].speed
                };
                all2.latitude = all2.latitude.toString().replace(/,/g,' ');
                all2.longitude = all2.longitude.toString().replace(/,/g,' ');
                all2.speed = all2.speed.toString().replace(/,/g,' ');
                $("#data p").remove();
                for (var el in all2) $("#data").append(`<p>${el}: ${all2[el]}</p>`);
            }
        if(i==-1) $("#data").append(`<p>User not found</p>`);
            
    });

    
//     var all = await User.find({}).exec();
//     for(i in all)
//         $("#tr").append(`<p>${all[i]}</p>`);
});
