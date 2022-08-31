import { PopupType } from "./popup.type";
import { PersonInterface } from "../../shared/types/person.interface";

export interface PopupStateInterface {
  isShow: boolean,
  type: PopupType | null;
  content: number | PersonInterface | null;
}
