import { Gender } from "./gender.model";

export class PatientService {
  id?: number;
  name: string;
  date_of_birth: Date;
  gender_id: number;
  created_at?: Date;
  updated_at?: Date;
  gender: Gender;

  constructor(
    id: number,
    name: string,
    date_of_birth: Date,
    gender_id: number,
    created_at: Date,
    updated_at: Date,
    gender: Gender
  ) {
    this.id = id;
    this.name = name;
    this.date_of_birth = date_of_birth;
    this.gender_id = gender_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.gender = gender;
  }
}
