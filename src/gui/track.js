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
                                $("table").append(`<tr><th>Username</th><th>Age</th><th>Sex</th><th>Статистика</th></tr>`);
                                for (let k = 0; k < all.length; k++)
                                    $("table").append(`<tr><td>${all[k].username}</td><td>${all[k].age}</td><td>${all[k].sex}</td><td>${all[k].obr.type}</td></tr>`);
                                $("table tr").not('table th').addClass('user');
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
            $("tr,#data p").remove();
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
        // let user = $()
        search($('#username2').val());  
    });

    //карты
    var map;
    $("#mapbut").click(()=>{
        $("ymaps").remove();
        ymaps.ready(init);
    
        function init(){     
            map = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });
        }
    
        $("tr, #data p").remove();
        $("#map").css('display','block');
        for (let k = 0; k < all.length; k++)
            $("#data").append(`<p>${all[k].username}</p>`);
        $("#data p").addClass('mapUser');
    });

    $('#hide').click(()=>{
        let panel = $('#interface').children();
        if($('#hello').css('display') == 'block'){
            $('#line').css('min-width','30px !important');
            for(let i=0;i<panel.length;i++) panel[i].style.display = 'none';
            $('#hide').css('display','block');
            $('#hide').html('Открыть');
        }
        else{
            for(let i=0;i<panel.length;i++) panel[i].style.display = 'block';
            $('#hide').css('display','block');
            $('#hide').html('Закрыть');
        }
    });

    //назад
    $("#back").click(()=>{
        $("#map").css('display','none');
        $("tr, #data p").remove();
        $("table").append(`<tr><th>Username</th><th>Age</th><th>Sex</th><th>Статистика</th></tr>`);
        for (let k = 0; k < all.length; k++)
            $("table").append(`<tr><td>${all[k].username}</td><td>${all[k].age}</td><td>${all[k].sex}</td><td>${all[k].obr.type}</td></tr>`);
        $("table tr").addClass('user');
    });

    $(document).on("click",".user",function(){
        let user = $(this).children()[0];
        search(user.innerHTML);
    });

    $(document).on("click",".mapUser",async function(){
        let name = this.innerHTML;
        let geometry = Array();

        for (let k = 0; k < all.length; k++)
            if (name == all[k].username) {
                for(let i = 0;i<all[k].longitude.length;i++){
                    await geometry.push([all[k].longitude[i],all[k].latitude[i]]);
                }
                break;
            }

        let properties = {balloonContent: "Ломаная линия"};
        let options = {
            balloonCloseButton: false,
            // Цвет линии.
            strokeColor: "#000000",
            // Ширина линии.
            strokeWidth: 4,
            // Коэффициент прозрачности.
            strokeOpacity: 0.5
        };
        var polyline = new ymaps.Polyline(
            geometry,
            properties,
            options
        );
        map.geoObjects.add(polyline);
        // map.container.fitToViewport();

        // polyline.editor.startEditing();
    });

    $('#username2').focus(()=>{
        $('#search2').css('fill','white');
    });

    $('#username2').blur(()=>{
        $('#search2').css('fill','#827717');
        $('#search2').css('transition','fill 0.3s ease-out');
    });
});
