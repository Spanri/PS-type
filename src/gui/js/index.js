"use strict"

$(document).ready(function () {

    var all, token;
    $("#login").click(()=>{
        let username = $("#username").val();
        let password = $("#password").val();
        $.post("/api/v1/signin", { "username": username, "password": password }, (auth) => {
            console.log("Авторизация успешна");
            token = auth.token;
            $.post("/api/v1/data",
                { "token": token },
                (data) => {
                    if (data.username == "admin0" || data.username == "id136955296") {
                        console.log("Загрузка данных");
                        $("#auth").css("display","none");
                        $("#base").css("display","grid").css("background-image","none");
                        $("#interface").css("display","block");
                        $("#hello").css("display","block");
                        $("#line").css("height","auto");
                        $("#panel").css("display","block");
                        $.post("/api/v1/data/all",
                            { "token": token },
                            (dataAll) => {
                                all = dataAll.all;
                                window.all = all;
                                console.log(window.all);
                                $("table").append(`<tr><th>Username</th><th>Age</th><th>Sex</th><th>Статистика</th></tr>`);
                                for (let k = 0; k < all.length; k++)
                                    $("table").append(`<tr><td>${all[k].username}</td><td>${all[k].age}</td><td>${all[k].sex}</td><td>${all[k].obr.type}</td></tr>`);
                                $("table tr").not("table th").addClass("user");
                            }).fail(function (response, status, error) {
                                console.log("Error: " + response.responseText);
                                $("#error").html(error);
                                $("#error").css("display","block");
                                setInterval(()=>{
                                    $("#error").css("display","none");
                                },3000);
                            });
                    }
                    else {
                        $("#error").html("Круто, но ты не админ:^(");
                        $("#error").css("display","block");
                        setInterval(()=>{
                            $("#error").css("display","none");
                        },2000);
                    }
                }).fail(function (response, status, error) {
                    console.log("Error: " + response.responseText);
                    $("#error").html(error);
                    $("#error").css("display","block");
                    setInterval(()=>{
                        $("#error").css("display","none");
                    },3000);
                });
        }).fail(function (response, status, error) {
            console.log("Error: " + response.responseText);
            $("#error").html(error);
            $("#error").css("display","block");
            setInterval(()=>{
                $("#error").css("display","none");
            },2000);
        });
    });
    
    var search = function(name){
        var i = -1;
        for (let k = 0; k < all.length; k++)
        if (name == all[k].username) {
            i = k;
            var all2 = {
                "username": all[i].username,
                "age": all[i].age,
                "date": all[i].date,
                "latitude": all[i].latitude,
                "longitude": all[i].longitude,
                "type": all[i].obr.type,
                "date": all[i].obr.date,
                "sex": all[i].sex,
                "speed": all[i].speed
            };
            all2.latitude = all2.latitude.toString().replace(/,/g," ");
            all2.longitude = all2.longitude.toString().replace(/,/g," ");
            all2.speed = all2.speed.toString().replace(/,/g," ");
            $("tr,#data p").remove();
            for (var el in all2) $("#data").append(`<p>${el}: ${all2[el]}</p>`);
            $("#base").css("height","auto");
            
        }
        if(i == -1){
            $("#error").html("Пользователь не найден");
            $("#error").css("display","block");
            setInterval(()=>{
                $("#error").css("display","none");
            },2000);
        }
    }

    $("#search").click(()=>{
        $("#map").css("display","none");
        search($("#username2").val());
    });

    $(document).on("click",".user",function(){
        let user = $(this).children()[0];
        search(user.innerHTML);
    });
});
