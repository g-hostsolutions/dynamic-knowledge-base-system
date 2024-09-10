import { UserRole } from "../../../common/enum/roles/user.role.enum";

export interface IUserEntity {
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}