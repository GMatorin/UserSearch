import { IUserDetails } from './user-details';
import { IUserRepo } from './user-repo';
import { IUser } from './user';

export interface IUserCombinedInfo {
    userDetails: IUserDetails;
    userRepos: IUserRepo[];
    userFollowers: IUser[];
}