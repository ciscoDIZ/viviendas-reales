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
  page: number;
  pageSize: number;
  total: number;
  private housing: string;

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    this.housing = this.route.snapshot.params['housing'];
    this.imageService.getAll(this.housing).subscribe(
      {
        next: (images) => {
          console.log(images)
          this.images = images
          this.page = this.images.pagination.page;
          this.pageSize = this.images.pagination.limit;
          this.total = this.images.pagination.total;
        },
        error: (response) => console.error(response.error.message)
      }
    );

  }

  pageChanged($event: number) {
    if (!$event) {
      $event = 1;
    }
    this.page = $event;
    this.imageService.getAll(this.housing, this.page).subscribe({next: (housings) => this.images = housings})
  }
}
