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
    id : number | null,
    name : string | null,
    status : string | null,
    species : string | null,
    type : string | null,
    gender : string | null,
    origin : {
        name : string | null,
        url : string | null
    },
    location : {
        name : string | null,
        url : string | null
    },
    image : string | null,
    episode : (string | null)[],
    url : string | null,
    created : string | null
}



export interface CharacterInfo {
    Nome : string | null,
    ImmagineURL : string | null,
    Stato : string | null,
    Specie : string | null
}
