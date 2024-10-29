import { Injectable } from '@nestjs/common';
import { ArticleModel } from './articles.model';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ArticlesService {
  private articles: ArticleModel[] = [
    new ArticleModel(
      Date.now(),
      'A beautiful day',
      'Hiten Dalmia',
      new Date(),
      'Today is a rather beautiful day innit.',
    ),
  ];

  getAllArticles(): ArticleModel[] {
    return [...this.articles];
  }

  getSingleArticle(id: number): ArticleModel {
    return this.findArticle(id)[0];
  }

  pushArticle(title: string, author: string, content: string) {
    const id = Date.now();
    const newArticle = new ArticleModel(id, title, author, new Date(), content);
    this.articles.push(newArticle);
    return id;
  }

  updateArticle(
    id: number,
    title: string,
    author: string,
    date: Date,
    content: string,
  ) {
    const [newArticle, existingIndex] = this.findArticle(id);
    if (title) {
      newArticle.title = title;
    }
    if (author) {
      newArticle.author = author;
    }
    if (date) {
      newArticle.date = date;
    }
    if (content) {
      newArticle.content = content;
    }
    this.articles.splice(existingIndex, 1, newArticle);
  }

  deleteArticle(id: number) {
    const existingIndex = this.findArticle(id)[1];
    this.articles.splice(existingIndex, 1);
  }

  private findArticle(id: number): [ArticleModel, number] {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );

    if (!this.articles[articleIndex]) {
      throw new NotFoundError(
        'Could not find the article you were looking for.',
      );
    }

    return [this.articles[articleIndex], articleIndex];
  }
}
