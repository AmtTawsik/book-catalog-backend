import express from 'express';
import bookRoutes from '../modules/books/book.route';
import reviewRoutes from '../modules/reviews/review.route';
import trackRoutes from '../modules/track/track.route';
import userRoutes from '../modules/users/user.route';
import wishlistRoutes from '../modules/wishlist/wishlist.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/book',
    route: bookRoutes,
  },
  {
    path: '/review',
    route: reviewRoutes,
  },
  {
    path: '/wishlist',
    route: wishlistRoutes,
  },
  {
    path: '/track',
    route: trackRoutes,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
