import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { CreateLikesDto } from './dto/create-instagram.dto';
import { CommentAccountDto } from './dto/commentAccount.dto';
import { SuccessReponse } from 'src/lib/success-response-handler';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post('likes-campaign')
  async create(@Body() createLikes: CreateLikesDto) {
    try {
      const likes = await this.instagramService.createLikesCampaign(
        createLikes,
      );
      return SuccessReponse(
        HttpStatus.CREATED,
        'Likes campaign Successful',
        likes,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Post('follow-campaign')
  async followAccounts(@Body() createLikes: CreateLikesDto) {
    try {
      const follows = await this.instagramService.followAccount(createLikes);
      return SuccessReponse(
        HttpStatus.CREATED,
        'Follows campaign Successful',
        follows,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Post('comment-campaign')
  async commentOnAccount(@Body() commentDto: CommentAccountDto) {
    try {
      const comments = await this.instagramService.commentOnAccount(commentDto);
      return SuccessReponse(
        HttpStatus.CREATED,
        'Comments campaign Successful',
        comments,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
