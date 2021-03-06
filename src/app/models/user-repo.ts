import { IUser } from './user';

export interface IUserRepo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: IUser;
}