import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private PrismaService: PrismaService) {}

  async getFilteredPosts(params: {
    skip?: number;
    take?: number;
    searchString?: string;
    orderBy?: 'asc' | 'desc';
  }): Promise<Post[]> {
    const { skip, take, searchString, orderBy } = params;
    const or = searchString
      ? {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        }
      : {};

    return this.PrismaService.post.findMany({
      where: { published: true, ...or },
      include: { author: true },
      // The take and skip values are now conditionally included
      ...(take && { take }),
      ...(skip && { skip }),
      orderBy: { updatedAt: orderBy },
    });
  }

  async getPostById(id: number): Promise<Post | null> {
    return this.PrismaService.post.findUnique({ where: { id } });
  }

  async getDraftsByUser(authorId: number): Promise<Post[]> {
    return this.PrismaService.post.findMany({
      where: { authorId, published: false },
    });
  }

  async createDraft(postData: {
    title: string;
    content?: string;
    authorEmail: string;
  }): Promise<Post> {
    const { title, content, authorEmail } = postData;
    return this.PrismaService.post.create({
      data: {
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  }

  async togglePublishPost(id: number): Promise<Post> {
    const postData = await this.PrismaService.post.findUnique({
      where: { id },
      select: { published: true },
    });
    return this.PrismaService.post.update({
      where: { id },
      data: { published: !postData?.published },
    });
  }

  async deletePost(id: number): Promise<Post> {
    return this.PrismaService.post.delete({ where: { id } });
  }

  async incrementPostViewCount(id: number): Promise<Post> {
    return this.PrismaService.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  }
}
