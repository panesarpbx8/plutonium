import { Routes } from '@angular/router';
import { AuthGuard } from './shared/access/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () =>import('./routes/home/home.component').then(c => c.HomeComponent),
  },
  { 
    path: 'login', 
    loadComponent: () => import('./routes/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./routes/privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./routes/search/search.component').then(c => c.SearchComponent),
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./routes/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [AuthGuard],
  },
  { 
    path: 'articles', 
    loadComponent: () => import('./routes/articles/pages/articles/articles.component').then(c => c.ArticlesComponent),
  },
  { 
    path: 'articles/:slug', 
    loadComponent: () => import('./routes/articles/pages/article/article.component').then(c => c.ArticleComponent),
  },
  { 
    path: 'hashtags', 
    loadComponent: () => import('./routes/hashtags/pages/hashtags/hashtags.component').then(c => c.HashtagsComponent), 
  },
  { 
    path: 'hashtags/:hashtag', 
    loadComponent: () => import('./routes/hashtags/pages/hashtag/hashtag.component').then(c => c.HashtagComponent), 
  },
  { 
    path: '**', 
    loadComponent: () => import('./routes/not-found/not-found.component').then(c => c.NotFoundComponent), 
  },
];


