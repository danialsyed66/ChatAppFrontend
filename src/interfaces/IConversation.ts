import { IUser } from './IUser';

export interface IConversation {
  members: IUser[];
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
