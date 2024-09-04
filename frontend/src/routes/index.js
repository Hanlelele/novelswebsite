import config from '~/config';

import Home from '~/layouts/components/Sidebar';
import Reading from '~/layouts/components/Reader';
import ListNovel from '~/layouts/components/Category';
import DetailNovel from '~/layouts/components/Detail';

const publicRoutes = [
  { path: config.routes.home, Component: Home },
  { path: config.routes.chapter, Component: Reading },
  { path: config.routes.type, Component: ListNovel },
  { path: config.routes.genre, Component: ListNovel },
  { path: config.routes.topNovel, Component: ListNovel },
  { path: config.routes.detail, Component: DetailNovel },
  { path: config.routes.search, Component: ListNovel },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
