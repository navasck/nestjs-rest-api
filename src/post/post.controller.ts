import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1. Specific static path first
  @Get('feed')
  async getFilteredPosts(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<PostModel[]> {
    return this.postsService.getFilteredPosts({
      take: Number(take),
      skip: Number(skip),
      searchString,
      orderBy,
    });
  }

  // 2. Specific path with parameters
  @Get('user/:id/drafts')
  async getDraftsByUser(@Param('id') id: string): Promise<PostModel[]> {
    return this.postsService.getDraftsByUser(Number(id));
  }

  // 3. General path with a single parameter
  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.getPostById(Number(id));
  }

  // All other routes remain the same
  @Post()
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    return this.postsService.createDraft(postData);
  }

  @Put(':id/publish')
  async togglePublishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.togglePublishPost(Number(id));
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.deletePost(Number(id));
  }

  @Put(':id/views')
  async incrementPostViewCount(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.incrementPostViewCount(Number(id));
  }
}
