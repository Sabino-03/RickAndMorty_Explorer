export interface Location {
    info : {
        count : number,
        pages : number,
        next : string,
        prev : string
    },
    results : LocationResults[]
}



export interface LocationResults {
    id : number,
    name : string,
    type : string,
    dimension : string,
    residents : string[],
    url : string,
    created : string
}
