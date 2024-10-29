import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  fetchAllArticles() {
    return { articles: this.articlesService.getAllArticles() };
  }

  @Get(':id')
  fetchSingleArticle(@Param('id') id: string) {
    return { article: this.articlesService.getSingleArticle(parseInt(id)) };
  }

  @Post()
  addArticle(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('content') content: string,
  ) {
    console.log(title, author, content);
    const id = this.articlesService.pushArticle(title, author, content);
    return { message: `Article has been added with id ${id}.` };
  }

  @Patch(':id')
  updateArticle(
    @Param('id') id: string,
    @Body()
    article: {
      title: string;
      author: string;
      date: Date;
      content: string;
    },
  ) {
    this.articlesService.updateArticle(
      parseInt(id),
      article.title,
      article.author,
      article.date,
      article.content,
    );
    return { message: `Article has been updated.` };
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    this.articlesService.deleteArticle(parseInt(id));
    return { message: `Article has been deleted.` };
  }
}
