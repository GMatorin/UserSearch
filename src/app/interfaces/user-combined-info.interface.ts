import { IUserDetails } from './user-details.interface';
import { IUserRepo } from './user-repo.interface';
import { IUser } from './user.interface';

export interface IUserCombinedInfo {
    userDetails: IUserDetails;
    userRepos: IUserRepo[];
    userFollowers: IUser[];
}