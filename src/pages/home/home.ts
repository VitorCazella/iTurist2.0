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
      LocationService.getMyLocation({ enableHighAccuracy: true }).then((myLocation: MyLocation) => {
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
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{visibility: 'off'}]
            }
          ]
        }

        this.map = GoogleMaps.create(this.mapElement, GoogleMapOption);

        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          return this.map.animateCamera({
            target: myLocation.latLng,
            zoom: 14
          })
        });

        /*var marker2 = this.map.addMarker({
          title: 'Marcador Inicializado com Mapa',
          icon: 'green',
          position: { lat: -30.020036, lng: -51.191368 }
        }).then((marker2: Marker) => {
          this.onMarkerClick(marker2);
        });*/

      });
    } catch(error){
      alert("Map Error " + error);
    };
  }

  tapEvent(e) {
    

    // Get the location of you
    this.map.getMyLocation().then((myLocation: MyLocation) => {

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: myLocation.latLng,
          zoom: 16,
          tilt: 0,
          duration: 500
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            icon: 'assets/imgs/avatar.png',
            title: 'Você está aqui!',
            position: myLocation.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          }).then((markerMain: Marker) => {
            this.onMarkerClick(markerMain);
          });
        })
      });

  }

  tap2Event(e){
    this.map.addMarker({
      title: 'Recriado Marcador Inicializado com Mapa',
      icon: 'green',
      position: { lat: -30.020290, lng: -51.190161 }
    }).then((marker3: Marker) => {
      this.onMarkerClick(marker3);
    });

    this.map.addMarker({
      title: 'Marcador Botão',
      icon: 'blue',
      draggable: true,
      position: { lat: -30.020513, lng: -51.192436 }
    }).then((marker4: Marker) => {
      this.onMarkerClick(marker4);
    });
  }

  tapTilt2(e){
    var target = this.map.getCameraTarget();

    return this.map.animateCamera({
      target: target,
      tilt: 0,
      duration: 1000
    });
  }

  tapTilt(e){
    var target = this.map.getCameraTarget();

    return this.map.animateCamera({
      target: target,
      tilt: 60,
      duration: 1000
    });
  }

  onMarkerClick(marker : Marker){
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert("Marcador : " + marker.getTitle());
    });
  };

  deleteMarker(marker : Marker){
    marker.remove();
  }

}
