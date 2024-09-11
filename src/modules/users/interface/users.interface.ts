import { UserRole } from '../../../common/enum/roles/user.role.enum'
import { ICommonBaseEntity } from '../../../common/interfaces/commonBaseEntity.interface'

export interface IUserEntity extends ICommonBaseEntity {
    name: string
    email: string
    role: UserRole
}
