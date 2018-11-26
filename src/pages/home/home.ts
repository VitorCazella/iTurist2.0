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
  HtmlInfoWindow,
  Polyline,
  PolylineOptions,
  ILatLng
} from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: HTMLElement;
  map: GoogleMap;

  start = 'chicago, il';
  end = 'chicago, il';

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

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
            'compass': false,
            'myLocationButton': false,
            'myLocation': true,     // (blue dot)
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
          ],
          gestures: {
           scroll: true,
           tilt: false,
           rotate: false,
           zoom: true
         }
        }

        this.map = GoogleMaps.create(this.mapElement, GoogleMapOption);

        this.directionsDisplay.setMap(this.mapElement);

        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          this.markerCreate();
          this.map.animateCamera({
            target: myLocation.latLng,
            zoom: 14
          });
        });

      });
    } catch(error){
      alert("Map Error " + error);
    };
  }

  tapEvent(e) {
    this.map.clear();
    this.markerCreate();
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
    this.markerCreate();
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

  markerCreate(){
    this.map.addMarker({
      title: 'Escola Técnica Santo Inácio',
      icon: 'green',
      position: { lat: -30.122553, lng: -51.176005 }
    }).then((markerSto: Marker) => {
      this.onMarkerClickHtml(markerSto);
    });

    this.map.addMarker({
      title: 'Praça Marechal Deodoro',
      icon: 'blue',
      autoPan: false,
      position: { lat: -30.032756, lng: -51.230186 }
    }).then((markerPraca: Marker) => {
      this.onMarkerClickHtml(markerPraca);
    });
  }

  onMarkerClickHtml(marker : Marker){
    let htmlInfoWindow = new HtmlInfoWindow();
    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = [
      '<h3>' + marker.getTitle() + '</h3>',
      '<img src="assets/imgs/logo.png" style="height: 50%;width: 50%">',
      '<button class="myButton">Rota</button>'
    ].join("");
    frame.getElementsByTagName("button")[0].addEventListener('click', () => {
      this.setRoute(marker.getPosition());
    });
    htmlInfoWindow.setContent(frame, {width: '300px', height: '250px'});

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      htmlInfoWindow.open(marker);
    });
  };

  deleteMarker(marker : Marker){
    marker.remove();
  }

  setRoute(marker: any) {
    this.map.getMyLocation().then((myLocation: MyLocation) => {
      this.directionsService.route({
        origin: myLocation.latLng,
        destination: marker.getPosition(),
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
