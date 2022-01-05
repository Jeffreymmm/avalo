import axios from 'axios'
export function getRelationCredit(body:any) {
  return axios('/api/v1/gameRooms', {
    method: 'POST',
    data: body,
  });
}
// get
export function getGameRooms() {
  return axios(`/api/v1/gameRooms`, {
    method: 'GET',
  });
}