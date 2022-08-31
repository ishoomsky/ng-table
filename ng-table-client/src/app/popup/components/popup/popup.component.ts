import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PopupService } from "../../services/popup.service";
import { PopupType } from "../../types/popup.type";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PopupStateInterface } from "../../types/popup-state.interface";
import { map, Subject, takeUntil } from "rxjs";
import { PersonIdType } from "../../../shared/types/person.interface";
import { PersonsListService } from "../../../persons-list/services/persons-list.service";
import { animate, style, transition, trigger } from "@angular/animations";

const popupEnterTransition = transition(':enter', [style({ opacity: 0 }), animate('250ms ease-in', style({ opacity: 1 }))]);
const popupLeaveTransition = transition(':leave', [style({ opacity: 1 }), animate('200ms ease-out', style({ opacity: 0 }))]);

const popupBackgroundEnterTransition = transition(':enter', [style({ opacity: 0 }), animate('100ms ease-in', style({ opacity: 0.8 }))]);
const popupBackgroundLeaveTransition = transition(':leave', [style({ opacity: 0.8 }), animate('500ms ease-out', style({ opacity: 0 }))]);

const popupFadeIn = trigger('popupFadeIn', [popupEnterTransition]);
const popupFadeOut = trigger('popupFadeOut', [popupLeaveTransition]);

const popupBackgroundFadeIn = trigger('popupBackgroundFadeIn', [popupBackgroundEnterTransition]);
const popupBackgroundFadeOut = trigger('popupBackgroundFadeOut', [popupBackgroundLeaveTransition]);

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [popupFadeIn, popupFadeOut, popupBackgroundFadeIn, popupBackgroundFadeOut]
})
export class PopupComponent implements OnInit, OnDestroy {
  @ViewChild('popupRef') popupRef: ElementRef;
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (this.popupRef && !this.popupRef.nativeElement.contains(event.target)) {
      this.popupService.hidePopup();
    }
  }

  get PopupType() {
    return PopupType;
  }

  popupForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public popupService: PopupService,
    private personListService: PersonsListService,
    public formBuilder: FormBuilder
  ) {
    this.popupForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      profession: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.popupService.watchRouterState();
    this.initFormValues();
    this.formCleaning();
  }

  ngOnDestroy(): void {
    this.popupService.destroyWatchRouterState$.next(true);
    this.popupService.destroyWatchRouterState$.unsubscribe();

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initFormValues(): void {
    this.popupService.popupState$
      .pipe(
        takeUntil(this.destroy$),
        map((popupState:PopupStateInterface) => popupState.content)
      )
      .subscribe((content) => {
        if (content && typeof content === 'object') {
          ('name' in content) && this.popupForm.controls['name'].setValue(content.name);
          ('imageUrl' in content) && this.popupForm.controls['imageUrl'].setValue(content.imageUrl);
          ('profession' in content) && this.popupForm.controls['profession'].setValue(content.profession);
          ('age' in content) && this.popupForm.controls['age'].setValue(content.age);
        }
    })
  }

  formCleaning(): void {
    this.popupService.popupState$
      .pipe(
        takeUntil(this.destroy$),
        map((popupState:PopupStateInterface) => popupState.type)
      )
      .subscribe((type) => {
        if (type === PopupType.add) {
          this.popupForm.reset({
            name: '',
            imageUrl: '',
            profession: '',
            age: ''
          });
        }
      })
  }

  formTouched() {
    console.log(this.popupForm.touched)
    return this.popupForm.touched;
  }

  public addPerson() {
    this.personListService.addPerson(this.popupForm.value);
    this.popupService.hidePopup();
  }
  public editPerson(personId: PersonIdType) {
    this.personListService.editPerson(personId, this.popupForm.value);
    this.popupService.hidePopup();
  }
  public deletePerson(personId: PersonIdType) {
    this.personListService.deletePerson(personId);
    this.popupService.hidePopup();
  }
}
