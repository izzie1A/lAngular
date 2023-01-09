import { Component, OnInit, ViewChild } from '@angular/core';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {
  constructor() { }

  panelOpenState = false;

  @ViewChild(MapInfoWindow)
  infoWindow!: MapInfoWindow;
  

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  display: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 10;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng!!) {
      this.center = (event.latLng.toJSON());
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng!!) {
      this.display = event.latLng.toJSON();
    }
  }
  zoomChange() {
    console.log(this.options.zoom)
    this.zoom = this.zoom + 0.1
  }

  // add marker
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerPositionsBakup: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.pop();
    this.markerPositions.push(event.latLng!!.toJSON());
  }

  // info Window
  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  options: google.maps.MapOptions = {
    center: { lat: 51.5, lng: 0 },
    mapId: '37180c3ba212c059',
    gestureHandling: "greedy",
    // ui
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    // ui
    // map limit
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        east: 180,
        west: -180,
      },
    },
    // map limit
  };

  // navBar
  navExpanded = false;
  navHeight = '0px';
  expanNavbar(){
    this.navHeight = this.navExpanded ? '0px' : '200px';
    this.navExpanded = this.navExpanded ? false : true;
  }
  // navBar

  ngOnInit(): void {
  }

}
