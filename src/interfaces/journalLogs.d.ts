export interface JournalLogCardProp {
    id?: BaseKey | undefined,
    userName: string,
    userMail: string,
    restricted?:boolean,
    userAvatar: string,
    action: string,
    createdAt: string

}


export interface JournalLogProfileProps {
    id?: BaseKey | undefined,
    userName: string,
    userAvatar: string,
    userMail: string,
    action: string,
    location: object,
    createdAt: string
}