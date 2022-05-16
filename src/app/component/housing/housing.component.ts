import {Component, Input, OnInit} from '@angular/core';
import {Paginate} from "../../interface/paginate";
import {Housing} from "../../interface/housing";
import {HousingService} from "../../service/housing.service";
import {Session} from "../../interface/session";

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss']
})
export class HousingComponent implements OnInit {
  housingPaginate: Paginate<Housing>;
  session: Session;
  pageSize: number;
  page: number;
  total: number;
  @Input()
  pagination: boolean = true;
  constructor(private housingService: HousingService) {}

  ngOnInit(): void {
    this.getAllHousings();
  }

  getAllHousings(): void {
    this.housingService.getAll().subscribe($data => {
      this.housingPaginate = $data;
      this.pageSize = this.housingPaginate.pagination.limit;
      this.page = this.housingPaginate.pagination.page;
      this.total = this.housingPaginate.pagination.total;
    });
  }

  getDetailsLink(id: string): string {
    return `/housing/details/${id}`;
  }

  pageChanged($event: number) {
    this.housingService.getAll(`page=${$event}`).subscribe($data => this.housingPaginate = $data);
  }
}
