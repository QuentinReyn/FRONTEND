   //LEEFLET MAP------------------------------------------------------------
   var map = L.map('map').setView([45.188529,5.724524],15);
   L.tileLayer("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=HMAnDWVYtYIU1MtAlx1X",{
       attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
   }).addTo(map);

   var cookIcon = L.icon({
           iconUrl : 'assets/images/markercustom.png',
           iconSize :  [38,38],
           className : 'marker'
   });

   var jessIcon = L.icon({
           iconUrl : 'assets/images/markercustom1.png',
           iconSize :  [38,38],
   });
   var clemIcon = L.icon({
           iconUrl : 'assets/images/markercustom2.png',
           iconSize :  [38,38],
           
   });
   var jetIcon = L.icon({
           iconUrl : 'assets/images/markercustom3.png',
           iconSize :  [38,38],
   });

 var tCookMarker = L.marker([45.190689,5.728987],{icon : cookIcon}).addTo(map).on('click',markerAnimation);
 var jessMarker = L.marker([45.18827,5.73036],{icon : jessIcon}).addTo(map);
 var clemMarker = L.marker([45.191536,5.722979],{icon : clemIcon}).addTo(map);
 var jetMarker = L.marker([45.184459,5.719459],{icon : jetIcon}).addTo(map);

 tCookMarker.bindPopup("<b> Agence Thomas Cook </b> <b style='color:#de351b'>(PRINCIPALE)</b>").openPopup();
 jessMarker.bindPopup("<b> Agence Jess Voyages </b>").openPopup();
 clemMarker.bindPopup("<b> Agence Clemenceau Voyages </b>").openPopup();
 jetMarker.bindPopup("<b> Agence Jet Tours </b>").openPopup();

 function markerAnimation(){

 }