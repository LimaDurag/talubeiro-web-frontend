import {database} from '../config/firebase';
import {set, ref, get, child} from 'firebase/database'
import {TABULEIROS} from '../config/tabuleiros.js';

export function initRoom(roomNumber, roomSettings){
    var tabuleiro;

    switch(roomSettings.modo){
      case 'bancoimo':
        tabuleiro = TABULEIROS.BANCO_IMOBILIARIO
        break;
      default:
        break;

    }

    return set(ref(database, 'rooms/' + roomNumber), {
        modo: roomSettings.modo,
        senha: roomSettings.senha,
        tabuleiro: tabuleiro,
        players: [ 
          {
            id: 1,
            dinheiro: 2000,
            propriedades: [],
            posicao: 1,
            isPreso: false,
          },
          {
            id: 2,
            dinheiro: 2000,
            propriedades: [],
            posicao: 1,
            isPreso: false,
          },
          {
            id: 3,
            dinheiro: 2000,
            propriedades: [],
            posicao: 1,
            isPreso: false,
          },
          {
            id: 4,
            dinheiro: 2000,
            propriedades: [],
            posicao: 1,
            isPreso: false,
          }
        ]
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
          return null;
        }
      }).catch((error) => {
        console.error(error);
      });

}