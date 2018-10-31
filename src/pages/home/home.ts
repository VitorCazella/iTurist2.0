import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
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
      const latlng = { lat: -30.021136, lng: -51.191369};

      this.mapElement = document.getElementById('map');

      let GoogleMapOption: GoogleMapOptions = {
        camera:{
          target: latlng
        },
        zoom: 15,
        tilt: 30
      }

      this.map = GoogleMaps.create(this.mapElement, GoogleMapOption);

      this.map.one(GoogleMapsEvent.MAP_READY).then(
        () => {
          alert("Mapa pronto!");

          this.map.addMarker({
            title: 'Você está aqui!',
            icon: 'blue',
            animation: 'DROP',
            position: latlng
          });
        }
      );

    }catch(error){
      alert("Map Error " + error);
    };
  }

}
