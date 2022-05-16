import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../service/image.service";
import {Image} from "../../interface/image";
import {Paginate} from "../../interface/paginate";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  images: Paginate<Image>;

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    const housing = this.route.snapshot.params['housing'];
    this.imageService.getAll(housing).subscribe(
      {
        next: (images) => {
          console.log(images)
          this.images = images
        },
        error: (response) => console.error(response.error.message)
      }
    );

  }

}
