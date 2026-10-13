import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const DEFAULT_TITLE = 'satech';

// /check is gated so it can be switched off in production without a code change.
// Set VITE_COMPLIANCE_CHECK_ENABLED=true to show it.
const complianceCheckEnabled = import.meta.env.DEV || import.meta.env.VITE_COMPLIANCE_CHECK_ENABLED === 'true';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./pages/LandingPage.vue') },
  { path: '/login', component: () => import('./pages/LoginPage.vue') },
  { path: '/register', component: () => import('./pages/RegistrationPage.vue') },
  { path: '/reset-password', component: () => import('./pages/ResetPasswordPage.vue') },
  { path: '/onboarding', component: () => import('./pages/OnboardingPage.vue') },
  { path: '/dashboard', component: () => import('./pages/DashboardPage.vue') },
  { path: '/dashboard/record', component: () => import('./pages/RecordDetailPage.vue') },
  { path: '/dashboard/add-sensor', component: () => import('./pages/AddSensorDataPage.vue') },
  { path: '/dashboard/historical', component: () => import('./pages/HistoricalDataPage.vue') },
  {
    path: '/check',
    component: () => import('./pages/CheckPage.vue'),
    meta: { title: 'Farm Compliance Check · SA.TECH' },
    beforeEnter: to =>
      complianceCheckEnabled || { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') }, replace: true },
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFoundPage.vue'), meta: { title: '404 · satech' } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  // Hash targets sit below the landing page's fixed 56px header.
  scrollBehavior: (to, _from, saved) => saved ?? (to.hash ? { el: to.hash, top: 64 } : { top: 0 }),
});

router.afterEach(to => {
  document.title = (to.meta.title as string | undefined) ?? DEFAULT_TITLE;
});
