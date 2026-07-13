export interface Character {
    info : {
        count : number,
        pages : number,
        next : string,
        prev : string
    },
    results : CharacterResults[]
}



export interface CharacterResults {
    id : number,
    name : string,
    status : string,
    species : string,
    type : string,
    gender : string,
    origin : {
        name : string,
        url : string
    },
    location : {
        name : string,
        url : string,
    },
    image : string,
    episode : string[],
    url : string,
    created : string
}



export interface CharacterInfo {
    Nome : string,
    ImmagineURL : string,
    Stato : string,
    Specie : string
}
