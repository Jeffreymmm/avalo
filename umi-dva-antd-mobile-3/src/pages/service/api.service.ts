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

export function getChatRoom(params: any) {
  return axios(`/api/v1/chatRoom?room_id=${params.id}`, {
    method: 'GET',
  });
}

