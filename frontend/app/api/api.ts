import { logger } from '../../pino';

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const isProd = process.env.NODE_ENV === "production";
const api = isProd ? "/octopus/api" : `${BACKEND_API}/api`;

logger.info(`Using backend API URL: ${api}`);
export default api;
