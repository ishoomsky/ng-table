import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PersonIdType, PersonInterface } from "../types/person.interface";
import { environment } from "../../../environments/environment";
import { PersonRequestInterface } from "../types/person-request.interface";

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

  getPersons(): Observable<PersonInterface[]>{
    const fullUrl = `${environment.apiUrl}/getPersons`;
    return this.httpClient
      .get<PersonInterface[]>(fullUrl);
  }

  getPerson(slug: PersonIdType): Observable<PersonInterface>{
    const fullUrl = `${environment.apiUrl}/getPerson/${slug}`;
    return this.httpClient
      .get<PersonInterface>(fullUrl);
  }

  editPerson(slug:PersonIdType, payload: PersonRequestInterface){
    const fullUrl = `${environment.apiUrl}/editPerson/${slug}`;
    return this.httpClient
      .patch(fullUrl, payload);
  }

  deletePerson(slug: PersonIdType){
    const fullUrl = `${environment.apiUrl}/deletePerson/${slug}`;
    return this.httpClient
      .delete(fullUrl);
  }
}
