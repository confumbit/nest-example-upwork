export class ArticleModel {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public date: Date,
    public content: string,
  ) {}
}
