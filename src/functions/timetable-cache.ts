export function fetchTimetable(source: string) {
  source
  if (window.indexedDB) {
    const request = indexedDB.open('timetable-db', 1)

    request.onsuccess = () => {
      const db = request.result
      console.log(db)
    }
  } else {
    console.warn('No support for IndexedDB: Cache unavailable')
  }
}
