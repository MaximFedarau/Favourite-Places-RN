import * as SQLite from 'expo-sqlite';
import { LocationCoords, Place } from '../constants/types';

const db = SQLite.openDatabase('places.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)'
                ,[], () => {
                    resolve('Table places created successfully.');
                }, (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    })
    return promise;
}

export function insertPlace(title: string, imageUri: string, address: string, location: LocationCoords) {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
                [title, imageUri, address, location.lat, location.lng],
                (_, result) => {
                    resolve(result);
                }
                , (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    })
    return promise;
}

export function fetchPlaces() {
    const promise = new Promise<Place[]>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM places',
                [],
                (_, result) => {
                    const rightFormatPlaces:Place[] = result.rows._array.map((place) => {
                        return {
                            id: place.id,
                            title: place.title,
                            imageUri: place.imageUri,
                            address: place.address,
                            location: {
                                lat: place.lat,
                                lng: place.lng
                            }
                        }
                    })
                    resolve(rightFormatPlaces);
                }
                , (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    })
    return promise;
}

export function getInfoById(id: string) {
    const promise = new Promise<Place>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM places WHERE id = ?',
                [id],
                (_, result) => {
                    const place = result.rows._array[0];
                    resolve({
                        id: place.id,
                        title: place.title,
                        imageUri: place.imageUri,
                        address: place.address,
                        location: {
                            lat: place.lat,
                            lng: place.lng
                        }
                    });
                }
                , (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    })
    return promise;
}