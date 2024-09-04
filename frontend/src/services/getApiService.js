import * as request from '~/utils/httpRequest';

export const getHeaderData = async () => {
  try {
    const res = await request.get('genre-types');
    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const getAlls = async () => {
  try {
    const res = await request.get('novels');
    return res;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const getHotNovels = async () => {
  try {
    const res = await request.get('truyen-hot');
    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const getNewNovels = async () => {
  try {
    const res = await request.get('truyen-moi-cap-nhat');
    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const getNovelsByType = async (type, page) => {
  try {
    const res = await request.get(`novels/types?type=${type}&page=${page}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const getNovelsByGenre = async (genreUrl, page) => {
  try {
    const res = await request.get(`genres/${genreUrl}/${page}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const getDetailOfNovels = async (novelName, page) => {
  try {
    const res = await request.get(`/detail/${novelName}/${page}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const getNovelChapter = async (nameUrl, chapterUrl) => {
  try {
    const res = await request.get(`chapter-details/${nameUrl}/${chapterUrl}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

export const searchNovel = async (searchText, page) => {
  function convertToHyphenated(input) {
    return input
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  const search = convertToHyphenated(searchText);
  try {
    const res = await request.post(`novels/search`, {
      search,
      page,
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};
