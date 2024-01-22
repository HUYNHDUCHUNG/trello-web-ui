import axios from 'axios'
import { API_ROOT } from '~/utils/constanst'

export const fetchBoardDetailsAPI = async (boardId) => {
  const reponse = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return reponse.data
}
