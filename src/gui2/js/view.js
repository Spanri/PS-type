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

    $("#username2").focus(()=>{
        $("#search2").css("fill","white");
    });

    $("#username2").blur(()=>{
        $("#search2").css("fill","#76b151");
        $("#search2").css("transition","fill 0.3s ease-out");
    });

    if (matchMedia) {
        const mq = window.matchMedia("(min-width: 640px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
      }
      
      // media query change
      function WidthChange(mq) {
        if (mq.matches) {
            $("#mapbut").val("Треки на карте").css("background-image", "none")
                .width('auto').height('auto');
            $("#back").val("Все пользователи").css("background-image", "none")
                .width('auto').height('auto');
        } else {
            $("#mapbut").val("").css("background-image", "url('../map.png')").width('36px').height('32px')
                .css("background-size","36px 32px").css("background-position","center");
            $("#back").val("").css("background-image", "url('../table.png')").width('36px').height('32px')
                .css("background-size","36px 32px").css("background-position","center");
        }
    }
});