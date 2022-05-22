import {Component, OnInit} from '@angular/core';
import {HousingService} from "../../../../service/housing.service";
import {Session} from "../../../../interface/session";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {PostHousing} from "../../../../interface/post-housing";
import {UpdatedImage} from "../../../../interface/updated-image";
import {Address} from "../../../../interface/address";
import {Housing} from "../../../../interface/housing";

@Component({
  selector: 'app-edit-housing',
  templateUrl: './edit-housing.component.html',
  styleUrls: ['./edit-housing.component.scss']
})
export class EditHousingComponent implements OnInit {
  session: Session;
  housing: Housing;
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
    console.log(this.housing.address)
    const address: Address = {_id: this.housing.address._id,state, province, road, name, number, floor, ladder};
    const postHousing: PostHousing = {id: this.housing.id,address, price, surface, description, owner: this.housing.owner}
    this.housingService.updateHousing(postHousing).subscribe(housing => {

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
