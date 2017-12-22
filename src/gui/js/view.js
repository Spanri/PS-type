"use strict"

$(document).ready(function () {

    $("#login").css("width",`${$("#password").width()+16}`);
    window.onresize = function(e){
        $("#login").css("width",`${$("#password").width()+16}`);
    }

    $('#username, #password, #username2').focus(function(){
        $(this).attr('placeholder','');
    });
    $('#username').focusout(function(){
        $(this).attr('placeholder','Логин');
    });
    $('#password').focusout(function(){
        $(this).attr('placeholder','Пароль');
    });
    $('#username2').focusout(function(){
        $(this).attr('placeholder','Username');
    });

    $("#hide").click(()=>{
        let panel = $("#interface").children();
        if($("#hello").css("display") == "block"){
            $("#line").css("min-width","30px !important");
            for(let i=0;i<panel.length;i++) panel[i].style.display = "none";
            $("#hide").css("display","block");
            $("#hide").html("Открыть");
        }
        else{
            for(let i=0;i<panel.length;i++) panel[i].style.display = "block";
            $("#hide").css("display","block");
            $("#hide").html("Закрыть");
        }
    });

    //назад
    $("#back").click(()=>{
        var all = window.all;
        $("#map").css("display","none");
        $("tr, #data p").remove();
        $("table").append(`<tr><th>Username</th><th>Age</th><th>Sex</th><th>Статистика</th></tr>`);
        for (let k = 0; k < all.length; k++)
            $("table").append(`<tr><td>${all[k].username}</td><td>${all[k].age}</td><td>${all[k].sex}</td><td>${all[k].obr.type}</td></tr>`);
        $("table tr").addClass("user");
    });

    $("#username2").focus(()=>{
        $("#search2").css("fill","white");
    });

    $("#username2").blur(()=>{
        $("#search2").css("fill","#827717");
        $("#search2").css("transition","fill 0.3s ease-out");
    });
});