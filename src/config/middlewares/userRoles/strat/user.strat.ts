import { UserRoleStrategy } from './interface/user.strat.interface'

export class AdminStrategy implements UserRoleStrategy {
    canCreate(): boolean {
        return true
    }

    canView(): boolean {
        return true
    }

    canEdit(): boolean {
        return true
    }

    canDelete(): boolean {
        return true
    }
}

export class EditorStrategy implements UserRoleStrategy {
    canCreate(): boolean {
        return false
    }

    canView(): boolean {
        return true
    }

    canEdit(): boolean {
        return true
    }

    canDelete(): boolean {
        return false
    }
}

export class ViewerStrategy implements UserRoleStrategy {
    canCreate(): boolean {
        return false
    }

    canView(): boolean {
        return true
    }

    canEdit(): boolean {
        return false
    }

    canDelete(): boolean {
        return false
    }
}
