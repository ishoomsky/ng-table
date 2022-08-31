import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonsListService } from "../../services/persons-list.service";
import { Params } from "@angular/router";
import { Subject } from "rxjs";
import { PopupService } from "../../../popup/services/popup.service";

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css'],

})
export class PersonsListComponent implements OnInit, OnDestroy {
  currentQueryParams: Params;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public personsListService: PersonsListService,
    public popupService: PopupService
  ) {}
  ngOnInit(): void {
    this.personsListService.getPersonsList();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
