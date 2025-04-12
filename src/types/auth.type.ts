export type TYUserRoles = "admin" |  "user"
export type TYUser = {
    role: TYUserRoles,
    email : string,
    iat : number,
    exp : number,
}