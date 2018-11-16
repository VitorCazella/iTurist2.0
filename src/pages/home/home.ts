import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LocationService,
  MyLocation,
  Marker,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  mapElement: HTMLElement;

  markerMain = new google.maps.Marker({
      position: myLocation.latLng,
      icon: 'assets/imgs/avatar.png',
      title: 'Você está aqui!',
      animation: GoogleMapsAnimation.BOUNCE
  });

  constructor(public navCtrl: NavController, public GoogleMaps: GoogleMaps) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    try{
      LocationService.getMyLocation().then((myLocation: MyLocation) => {
        //const latlng = { lat: -30.021136, lng: -51.191369};

        this.mapElement = document.getElementById('map');

        let GoogleMapOption: GoogleMapOptions = {
          camera:{
            target: myLocation.latLng
          },
          zoom: 10,
          controls: {
            'compass': true,
            'myLocationButton': false,
            'myLocation': false,   // (blue dot)
            'indoorPicker': true,
            'zoom': false,          // android only
            'mapToolbar': false     // android only
          },
          styles: [
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{"visibility": "off"}]
              },
              {
                "featureType": "poi",
                "stylers": [{"visibility": "on"}]
              },
              {
                "featureType": "poi",
                "elementType": "labels.icon"
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
              },.addMarker
              {
                "featureType": "transit",
                "stylers": [{"visibility": "off"}]
              }
          ]
        }

        this.map = GoogleMaps.create(this.mapElement, GoogleMapOption);

        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          return this.map.animateCamera({
            target: myLocation.latLng,
            zoom: 12
          });
          map.addListener('click', function(event) {
            addMarker(event.latLng);
          });
        });

        this.map.addMarker({
          title: 'Marcador Inicializado com Mapa',
          icon: 'green',
          position: { lat: -30.020290, lng: -51.190161 }
        }).then((marker2: Marker) => this.onMarkerClick );

        this.markerMain.setMap(this.map);
      });
    } catch(error){
      alert("Map Error " + error);
    };
  }

  tapEvent(e) {
    this.markerMain.setMap(null);

    // Get the location of you
    this.map.getMyLocation().then((myLocation: MyLocation) => {

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: myLocation.latLng,
          zoom: 15,
          duration: 500
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            icon: 'assets/imgs/avatar.png',
            title: 'Você está aqui!',
            position: myLocation.latLng,
            animation: GoogleMapsAnimation.BOUNCE
<<<<<<< HEAD
          }).then((markerMain: Marker) => this.onMarkerClick);
=======
          }).then(this.onMarkerClick);
>>>>>>> 15ed15656eb48aea446c1b617851d51b88a257be
        })
      });
  }

<<<<<<< HEAD
  onMarkerClick(marker : Marker){
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert("Marcador : " + marker.getTitle());
    });
  }

  tap2Event(e){
    this.map.addMarker({
      title: 'Marcador Inicializado com Mapa',
      icon: 'green',
      position: { lat: -30.020290, lng: -51.190161 }
    }).then((marker2: Marker) => this.onMarkerClick );

    this.map.addMarker({
      title: 'Marcador Botão',
      icon: 'blue',
      draggable: true,
      position: { lat: -30.020513, lng: -51.192436 }
    }).then((marker1: Marker) => { this.onMarkerClick });
=======
  onMarkerClick(marker: Marker){
    marker.one(GoogleMapsEvent.MARKER_CLICK).then(() => {
      alert(marker.getTitle());
    });
  }

  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markers.push(marker);
>>>>>>> 15ed15656eb48aea446c1b617851d51b88a257be
  }

}
