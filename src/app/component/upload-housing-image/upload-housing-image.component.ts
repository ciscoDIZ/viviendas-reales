import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {ImageService} from "../../service/image.service";
import {Image} from "../../interface/image";

@Component({
  selector: 'app-upload-housing-image',
  templateUrl: './upload-housing-image.component.html',
  styleUrls: ['./upload-housing-image.component.scss']
})
export class UploadHousingImageComponent implements OnInit {
  private multipart: FormData;
  @Input()
  housingId: string
  constructor(private modalService: NgbModal, private imageService: ImageService) { }

  ngOnInit(): void {
  }

  openModal(modal: any) {
    this.modalService.open(modal)
  }

  onSubmit(form: NgForm) {
    this.multipart.append('title', form.value.title);
    this.multipart.append('housing', this.housingId);
    this.imageService.create(this.multipart).subscribe({next:image => console.log(image), error:(err) => console.error(err)})
  }

  upload($event) {
    this.multipart = new FormData();
    this.multipart.append('file', $event.target.files[0])
  }
}
