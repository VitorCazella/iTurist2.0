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
            'myLocationButton': true,
            'myLocation': true,   // (blue dot)
            'indoorPicker': true,
            'zoom': false,          // android only
            'mapToolbar': true     // android only
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
              },
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
          }).then(() => {
            // add a marker
            return this.map.addMarker({
              icon: 'assets/imgs/avatar.png',
              title: 'Você está aqui!',
              snippet: '|______|',
              position: myLocation.latLng,
              animation: GoogleMapsAnimation.DROP
            });
          })
        });
      });
    } catch(error){
      alert("Map Error " + error);
    };
  }

  onButtonClick() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((myLocation: MyLocation) => {

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: myLocation.latLng,
          zoom: 16,
          bearing: 140,
          duration: 2000
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            icon: 'assets/imgs/avatar.png',
            title: 'Você está aqui!',
            snippet: '|______|',
            position: myLocation.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        })
      });
  }

}
