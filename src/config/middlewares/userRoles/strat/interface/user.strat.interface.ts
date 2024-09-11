export interface UserRoleStrategy {
    canCreate(): boolean
    canView(): boolean
    canEdit(): boolean
    canDelete(): boolean
}

export interface UserPermissions {
    canCreate?: boolean
    canView?: boolean
    canEdit?: boolean
    canDelete?: boolean
}
