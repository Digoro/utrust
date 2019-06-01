import { TableModel } from "./tableModel";

export class Sponser extends TableModel {
  constructor(
    public id: string,
    public name?: string,
    public phone?: string,
    public introduction?: string,
    public predictPrice?: string,
    public interesteds?: string[],
  ) {
    super('sponser');
  }

  get map(): { [key: string]: any; } {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      introduction: this.introduction,
      predictPrice: this.predictPrice,
      interesteds: this.interesteds,
    }
  };
}