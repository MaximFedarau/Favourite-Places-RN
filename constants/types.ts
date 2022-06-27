export interface Place {
    title: string;
    imageUri: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    },
    id: string;
}