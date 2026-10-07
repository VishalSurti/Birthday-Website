import { Route, Routes } from 'react-router';
import { HomePage } from '../pages/HomePage';
import { ForYouPage } from '../pages/ForYouPage';
import { OpenWhenPage } from '../pages/OpenWhenPage';
import { LetterPage } from '../pages/LetterPage';
import { OurStoryPage } from '../pages/OurStoryPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RootLayout } from './RootLayout';
import { routes } from './routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.forYou} element={<ForYouPage />} />
        <Route path={routes.openWhen} element={<OpenWhenPage />} />
        <Route path={routes.letter} element={<LetterPage />} />
        <Route path={routes.ourStory} element={<OurStoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
