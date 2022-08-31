import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PersonsListService } from "./services/persons-list.service";

const routes = [
  {
    path: 'persons-list',
    component: PersonsListComponent,
  }
]

@NgModule({
  declarations: [
    PersonsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [PersonsListComponent],
  providers: [PersonsListService]
})
export class PersonsListModule {

}
