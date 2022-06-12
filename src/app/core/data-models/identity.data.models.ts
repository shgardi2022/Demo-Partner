import * as moment from 'moment';


export interface RefreshTokenInputDto {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
}

export interface TokenResultDto {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    readonly access_token?: string | undefined;
}


export interface MenuItemDto {
    id?: string;
    title?: string | undefined;
    icon?: string | undefined;
    page?: string | undefined;
    parentId?: string | undefined;
    isActive?: boolean;
    readonly root?: boolean;
    submenu?: MenuItemDto[] | undefined;
    roleDto?: RoleDto;
}

export interface RoleDto {
    id?: string | undefined;
    name?: string | undefined;
    isActive?: boolean;
    platformType?: PlatformType;
}


export type PlatformType = 0 | 1 | 2 | 3;


export interface AuthenticateResultDto {
    accessToken?: string | undefined;
    readonly access_token?: string | undefined;
    refreshToken?: string | undefined;
    isComplete?: boolean;
    isNewDriver?: boolean;
    isActivated?: boolean;
    isSuspended?: boolean;
    hasPassword?: boolean;
    userName?: string | undefined;
    image?: string | undefined;
    caverImage?: string | undefined;
    email?: string | undefined;
    emailConfirmed?: boolean | undefined;
    showConfimation?: boolean | undefined;
    userId?: string | undefined;
    userType?: UserType;
    expireInSeconds?: number;
}


export type UserType = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export interface LoginDto {
    userName: string;
    password: string;
}