import { Component, OnInit } from '@angular/core';
import { RestService } from "../../../shared/services/rest.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private restService: RestService) { }

  ngOnInit(): void {
  }

}
