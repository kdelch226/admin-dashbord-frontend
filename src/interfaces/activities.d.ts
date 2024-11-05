export interface ActivitesCardProp {
    id?: BaseKey | undefined,
    userAvatar: string;
    changeby: string;
    restricted?:boolean,
    user: string;
    action: string;
    documentType: string;
    createdAt:string
}


export interface ActivityProfileProps {
    id?: BaseKey | undefined,
    userAvatar: string;
    changedBy: string;
    user: string;
    action: string;
    documentType: string;
    documentTitle: string;
    changes:object;
    createdAt:string
}