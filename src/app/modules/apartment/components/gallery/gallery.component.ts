import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'smart-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  @Input() galleryItem: any;



}
