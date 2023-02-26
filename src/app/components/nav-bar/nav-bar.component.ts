import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor() {
    
  }

  navbarGidContainer = [
    'home',
    'firebase',
    'search',
    '',
  ];




  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.navbarGidContainer, event.previousIndex, event.currentIndex);
  }


  ngOnInit() {}

  navExpanded = false;
  navHeight = '0px';
  expanNavbar(){
    this.navHeight = this.navExpanded ? '0vh' : '20vh';
    this.navExpanded = this.navExpanded ? false : true;
  }

}
