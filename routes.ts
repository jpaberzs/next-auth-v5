/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error'];

/**
 * The prefix for API authentication routes
 * Routes that atart with this ptefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
