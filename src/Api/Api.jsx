import axios from 'axios';
import { toast } from 'react-hot-toast';

export async function getDataByAxios(
  ENDPOINT,
  paginationPage = 1,
  searchText = ''
) {
  try {
    const BASE_URL = `https://api.themoviedb.org/3`;

    let URL = BASE_URL + ENDPOINT + `?include_adult=false&language=en-US`;
    const axiosConfig = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGFiNmVkZmQ1MzlmNWI2NzY4ZjM4YWFkYzMzM2Y5ZSIsInN1YiI6IjY2MWMyZDI4MzNhNTMzMDE4NmQ1ZWNiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t8TzePyRf2VIWd8gvJ867iGiNoecEufaiio0CIZzqgM',
      },
    };

    if (searchText) {
      URL = URL + `&query=${searchText.trim()}`;
    }
    if (paginationPage) {
      URL = URL + `&page=${paginationPage}`;
    }

    const resp = await axios.get(URL, axiosConfig);

    return resp;
  } catch (error) {
    toast.error(error.message);
  }
}
