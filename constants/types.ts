export interface Place {
    title: string;
    imageUri: string;
    address: string;
    location: LocationCoords,
    id: string;
}

export interface LocationCoords {
    lat: number;
    lng: number;
}

export interface AddPlaceForm {
    title: string;
}