import axios from 'axios'
import { API_ROOT } from '~/utils/constanst'

// su ly loi interceptor
export const fetchBoardDetailsAPI = async (boardId) => {
  const reponse = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return reponse.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const reponse = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return reponse.data
}
export const createNewColumnAPI = async (newColumnData) => {
  const reponse = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return reponse.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const reponse = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return reponse.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const reponse = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return reponse.data
}

export const createNewCardAPI = async (newCardData) => {
  const reponse = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return reponse.data
}

export const moveCardOtherColumnAPI = async (updateData) => {
  const reponse = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return reponse.data
}
