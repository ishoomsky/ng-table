import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PersonIdType, PersonInterface } from "../types/person.interface";
import { environment } from "../../../environments/environment";
import { PersonRequestInterface } from "../types/person-request.interface";
import { PersonsResponseInterface } from "../types/persons-response.interface";

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private httpClient: HttpClient) {}

  addPerson(payload: PersonRequestInterface): Observable<PersonInterface>{
    const fullUrl = `${environment.apiUrl}/addPerson`;
    return this.httpClient
      .post<PersonInterface>(fullUrl, payload);
  }

  getPersons(): Observable<PersonsResponseInterface>{
    const fullUrl = `${environment.apiUrl}/getPersons`;
    return this.httpClient
      .get<PersonsResponseInterface>(fullUrl);
  }

  getPerson(personId: PersonIdType): Observable<PersonInterface>{
    const fullUrl = `${environment.apiUrl}/getPerson/${personId}`;
    return this.httpClient
      .get<PersonInterface>(fullUrl);
  }

  editPerson(personId:PersonIdType, person: PersonRequestInterface){
    const fullUrl = `${environment.apiUrl}/editPerson/${personId}`;
    return this.httpClient
      .patch(fullUrl, person);
  }

  deletePerson(personId: PersonIdType){
    const fullUrl = `${environment.apiUrl}/deletePerson/${personId}`;
    return this.httpClient
      .delete(fullUrl);
  }
}
