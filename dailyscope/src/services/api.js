export const fetchNews = async (page = 1, pageSize = 10, query = '', category = '') => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Pastikan API key diset di .env
  const baseUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  
  // Menambahkan query, kategori, dan pagination pada URL
  const url = `${baseUrl}&page=${page}&pageSize=${pageSize}${query ? `&q=${query}` : ''}${category ? `&category=${category}` : ''}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; // Mengembalikan data yang diterima dari API
  } catch (error) {
    console.error('Error fetching news:', error);
    return { articles: [] }; // Mengembalikan array kosong jika terjadi error
  }
};
