import { PersonInterface } from "./person.interface";

export interface PersonsResponseInterface {
  headers: string[],
  data: PersonInterface[]
}
