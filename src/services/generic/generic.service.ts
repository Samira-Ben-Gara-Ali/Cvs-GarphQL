export abstract class GenericService<T, CreateInput, UpdateInput> {
    abstract findAll(): Promise<T[]>;
    abstract findOne(id: number): Promise<T>;
    abstract add(input: CreateInput): Promise<T>;
    abstract update(id: number, input: UpdateInput): Promise<T>;
    abstract delete(id: number): Promise<T>;
}