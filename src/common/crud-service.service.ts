import {IRepository} from "src/interfaces/repository.interface";

export class CrudService<T> {

  constructor(private repository: IRepository<T>) {}


  findOne(id: string): Promise<T> {
    return this.repository.findOne(id)
  }

  findAll(): Promise<Array<T>> {
    return this.repository.findAll();
  }

  create(partialT: Partial<T>): Promise<T> {
    return this.repository.create(partialT);
  }
}

