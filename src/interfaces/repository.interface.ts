export interface IRepository<T> {
  findOne(id: string): Promise<T>;
  findAll(): Promise<Array<T>>;
  create(arg: Partial<T>): Promise<T>;
}
