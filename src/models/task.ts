export class Task {
  public id?: number;
  public content?: string;
  public completed?: boolean;
  public isHighlighted?: boolean;
  public difficulty?: number | null | undefined;
  public dueDate?: Date | null | undefined;
}
