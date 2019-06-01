import { TableModel } from "./tableModel";

export class Applicant extends TableModel {
  constructor(
    public id: string,
    public name?: string,
    public phone?: string,
    public selfIntroduction?: string,
    public eduLevel?: string[],
    public creers?: string[],
    public awards?: string[],
    public educations?: string[],
    public certifications?: string[],
    public links?: string[]
  ) {
    super('applicant');
  }

  get map(): { [key: string]: any; } {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      selfIntroduction: this.selfIntroduction,
      eduLevel: this.eduLevel,
      awards: this.awards,
      creers: this.creers,
      educations: this.educations,
      certifications: this.certifications,
      links: this.links,
    }
  };
}