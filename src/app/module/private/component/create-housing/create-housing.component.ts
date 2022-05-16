import { Component, OnInit } from '@angular/core';
import {HousingService} from "../../../../service/housing.service";
import { NgForm } from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {Session} from "../../../../interface/session";
import {UpdatedImage} from "../../../../interface/updated-image";
import {PostHousing} from "../../../../interface/post-housing";
import {Router} from "@angular/router";
import {Housing} from "../../../../interface/housing";

@Component({
  selector: 'private-create-housing',
  templateUrl: './create-housing.component.html',
  styleUrls: ['./create-housing.component.scss']
})
export class CreateHousingComponent implements OnInit {

  multipart: FormData;
  session: Session;
  isUploadImageDisable: boolean;
  updatedImage: UpdatedImage;
  housing: Housing;
  constructor(private housingService: HousingService, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.getSession().subscribe($data => this.session = $data);
    this.isUploadImageDisable = true;
  }

  upload($event) {
    this.multipart = new FormData();
    this.multipart.append('file', $event.target.files[0]);
    console.log(this.multipart)
  }

  toggleUploadImage() {
    this.isUploadImageDisable = !this.isUploadImageDisable;
  }

  onSubmit(createHousingForm: NgForm) {
    const { state, province, road, name, number, floor,
      ladder, price, surface, description } = createHousingForm.value;
    const address = { state , province, road, name, number, floor, ladder };
    const housing = { address, price, surface, description, owner: this.session.id };
    console.log(housing)
    this.housingService.create(<PostHousing>housing).subscribe({
        next: ($data) => this.housing = $data,
        error: err => console.error(err.error.message),
        complete: () => {
          if (!this.multipart){
            this.router.navigate(['/private/housing/me'])
              .then((isDone)=> {
                if (!isDone) {
                  console.error('problema')
                  return;
                }
                window.location.reload();
              });
            return;
          }
          this.multipart.append('title', createHousingForm.value.title);
          this.housingService.updateMainImage(this.housing.id, this.multipart).subscribe({
            next: $data => {
              this.updatedImage = $data
            },
            error: err => console.error(err),
            complete: () => this.router
              .navigate(['/private/housing/me'])
              .then(
                () => window
                  .location
                  .reload()
              )
          });
        }
      }
    );
  }
}
