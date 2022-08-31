import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PopupComponent } from "./components/popup/popup.component";
import { PopupService } from "./services/popup.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PopupComponent],
  providers: [PopupService]
})
export class PopupModule {}
