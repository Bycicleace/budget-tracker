let db;

const request = indexedDB.open('budget_tracker', 1); // Version 1

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        uploadTransaction();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
}

function saveRecord(record) {
    const dbTran = db.transaction(['new_transaction'], 'readwrite');
    const tranObjectStore = dbTran.objectStore('new_transaction');
    tranObjectStore.add(record);
}

function uploadTransaction() {
    // Get all the transactions in the IndexedDB db
    const dbTran = db.transaction(['new_transaction'], 'readwrite');
    const tranObjectStore = dbTran.objectStore('new_transaction');
    const getAll = tranObjectStore.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 1) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }

                    const dbTran = db.transaction(['new_transaction'], 'readwrite');
                    const tranObjectStore = dbTran.objectStore('new_transaction');
                    tranObjectStore.clear();
                })
                .catch(err => {console.log(err)});
        }
    }
}

window.addEventListener('online', uploadTransaction);