import {database} from '../config/firebase';
import {set, ref, get, child} from 'firebase/database'

export function initRoom(roomNumber, roomSettings){
    return set(ref(database, 'rooms/' + roomNumber), {
        modo: roomSettings.modo,
        senha: roomSettings.senha
      }).catch(e => console.log(e));
}

export function searchRoom(roomNumber){
  const dbRef = ref(database);
    return get(child(dbRef, `rooms/${roomNumber}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
}