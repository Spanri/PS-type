"use strict"

$(document).ready(function () {
    var token, all;
    $("#login").click(()=>{
        console.log('click');
        let username = $('#username').val();
        let password = $('#password').val();
        $.post('/api/v1/signin', { "username": username, "password": password }, (auth) => {
            console.log('sigin');
            token = auth.token;
            $.post('/api/v1/data',
                { "token": token },
                (data) => {
                    if (data.username == 'admin0' || data.username == 'id136955296') {
                        console.log('admin0');
                        $("#auth").css('display','none');
                        $("#interface").css('display','block');
                        $("#hello").css('display','block');
                        $("#line").css('height','auto');
                        $("#panel").css('display','block');
                        $.post('/api/v1/data/all',
                            { "token": token },
                            (dataAll) => {
                                all = dataAll.all;
                                console.log(dataAll.all);
                                for (let k = 0; k < all.length; k++)
                                    $("#data").append(`<p>${all[k].username}</p>`);
                                $("#data p").addClass('user');
                            }).fail(function (response, status, error) {
                                console.log('Error: ' + response.responseText);
                                $("#error").html(error);
                                $("#error").css('display','block');
                                setInterval(()=>{
                                    $("#error").css('display','none');
                                },3000);
                            });
                    }
                    // else $("#tr").html('Ok, but you are not admin:^(');
                    else {
                        $("#error").html('Круто, но ты не админ:^(');
                        $("#error").css('display','block');
                        setInterval(()=>{
                            $("#error").css('display','none');
                        },2000);
                    }
                }).fail(function (response, status, error) {
                    console.log('Error: ' + response.responseText);
                    // $("#tr").html(error);
                    $("#error").html(error);
                    $("#error").css('display','block');
                    setInterval(()=>{
                        $("#error").css('display','none');
                    },3000);
                });
        }).fail(function (response, status, error) {
            console.log('Error: ' + response.responseText);
            // $("#tr").html(error);
            $("#error").html(error);
            $("#error").css('display','block');
            setInterval(()=>{
                $("#error").css('display','none');
            },2000);
        });
    });
    var search = function(name){
        var i = -1;
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
            $("#base").css('height','auto')
            
        }
        if (i == -1) { 
            $("#error").html('Пользователь не найден');
            $("#error").css('display','block');
            setInterval(()=>{
                $("#error").css('display','none');
            },2000);
        }
    }

    $("#search").click(()=>{
        $("#map").css('display','none');
        search($('#username2').val());  
    });

    //карты
    ymaps.ready(init);
    var map;

    function init(){     
        map = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
        });
    }

    $("#mapbut").click(()=>{
        $("#data p").remove();
        $("#map").css('display','block');
        for (let k = 0; k < all.length; k++)
            $("#data").append(`<p>${all[k].username}</p>`);
        $("#data p").addClass('mapUser');
    });

    //назад
    $("#back").click(()=>{
        $("#map").css('display','none');
        $("#data p").remove();
        for (let k = 0; k < all.length; k++)
            $("#data").append(`<p>${all[k].username}</p>`);
        $("#data p").addClass('user');
    });

    $(document).on("click",".user",function(){
        search(this.innerHTML);
    });
});
