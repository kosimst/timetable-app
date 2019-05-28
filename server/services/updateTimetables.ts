import db from "../api/database/api";

db.collection('timetables').doc('1A').set({
  hours: 7
});