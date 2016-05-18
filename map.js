function initMap() {
  var munich = new google.maps.LatLng(48.150618, 11.581317);
  var berlin = new google.maps.LatLng(52.512601, 13.321778);
  var teamarray = [];
  window.infowindow = new google.maps.InfoWindow();


  var mapOptions = {
      center: munich,
      zoom: 4,
      styles: mapstyle(),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
    };

  this.map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

  var teams = getDataJson();
  drawRoute(teams);

//Startmarker
  // var marker = new google.maps.Marker({
  //   position: munich,
  //   map: map,
  //   title: 'Breakout Map'
  // });
};


//Map Night-Daystyle
function mapstyle (){
  var date = new Date();
  var day_map = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}];
  var night_map = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}];
  var hour = date.getHours();
  if(6 < hour && hour < 21) {
    return day_map;
  } else { 
  return night_map;    
  }
};

// Get all team-data
var getDataJson = function (){
  console.log(data);
  return data;
};

// Draw the route of each team
var drawRoute = function (teams){
  teams.forEach(function (team){
      console.log(team);
      var startingposition = new google.maps.LatLng(team.event.startingLocation.latitude, team.event.startingLocation.longitude);
      var route = [startingposition];          
      var i;

      for (i = 0; i < team.locations.length; i++) {
        route.push(new google.maps.LatLng(team.locations[i].latitude, team.locations[i].longitude));
      }

      var flightPath = new google.maps.Polyline({
        path:route,
        strokeColor: getColor(team),
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      marker(team.locations, team, map, flightPath);

      flightPath.setMap(map); 
  });
};


//Marker on last position
function marker(coords, team, map, flightPath) {
  var marker;
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(coords[coords.length-1].latitude, coords[coords.length-1].longitude),
    map: map
  });

      
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(makeContent(team));
    infowindow.open(map, marker);
  });
  google.maps.event.addListener(flightPath, 'click', function() {
    infowindow.setContent(makeContent(team));
    infowindow.open(map, marker);
  });
};



//Window that shows on a marker
function makeContent(team) {
  var contentstring = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h4 id="firstHeading" class="firstHeading">' + team.name + '</h4>'+
    '<p><b>' + team.members[0].firstname + ' und ' + team.members[1].firstname + ', aus ' + team.event.city + '</b></p></div>'
  console.log(contentstring);  
  return contentstring;
};



//Select Teamcolor for Munich/Berlin
function getColor(team) {
  var colorlist = {
    "Munich": '#FF0000',
    "Berlin": '#FFFF00' 
  };
  return colorlist[team.event.city];
}



