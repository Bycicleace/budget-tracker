let db;

const request = indexedDB.open('budget_tracker', 1); // Version 1

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};