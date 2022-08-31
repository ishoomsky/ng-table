import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { PersonIdType, PersonInterface } from "../../shared/types/person.interface";
import { RestService } from "../../shared/services/rest.service";
import { PersonsResponseInterface } from "../../shared/types/persons-response.interface";
import { PersonRequestInterface } from "../../shared/types/person-request.interface";

@Injectable()
export class PersonsListService {
  tableData$: BehaviorSubject<PersonsResponseInterface> = new BehaviorSubject<PersonsResponseInterface>({
    headers: [],
    data: []
  });

  persons$: BehaviorSubject<PersonInterface[]> = new BehaviorSubject<PersonInterface[]>([]);
  personsTableHeaders$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private restService: RestService) {}

  public getPersonsList() {
    this.restService.getPersons()
      .subscribe((data) => {
        this.tableData$.next(data);
        this.persons$.next(data.data);
        this.personsTableHeaders$.next(data.headers);
      });
  };

  public addPerson(person: PersonRequestInterface) {
    this.restService.addPerson(person).subscribe({
      next: (responsePerson: PersonInterface) => {
        const persons = this.persons$.getValue();
        persons.unshift(responsePerson);
        this.persons$.next(persons);
      },
      error: () => {
        console.log('Error when adding user!')
      }
    });
  };

  public editPerson(personId: PersonIdType, person: PersonRequestInterface) {
    this.restService.editPerson(personId, person).subscribe({
      next: () => {
        const persons = this.persons$.getValue();
        const personIndex = persons.findIndex((person) => person.id === personId);
        const newPerson = {
          ...persons[personIndex],
          ...person
        }
        persons.splice(personIndex, 1, newPerson);
        this.persons$.next(persons);
      },
      error: () => {
        console.log('Error when editing user!')
      }
    });
  };

  public deletePerson(personId: PersonIdType) {
    this.restService.deletePerson(personId).subscribe({
      next: () => {
        const persons = this.persons$.getValue();
        const personIndex = persons.findIndex((person) => {
          return person.id == personId;
        });
        persons.splice(personIndex, 1);
        this.persons$.next(persons);
      },
      error: () => {
        console.log('Error when editing user!')
      }
    });
  };
}
