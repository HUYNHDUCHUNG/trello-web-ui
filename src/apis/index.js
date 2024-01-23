import axios from 'axios'
import { API_ROOT } from '~/utils/constanst'

// su ly loi interceptor
export const fetchBoardDetailsAPI = async (boardId) => {
  const reponse = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return reponse.data
}

export const createNewColumnAPI = async (newColumnData) => {
  const reponse = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return reponse.data
}

export const createNewCardAPI = async (newCardData) => {
  const reponse = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return reponse.data
}
