import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30138376-6df292770cccddd83200d4f36';

export async function fetchPictures(searchQuery, page, perPage) {
  try {
    const url = `${BASE_URL}?key=${KEY}&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    console.log(error);
  }
}