export type UserData = {
    readonly username: string
    readonly password: string
}

export type StatisticsParams = {
    order?: string
    offset: number
    limit: number
}

export type LinkData = {
    readonly link: string
}

export type LinkResponse = {
    readonly id: number
    readonly short: string
    readonly target: string
    readonly counter: number
}

export type SignInResponse = {
    readonly access_token: string
}

export type SignUpResponse = {
    readonly username: string
}