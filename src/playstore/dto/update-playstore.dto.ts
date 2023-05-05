import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaystoreDto } from './create-playstore.dto';

export class UpdatePlaystoreDto extends PartialType(CreatePlaystoreDto) {}
