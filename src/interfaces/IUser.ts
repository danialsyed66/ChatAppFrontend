import { IAvatar } from './IAvatar';

// export type IUser = {
export interface IUser {
  name: string;
  email: string;
  avatar?: IAvatar;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
