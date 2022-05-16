import { Component, OnInit } from '@angular/core';
import {Image} from "../../interface/image";
import {ImageService} from "../../service/image.service";
import {ActivatedRoute} from "@angular/router";
import {Session} from "../../interface/session";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {

  image: Image
  session: Session;
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getSession().subscribe({
      next: (session) => this.session = session
    })
    this.getImage();
  }

  private getImage(): void {
    const id = this.route.snapshot.params['id'];
    this.imageService.getImageById(id).subscribe(
      {
        next: (image) => this.image = image,
        error: (response) => console.error(response.error.message)
      }
    );
  }

}
