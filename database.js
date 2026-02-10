// js/database.js - Database Operations
let db;

export function initDatabase() {
    db = firebase.firestore();
    return db;
}

export async function saveFlockData(userId, flockId, data) {
    return await db.collection('users').doc(userId)
        .collection('flocks').doc(flockId).set(data);
}

export async function getFlockData(userId, flockId) {
    const doc = await db.collection('users').doc(userId)
        .collection('flocks').doc(flockId).get();
    return doc.exists ? doc.data() : null;
}

export async function getAllFlocks(userId) {
    const snapshot = await db.collection('users').doc(userId)
        .collection('flocks').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteFlockData(userId, flockId) {
    return await db.collection('users').doc(userId)
        .collection('flocks').doc(flockId).delete();
}

export async function saveUserSettings(userId, settings) {
    return await db.collection('users').doc(userId)
        .collection('settings').doc('preferences').set(settings);
}

export async function getUserSettings(userId) {
    const doc = await db.collection('users').doc(userId)
        .collection('settings').doc('preferences').get();
    return doc.exists ? doc.data() : null;
}
