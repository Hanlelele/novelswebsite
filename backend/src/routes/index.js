const controllers = require("../controllers/index");
const router = require("express").Router();

router.get('/truyen-hot', controllers.getHotNovels);
router.get('/truyen-moi-cap-nhat', controllers.getNewestNovels);
router.get('/detail/:nameUrl/:page',controllers.getDetailNovel);
router.get('/genre-types', controllers.getGenresAndTypes );
router.get('/genres/:genreUrl/:page', controllers.fetchNovelsByGenre);
router.post('/novels/search', controllers.fetchSearchNovels);
router.get('/chapter-details/:nameUrl/:chapterUrl',controllers.fetchChapterDetails);

module.exports = router