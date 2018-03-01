"use strict"

$(document).ready(function () {
    var all = window.all;

    var map;
    function initMap() {
        var myLatlng = new google.maps.LatLng(55.751244, 37.618423);
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatlng,
            zoom: 10
        });
    }

    $("#mapbut").click(()=>{
        var all = window.all;
        $("#data *").remove();
        initMap();
        $("#map").css("display","block");
        for (let k = 0; k < all.length; k++)
            $("#data").append(`<p>${all[k].username}</p>`);
        $("#data p").addClass("mapUser");
    });

    var flightPath;
    $(document).on("click",".mapUser",async function(){
        var all = window.all;
        console.log(flightPath);
        if(flightPath) flightPath.setMap(null);
        let name = this.innerHTML;
        let geometry = Array();

        for (let k = 0; k < all.length; k++)
            if (name == all[k].username) {
                for(let i = 0;i<all[k].longitude.length;i++){
                    await geometry.push({'lat':all[k].latitude[i],'lng':all[k].longitude[i]});
                }
                break;
            }
        flightPath = new google.maps.Polyline({
            path: geometry,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        flightPath.setMap(map);
    });
});