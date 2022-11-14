import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'smart-image-wizard',
  templateUrl: './image-wizard.component.html',
  styleUrls: ['./image-wizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageWizardComponent implements OnInit {
  @Input() image: string;
  @Input() gallery: Array<Object>;
  @Input() index: number;
  @Input() imgSize: number;

  showFlag: boolean = false;
  currentIndex: number = -1;
  imageObject: Array<object> = [];

  constructor() {}

  ngOnInit(): void {
    this.getImagesList();
  }

  getImagesList() {
    if (this.gallery) {
      this.imageObject = this.gallery.map((item) => {
        return { image: item };
      });
    } else {
      this.imageObject = [{ image: this.image }];
    }
  }

  showLightbox(index: number) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
}
