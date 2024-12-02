/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
	@prop({ unique: true })
	email: string;

	@prop()
	passwordHash: string;
}
