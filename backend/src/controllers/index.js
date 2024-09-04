const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = 'https://dtruyen.com/'
const axiosConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Upgrade-Insecure-Requests': '1'
    },
    timeout: 10000
};

const controllers = {

    getHotNovels: async(req, res) => {
        try {
            const { data } = await axios.get(baseUrl, axiosConfig);
        
            const $ = cheerio.load(data);
            const hotNovels = [];
        
            $('.story-grid').each((index, element) => {
              const title = $(element).find('.title a').text().trim();
              const link = $(element).find('.title a').attr('href');
              const cover = $(element).find('.thumb img').attr('data-layzr');
              const status = $(element).find('.last-chapter').text().trim();

              if (link) {
                const nameUrl = link.replace('https://dtruyen.com/', '').replace('/', '')
                hotNovels.push({
                  title,
                  nameUrl,
                  cover,
                  status
                });
              }
            });
        
            res.status(200).json({
                success: true,
                message: "Get hot novels successfully!",
                data: hotNovels
            });

          } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi lấy dữ liệu' 
            });
          }
    },

    getNewestNovels: async(req, res) => {
      try {
        const { data } = await axios.get(baseUrl, axiosConfig);
    
        const $ = cheerio.load(data);
        const newestNovels = [];

        $('.story-list').each((index, element) => {
          const title = $(element).find('.title a').text().trim();
          const link = $(element).find('.title a').attr('href');
          const lastChapter = $(element).find('.last-chapter').text().trim();
          const lastUpdate = $(element).find('.last-updated').text().trim();

          if (link) {
            const nameUrl = link.replace('https://dtruyen.com/', '').replace('/', '');
            newestNovels.push({
              title,
              nameUrl,
              lastChapter,
              lastUpdate
            });
          }
        });

        res.status(200).json({
          success: true,
          message: "Get all newest novels successfully!",
          data: newestNovels,
        });

      } catch (error) {
        res.status(500).json({
          success: false,
          message: error,
          data: [],
        });
      }
    },

    getDetailNovel: async(req, res)  => {
        const {nameUrl, page} = req.params;
        const url = `${baseUrl}/${nameUrl}/${page}`;
        try {
            const { data } = await axios.get(url, axiosConfig);
      
            const $ = cheerio.load(data);
            const bookDetails = {};
      
            // Lấy thông tin chi tiết của truyện
            bookDetails.title = $('h1[itemprop="name"]').text().trim();
            bookDetails.author = $('p.author a').text().trim();
            bookDetails.status = $('.infos > p').filter(function() {
              return $(this).find('i.fa-star').length > 0;
            }).text().trim();
            bookDetails.coverUrl = $('img.cover').attr('src')
            bookDetails.summary = $('div.description').html().trim();
            bookDetails.likes = $('p i.fa-eye + span').text().trim(); // Điều chỉnh nếu cần
            bookDetails.views = $('p i.fa-eye + span').text().trim(); // Điều chỉnh nếu cần
            bookDetails.followers = $('p i.fa-refresh + span').text().trim(); // Điều chỉnh nếu cần
            bookDetails.nominations = $('p i.fa-star + span').text().trim(); // Điều chỉnh nếu cần
            bookDetails.genre = $('p.story_categories a').map((i, el) => $(el).text().trim()).get().join(', ');
      
            const genres = [];
      
            $('p.story_categories span a').each((i, el) => {
              const genreName = $(el).text().trim();
              const genreUrl = $(el).attr('href');
              genres.push({
                genreName: genreName,
                genreUrl: genreUrl.replace('https://dtruyen.com/', '').replace('/', '')
              })
            })
      
            bookDetails.genres = genres;

            // Lấy danh sách các chương
            const chapters = [];
            $('#chapters .chapters li a').each((i, el) => {
              const chapterTitle = $(el).text().trim();
              const chapterUrl = $(el).attr('href');
              chapters.push({
                  title: chapterTitle,
                  url: chapterUrl.replace('https://dtruyen.com/', '').replace('/', '')
              });
          });
            bookDetails.chapters = chapters;
      
            // Lấy tổng số trang
      
              // Lấy tổng số trang từ phần phân trang
            let totalPages = 1; // Default to 1 if no pagination is found
            $('.pagination li a').each((index, element) => {
              const pageNumber = parseInt($(element).text().trim(), 10);
              if (!isNaN(pageNumber)) {
                bookDetails.totalPages = Math.max(totalPages, pageNumber);
              }
            });
      
            res.status(200).json({
                success: true,
                message: "Get detail novel successfully!",
                data: bookDetails,
              });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error,
                data: [],
            });
        }
    },

    getGenresAndTypes: async(req, res) => {
        try {
          const { data } = await axios.get(baseUrl,axiosConfig);
      
          const $ = cheerio.load(data);
          const genres = [];
          const types = [];

          $('.main-nav > li:has(i.fa-tags) > ul > li > a').each((index, element) => {
            const genreName = $(element).text().trim();
            const href = $(element).attr('href');
            const slug = href.replace('https://dtruyen.com/', '').replace('/', '');
            
            if (genreName) {
              genres.push({ name: genreName, slug });
            }
          });
      
          $('.main-nav > li:has(i.fa-list-bullet) > ul > li > a').each((index, element) => {
            const typeName = $(element).text().trim();
            const typeUrl = $(element).attr('href').split('/').filter(Boolean).pop();
      
            if (typeName && typeUrl && typeName !== 'Thành Viên Sáng Tác') {
              types.push({ name: typeName, slug: typeUrl });
            }
      
          });
      
      
          res.status(200).json({
            success: true,
            message: "Get genres and types successfully!",
            data: {genres, types},
          });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error,
                data: [],
              });
        }
    },

    fetchNovelsByGenre: async(req, res) => {
        const {genreUrl, page} = req.params;
        try {
          const url = `${baseUrl}${genreUrl}/${page}/`;
          const { data } = await axios.get(url, axiosConfig);
      
          const $ = cheerio.load(data);
          const novels = [];

          $('li.story-list').each((index, element) => {
            const title = $(element).find('h3.title a').text().trim();
            const link = $(element).find('h3.title a').attr('href');
            const cover = $(element).find('img.cover').attr('data-layzr');
            const author = $(element).find('p[itemprop="author"]').text().trim();
            const isFull = $(element).find('.full-end').length > 0;
            const isHot = $(element).find('.hot-1').length > 0;
            const lastChapter = $(element).find('.last-chapter').text().trim();
            const updated = $(element).find('.last-updated').text().trim();
            const nameUrl = link ? link.split('/').filter(Boolean).pop() : null;
      
            if (title && link && cover) {
                novels.push({
                title,
                nameUrl,
                cover,
                author,
                isFull,
                isHot,
                lastChapter,
                updated,
              });
            }
          });
      
          const description = $('.side-description').html()?.trim();
      
          // Lấy tổng số trang từ phần phân trang
          let totalPages = 1; 
          $('.pagination li a').each((index, element) => {
            const pageNumber = parseInt($(element).text().trim(), 10);
            if (!isNaN(pageNumber)) {
              totalPages = Math.max(totalPages, pageNumber);
            }
          });
      
          res.status(200).json({
            success: true,
            message: "Get novels by genres successfully!",
            data: {novels, totalPages, description},
          });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error,
                data: [],
              });
        }
    },

    fetchChapterDetails: async(req, res) => {
        const {nameUrl, chapterUrl} = req.params;
        try {
            const url = `${baseUrl}${nameUrl}/${chapterUrl}/`;
            const { data } = await axios.get(url, axiosConfig);
            const $ = cheerio.load(data);
      
            const detailChapter = {
                title: $('.story-title a').text().trim(),
                chapterTitle: $('.chapter-title').text().trim(),
                author: $('i.fa-user').parent().contents().not('i').text().trim(),
                publicationDate: $('p i.fa-clock').next().text().trim(),
                previousChapterLink: $('.chapter-button a.chap-nav[title="Chương Trước"]').attr('href'),
                previousChapterUrl: '',
                nextChapterLink: $('.chapter-button a.chap-nav[title="Chương Sau"]').attr('href'),
                nextChapterUrl: '',
                content: $('#chapter-content').html().trim()
            };
      
            if (detailChapter.nextChapterLink) {
              detailChapter.nextChapterUrl = detailChapter.nextChapterLink.split('/').pop();
            }
      
            if (detailChapter.previousChapterLink !== "#") {
              detailChapter.previousChapterUrl = detailChapter.previousChapterLink.split('/').pop();
            }else {
              detailChapter.previousChapterUrl = detailChapter.previousChapterLink;
            }
      
            res.status(200).json({
                success: true,
                message: "Get Detail Chapters successfully!",
                data: detailChapter,
              });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error,
                data: [],
              });
        }
    },
    
    fetchSearchNovels: async(req, res) => {
        const {search, page} = req.body;
        try {
            const url = `${baseUrl}searching/${search}/lastupdate/all/all/${page}/`;
        const { data } = await axios.get(url, axiosConfig);
      
        const $ = cheerio.load(data);
        const novels = [];

        $('li.story-list').each((index, element) => {
          const title = $(element).find('h3.title a').text().trim();
          const link = $(element).find('h3.title a').attr('href');
          const cover = $(element).find('img.cover').attr('data-layzr');
          const author = $(element).find('p[itemprop="author"]').text().trim();
          const isFull = $(element).find('.full-end').length > 0;
          const isHot = $(element).find('.hot-1').length > 0;
          const lastChapter = $(element).find('.last-chapter').text().trim();
          const updated = $(element).find('.last-updated').text().trim();
          const nameUrl = link ? link.split('/').filter(Boolean).pop() : null;
      
          if (title && link && cover) {
            novels.push({
              title,
              nameUrl,
              cover,
              author,
              isFull,
              isHot,
              lastChapter,
              updated
            });
          }
        });

        let totalPages = 1; 
        $('.pagination li a').each((index, element) => {
          const pageNumber = parseInt($(element).text().trim(), 10);
          if (!isNaN(pageNumber)) {
            totalPages = Math.max(totalPages, pageNumber);
          }
        });
      
        res.status(200).json({
            success: true,
            message: "Get search Novels successfully!",
            data: {novels, totalPages},
          });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error,
                data: [],
            });
        }
        
    },

}

module.exports = controllers;