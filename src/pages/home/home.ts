import { NavController } from 'ionic-angular';
import {
  Component,
  ComponentRef,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  NgZone,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  BaseArrayClass,
  LocationService,
  MyLocation,
  Marker,
  MarkerOptions,
  GoogleMapsAnimation,
  HtmlInfoWindow
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
            'myLocation': true,   // (blue dot)
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
          });
        });

        /*var marker2 = this.map.addMarker({
          title: 'Marcador Inicializado com Mapa',
          icon: 'green',
          position: { lat: -30.020036, lng: -51.191368 }
        }).then((marker2: Marker) => {
          this.onMarkerClickHtml(marker2);
        });*/

      });
    } catch(error){
      alert("Map Error " + error);
    };
  }

  tapEvent(e) {
    this.map.clear();
    // Get the location of you
    this.map.getMyLocation().then((myLocation: MyLocation) => {

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: myLocation.latLng,
          zoom: 16,
          tilt: 0,
          duration: 500
        });
      });

  }

  tap2Event(e){
    this.map.addMarker({
      title: 'Recriado Marcador Inicializado com Mapa',
      icon: 'green',
      position: { lat: -30.020290, lng: -51.190161 }
    }).then((marker3: Marker) => {
      this.onMarkerClickHtml(marker3);
    });

    this.map.addMarker({
      title: 'Marcador Botão',
      icon: 'blue',
      draggable: true,
      position: { lat: -30.020513, lng: -51.192436 }
    }).then((marker4: Marker) => {
      this.onMarkerClickHtml(marker4);
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

  onMarkerClickHtml(marker : Marker){
    let htmlInfoWindow = new HtmlInfoWindow();
    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = [
      '<h3>' + marker.getTitle() + '</h3>',
      '<img src="assets/imgs/logo.png" style="height: 50%;width: 50%">',
      '<button ion-button color="blue" round>Azul</button>',
      '<button ion-button color="red" round>Vermelho</button>'
    ].join("");
    frame.getElementsByTagName("button")[0].addEventListener('click', () => {
      htmlInfoWindow.setBackgroundColor('blue');
    });
    frame.getElementsByTagName("button")[1].addEventListener('click', () => {
      htmlInfoWindow.setBackgroundColor('red');
    });
    htmlInfoWindow.setContent(frame, {width: '300px', height: '250px'});

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      marker.hideInfoWindow();
      htmlInfoWindow.open(marker);
    });
  };

  deleteMarker(marker : Marker){
    marker.remove();
  }

}
