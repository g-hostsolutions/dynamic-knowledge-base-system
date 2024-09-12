import { UserRoleStrategy } from './strat/interface/user.strat.interface'
import { AdminStrategy, EditorStrategy, ViewerStrategy } from './strat/user.strat'

export class UserContext {
    private strategy: UserRoleStrategy

    constructor(role: string) {
        switch (role) {
            case 'Admin':
                this.strategy = new AdminStrategy()
                break
            case 'Editor':
                this.strategy = new EditorStrategy()
                break
            case 'Viewer':
                this.strategy = new ViewerStrategy()
                break
            default:
                throw new Error('Unknown role')
        }
    }

    canCreate(): boolean {
        return this.strategy.canCreate()
    }

    canView(): boolean {
        return this.strategy.canView()
    }

    canEdit(): boolean {
        return this.strategy.canEdit()
    }

    canDelete(): boolean {
        return this.strategy.canDelete()
    }
}
