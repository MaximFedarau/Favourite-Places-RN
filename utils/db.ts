import * as SQLite from 'expo-sqlite';
import { LocationCoords } from '../constants/types';

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