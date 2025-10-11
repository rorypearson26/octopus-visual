import { logger } from '../../pino';

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API_URL;
logger.info(`Using backend API URL: ${BACKEND_API}`);
const api = `${BACKEND_API}/api`;
export default api;
