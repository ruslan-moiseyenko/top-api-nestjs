import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

//class validates ObjectId type
@Injectable()
export class IdValidationPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type != 'param') {
			return value;
		}

		if (!isValidObjectId(value)) {
			throw new BadRequestException('Id is not valid');
		}
		return value;
	}
}
