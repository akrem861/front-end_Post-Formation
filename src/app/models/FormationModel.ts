import { FormateurFormationModel } from "./FormateurFormationModel";

export interface FormationModel{
id?:number ,
titre?:string ,
date?:string ,
heure?:string ,
montent?:string ,
description?:string ,
lieu?:string ,
theme?:[],
imageUrl?:string,
formateurs?:FormateurFormationModel[]
}
