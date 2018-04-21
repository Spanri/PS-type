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
    
    function searchInput(elem, n, k){
        let repl = elem.toString().replace(/,/g,", ");
        if (repl.length > 100) $("#data").append(`
            <div style="margin:15px">
                <div style="color:#408a7d;display:inline-block">${n}:</div>
                <input type="submit" class="bigData" value="Показать">
                <p class="${k}" style="display:none">${repl}</p>
            </div>`);
        else $("#data").append(`
            <div style="margin:15px">
                <div style="color:#408a7d;display:inline-block">${n}:</div> 
                <p class="${k}" style="margin:0;display:inline-block">${repl}</p>
                <input type="submit" class="change" value="Изменить">
            </div>`);
            
    }

    function search(name){
        var i = -1;
        for (let k = 0; k < all.length; k++)
            if (name == all[k].username) {
                i = k;
                $("#data *").remove();
                $("#map").css("display","none");
                function empty (element, k2) {
                    return `<div style="margin:15px">
                                <div style="color:#408a7d;display:inline-block">${element}:</div>
                                <p class="${k2}" style="margin:0;display:inline-block">---------</p>
                                <input type="submit" class="change" value="Изменить">
                            </div>`;
                }
                for (var el in all[k]) {
                    if (el == "_id" || el == "password") {
                        //ничего не делаем, то есть не пишем их
                    } else if (all[k][el] == ""){
                        $("#data").append(empty(el,all[k].username));
                    } else if(el == "obr" || el == "track" || el == "accel") {
                        for (var el2 in all[k][el]) {
                            if (all[k][el][el2] == "") $("#data").append(empty(el2,all[k].username));
                            else searchInput(all[k][el][el2],el2,all[k].username);
                        }
                    } else searchInput(all[k][el],el,all[k].username);
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

    //показать полную версию данных
    $(document).on("click",".bigData",function(){
        let elem = $(this).siblings()[1];
        if (elem.style.display == "none") {
            elem.style.display = "block";
            $(this).val("Скрыть");
        } else {
            elem.style.display = "none";
            $(this).val("Показать");
        }
    });

    //изменить данные
    $(document).on("click",".change",function(){
        if ($(this).val() == "Изменить"){
            let elem = $(this).siblings()[1].innerHTML;
            $(this).val("Ок");
            $(this).before(`<textarea style="margin-right:5px;min-height:auto">${$(this).siblings()[1].innerHTML}</textarea>`);
            $(this).siblings()[1].style.display="none";
        }
        else {
            $(this).val("Изменить");
            $(this).siblings()[1].style.display="inline-block";
            $(this).siblings()[1].innerHTML = $(this).siblings("textarea")[0].value;
            console.log($(this).siblings()[1]);
            console.log($(this).siblings("textarea")[0].value);
            $.post("/api/v1/data/changeAdmin", { "token": token, "usernameAuth": $(this).siblings()[1].className, "nameOfPar": $(this).siblings()[0].innerHTML, "data": $(this).siblings()[1].innerHTML})
                .fail(function (response, status, error) {
                    console.log("Error: " + response.responseText);
                    $("#error").html(error);
                    $("#error").css("display","block");
                    setInterval(()=>{
                        $("#error").css("display","none");
                    },3000);
                });
            $(this).siblings("textarea")[0].remove();
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
