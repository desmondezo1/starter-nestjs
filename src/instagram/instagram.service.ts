import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { CommentAccountDto } from './dto/commentAccount.dto';
import { CreateLikesDto } from './dto/create-instagram.dto';
import { Instagram } from './entities/instagram.model';

@Injectable()
export class InstagramService {
  constructor(
    @InjectModel(Instagram.name)
    private readonly instagramModel: mongoose.Model<Instagram>,
    private readonly puppeteerServ: PuppeteerService,
    private configServ: ConfigService,
  ) {}

  private ENV = this.configServ.get('ENV');

  async createLikesCampaign(createLikes: CreateLikesDto): Promise<any> {
    try {
      const { account, url } = createLikes;
      const likedPost = await Promise.all(
        account.map(async ({ username, password }) => {
          const visted = await this.puppeteerServ.likePost({
            platform: 'instagram',
            postUrl: url,
            username,
            password,
          });
          return visted;
        }),
      )
        .then((res) => {
          console.log({ res });
          return res;
        })
        .catch((error) => {
          console.log({ error });
        });

      return likedPost;
    } catch (error) {
      console.log(error);
    }
  }

  async followAccount(createLikes: CreateLikesDto): Promise<any> {
    try {
      const { account, url } = createLikes;

      const followAccounts = await Promise.all(
        account.map(async ({ username, password }) => {
          const followed = await this.puppeteerServ.followAccount({
            accountUrl: url,
            username,
            password,
          });
          return followed;
        }),
      )
        .then((res) => {
          console.log({ res });
          return res;
        })
        .catch((error) => {
          console.log({ error });
        });

      return followAccounts;
    } catch (error) {
      console.log(error);
    }
  }

  async commentOnAccount(commentAccountDto: CommentAccountDto): Promise<any> {
    try {
      const { url, account, comment } = commentAccountDto;

      function getComment(com, index = 0) {
        if (Array.isArray(com)) {
          if (com.length > index + 1) {
            return com[com.length - 1];
          } else {
            return com[index];
          }
        } else {
          return com;
        }
      }

      const makeComments = await Promise.all(
        account.map(async ({ username, password }, index) => {
          const commented = await this.puppeteerServ.commentonPost({
            postUrl: url,
            password,
            username,
            comment: getComment(comment, index),
          });
          return commented;
        }),
      )
        .then((res) => {
          console.log({ res });
          return res;
        })
        .catch((error) => {
          console.log({ error });
          throw new HttpException(error.message, error.status);
        });

      return makeComments;
    } catch (error) {
      console.log({ error });
    }
  }
}
