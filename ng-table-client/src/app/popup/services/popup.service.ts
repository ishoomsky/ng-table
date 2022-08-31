import { Injectable } from '@angular/core';
import { map, Subject, takeUntil } from "rxjs";
import { RestService } from "../../shared/services/rest.service";
import { ActivatedRoute, Params } from "@angular/router";
import { PopupStateInterface } from "../types/popup-state.interface";
import { PersonInterface } from "../../shared/types/person.interface";
import { RouterStateService } from "../../shared/services/router-state.service";
import { PopupType } from "../types/popup.type";

@Injectable()
export class PopupService {

  popupState$: Subject<PopupStateInterface> = new Subject<PopupStateInterface>();
  destroyWatchRouterState$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private restService: RestService,
    private routerStateService: RouterStateService,
    private activatedRoute: ActivatedRoute
  ) {}

  public watchRouterState() {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroyWatchRouterState$),
        map((params): PopupStateInterface => {
          if ('popup' in params) {
            if (params['popup'] === 'add') {
              const addPopupState: PopupStateInterface = {
                isShow: true,
                type: PopupType.add,
                content: Number(params['id']),
              }
              return addPopupState;
            }

            if (params['popup'] === 'edit') {
              const editPopupState: PopupStateInterface = {
                isShow: true,
                type: PopupType.edit,
                content: JSON.parse(params['person']),
              }
              return editPopupState;
            }

            if (params['popup'] === 'delete') {
              const deletePopupState: PopupStateInterface = {
                isShow: true,
                type: PopupType.delete,
                content: Number(params['id']),
              }
              return deletePopupState;
            }
          }
          const hiddenPopupState: PopupStateInterface = {
            isShow: false,
            type: null,
            content: null,
          };

          return hiddenPopupState;
        })
      )
      .subscribe((popupState) => {
        this.popupState$.next(popupState);
      })
  }

  public showAddPersonPopup(): void {
    const addPersonParams: Params = {popup: 'add'};
    this.routerStateService.setQueryParams(addPersonParams);
  }

  public showEditPersonPopup(person: PersonInterface): void {
    const editPersonParams: Params = {
      popup: 'edit',
      person: JSON.stringify(person),
    };
    this.routerStateService.setQueryParams(editPersonParams);
  }

  public showDeletePersonPopup(id: number): void {
    const deletePersonParams: Params = {popup: 'delete', id: id};
    this.routerStateService.setQueryParams(deletePersonParams);
  }

  public hidePopup() {
    this.routerStateService.setQueryParams(null);
    this.routerStateService.stateUpdated$.next(true);
  }
}
