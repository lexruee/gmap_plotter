function Gmap() {
    this.map = null;
    this.markers = [];
    this.load();
};

Gmap.prototype.load = function (){
    var that = this;
    function initialize() {
        var mapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(46.946506, 7.444150) // default is Bundeshaus :-)
        };
        that.map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
};

Gmap.prototype.clear_map = function () {
    var that = this;
    $.each(this.markers, function(i, marker){
        marker.setMap(null);
    });
    this.markers = [];
}

Gmap.prototype.set_center = function (point) {
    var lat_lng = new google.maps.LatLng(point[0],point[1]);
    this.map.setCenter(lat_lng);
};

Gmap.prototype.set_zoom = function (zoom) {
    this.map.setZoom(parseInt(zoom));
};

Gmap.prototype.add_markers = function (points) {
    var that = this;
    $.each(points, function (i, point) {
        var marker = new google.maps.Marker({
            position: point,
            map: that.map
        });
        that.markers.push(marker);
    })
};

Gmap.prototype.add_path = function (points) {
    var path = new google.maps.Polyline({
        path: points,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: this.map
    });
    this.markers.push(path);
};

Gmap.prototype.helper_center_of_gravity = function (points) {
    var acc = [0, 0];
    $.each(points, function (i, ele) {
        var n_lat = acc[0] + ele[0];
        var n_lng = acc[1] + ele[1];
        acc = [ n_lat, n_lng];
    });
    var len = points.length * 1.0;
    return [ acc[0] / len, acc[1] / len]
};

Gmap.prototype.plot = function (points, options) {

    if(points == null || points.length == 0)
        return;

    var that = this;
    var center = this.helper_center_of_gravity(points);
    this.set_center(center);
    this.clear_map();

    var new_points = $.map(points, function (ele, i) {
        var lat = ele[0];
        var lng = ele[1];
        return new google.maps.LatLng(lat, lng);
    });

    if(options['type'] == 'markers'){
        gmap.add_markers(new_points);
    }else if(options['type'] == 'path'){
        gmap.add_path(new_points);
    }
    
};

Gmap.prototype.set_map_type = function (type) {
    this.map.setMapTypeId(type);
};

var gmap = new Gmap();


// hooks

$('#set-satellite').click(function () {
   gmap.set_map_type(google.maps.MapTypeId.SATELLITE);
});


$('#set-roadmap').click(function () {
    gmap.set_map_type(google.maps.MapTypeId.ROADMAP);
});


$('#set-hybrid').click(function () {
    gmap.set_map_type(google.maps.MapTypeId.HYBRID);
});


$('#set-terrain').click(function () {
    gmap.set_map_type(google.maps.MapTypeId.TERRAIN);
});


$.each(['markers', 'path'],function(i, ele){

    $('#plot-' + ele).click(function () {
        $('#plot-' + ele + '-modal').modal('show');
    });

    $('.plot-' + ele + '-button').click(function () {
        var data = $('#plot-data-' + ele).val();
        var points = $.parseJSON( data );
        gmap.plot(points, { type: ele });
    });

});

$('#plot-file').click(function () {
    $('#plot-file-modal').modal('show');
});

$('.plot-file-button').click(function () {
    var data = $('#plot-data-file').val();

    $('#file-upload').submit(function (e) {
        var file = document.getElementById('plot-data-file').files[0];
        var data = new FormData();
        var type = $('input[name=plot-type]:checked').val();
        data.append('file',file);
        data.append('plot-type', type)

        $.ajax({
            type: 'POST',
            url: '/upload',
            data: data,
            processData: false,
            contentType: false,
            success: function(data){
                var hash = data;
                var points = hash['points'];
                var type = hash['plot-type'];
                gmap.plot(points, { type: type });
                return false;
            }
        });
        e.preventDefault();
        return false;
    });

    $('#file-upload').trigger('submit');

});


$('.ui.radio.checkbox').checkbox();
