export interface UserRoleStrategy {
    canCreate(): boolean
    canView(): boolean
    canEdit(): boolean
    canDelete(): boolean
}
