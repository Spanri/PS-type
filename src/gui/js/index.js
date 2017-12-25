"use strict"

$(document).ready(function () {

    var all = [], token;
    $("#login").click(()=>{
        let username = $("#username").val();
        let password = $("#password").val();
        $.post("/api/v1/signin", { "username": username, "password": password }, (auth) => {
            console.log("Пользователь найден");
            token = auth.token;
            $.post("/api/v1/data",
                { "token": token },
                (data) => {
                    if (data.username == "admin0" || data.username == "id136955296") {
                        console.log("Загрузка данных");
                        $("#auth").css("display","none");
                        $("#base").css("display","grid");
                        $("body").css("background","white");
                        $("#line").css("height","auto");
                        $.ajax({
                            type: "POST",
                            url: "/api/v1/data/all",
                            data: { "token": token },
                            success: (dataAll) => {
                                if (dataAll) {
                                    all = dataAll.all;
                                    window.all = all;
                                    console.log(window.all);
                                    tableUser();
                                    $("#preloader").hide();
                                }
                            },
                            fail: function (response, status, error) {
                                console.log("Error: " + response.responseText);
                                $("#error").html(error);
                                $("#error").css("display","block");
                                setInterval(()=>{
                                    $("#error").css("display","none");
                                },3000);
                            }
                        });
                    } else {
                        $("#error").html("Круто, но ты не админ:^(");
                        $("#error").css("display","block");
                        setInterval(()=>{
                            $("#error").css("display","none");
                        },3000);
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
                $("#data *").remove();
                $("#map").css("display","none");

                for (var el in all[k]) {
                    if (el == "_id" || el == "password") {
                        //ничего не делаем, то есть не пишем их
                    } else if (all[k][el] == ""){
                        $("#data").append(`<p>${el}: ---------</p>`);
                    } else if(el == "obr" || el == "track") {
                        for (var el2 in all[k][el]) {
                            if (all[k][el][el2] == "") {
                                $("#data").append(`<p>${el2}: ---------</p>`);
                            } else {
                                let repl = all[k][el][el2].toString().replace(/,/g,", ");
                                if (repl.length > 100) $("#data").append(`<div style="margin:15px;">${el2}: <input type="submit" class="bigData" value="Показать"><p style="display:none">${repl}</p></div>`);
                                else $("#data").append(`<p>${el2}: ${repl}</p>`);
                            }
                        }
                    } else {
                        let repl = all[k][el].toString().replace(/,/g,", ");
                        console.log(repl.length+" "+el);
                        if (repl.length > 100) $("#data").append(`<div style="margin:15px;">${el}: <input type="submit" class="bigData" value="Показать"><p style="display:none">${repl}</p></div>`);
                        else $("#data").append(`<p>${el}: ${repl}</p>`);
                    }
                }

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

    $(document).on("click",".bigData",function(){
        if ($(this).siblings().css("display") == "none") {
            $(this).siblings().css("display","block");
            $(this).val("Скрыть");
        } else {
            $(this).siblings().css("display","none");
            $(this).val("Показать");
        }
    });

    //таблица с пользователями
    function tableUser(){
        $("#data *").remove();
        $("#map").css("display","none");
        $("#data").append("<table></table>");
        $("table").append(`<tr><th>Имя</th><th>Username</th><th>Дата рождения</th><th>Пол</th><th>Статистика</th></tr>`);
        for (let k = 0; k < all.length; k++)
            $("table").append(`<tr><td>${all[k].name}</td><td>${all[k].username}</td><td>${all[k].age}</td><td>${all[k].sex}</td><td>${all[k].obr.type}</td></tr>`);
        $("table tr").addClass("user");
    }

    $("#back").click(()=>{
        tableUser();
    });

    $("#search").click(()=>{
        search($("#username2").val());
    });

    $(document).on("click",".user",function(){
        let user = $(this).children()[1];
        search(user.innerHTML);
    });
});
