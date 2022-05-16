import {Component, OnInit} from '@angular/core';
import {HousingService} from "../../../../service/housing.service";
import {Session} from "../../../../interface/session";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {PostHousing} from "../../../../interface/post-housing";
import {UpdatedImage} from "../../../../interface/updated-image";

@Component({
  selector: 'app-edit-housing',
  templateUrl: './edit-housing.component.html',
  styleUrls: ['./edit-housing.component.scss']
})
export class EditHousingComponent implements OnInit {
  session: Session;
  housing: PostHousing;
  isUploadImageDisable: boolean = false;
  multipart: FormData;
  updatedImage: UpdatedImage;

  constructor(
    private housingService: HousingService,
    private location: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getHousing();
  }

  private getHousing(): void {
    const id = this.location.snapshot.params['id'];
    this.housingService.getById(id).subscribe({
        next: housing => this.housing = housing,
        error: (error) => console.error(error)
      }
    );
  }


  onSubmit(housing: NgForm) {
    const {
      state,
      province,
      road,
      name,
      number,
      floor,
      ladder,
      description,
      surface,
      price,
      title
    } = housing.value;
    this.housing.address.state = state ? state : this.housing.address.state;
    this.housing.address.province = province ? province : this.housing.address.province;
    this.housing.address.road = road ? road : this.housing.address.road;
    this.housing.address.name = name ? name : this.housing.address.name;
    this.housing.address.number = number ? number : this.housing.address.number;
    this.housing.address.floor = floor ? floor : this.housing.address.floor;
    this.housing.address.ladder = ladder ? ladder : this.housing.address.ladder;
    this.housing.description = description ? description : this.housing.description;
    this.housing.surface = surface ? surface : this.housing.surface;
    this.housing.price = price ? price : this.housing.price;
    this.housingService.updateHousing(this.housing).subscribe(housing => {

      if (this.multipart) {
        this.multipart.append('title', title);
        this.housingService.updateMainImage(housing.id, this.multipart).subscribe({
          next: (updatedImage) => this.updatedImage = updatedImage
        })
      }
      this.housing = housing;
    });
  }

  toggleUploadImage() {
    this.isUploadImageDisable = !this.isUploadImageDisable;
  }

  upload($event) {
    this.multipart = new FormData();
    this.multipart.append('file', $event.target.files[0])
  }
}
