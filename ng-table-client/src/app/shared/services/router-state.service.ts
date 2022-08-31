import { Injectable } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouterStateService {
  stateUpdated$: Subject<boolean> = new Subject<boolean>();
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public getRouterState(): Params {
    return this.activatedRoute.snapshot.queryParams;
  }

  public setQueryParams(newQueryParams: Params | null): void {
    //'null' value of 'newQueryParams' will clear all query params!
    const nullifiedPreviousQueryParams = this.nullifyQueryParams(this.getRouterState());
    let preparedNewQueryParams: Params;
    if (newQueryParams) {
      //if there are some query params - set them
      preparedNewQueryParams = { ...nullifiedPreviousQueryParams, ...newQueryParams }
    } else {
      //if there are not any query params - clear all params - for hiding popup window.
      preparedNewQueryParams = { ...nullifiedPreviousQueryParams };
    }
    this.router.navigate(
      [''],
      {
        relativeTo: this.activatedRoute,
        queryParams: preparedNewQueryParams,
        queryParamsHandling: 'merge',
      });
  }

  private nullifyQueryParams(_previousQueryParams: Params): Object {
    const queryParams = { ..._previousQueryParams };
    Object.keys(queryParams).forEach(key => {
      queryParams[key] = null;
    });
    return queryParams;
  }
}
