import {
  createMediaHandler,
  mediaHandlerConfig
} from 'next-tinacms-cloudinary/dist/handlers';
import { isAuthorized, TinaCloudUser } from '@tinacms/auth';

export const config: typeof mediaHandlerConfig = {
  api: {
    bodyParser: false
  }
};

export default createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  authorized: async (req, _res) => {
    try {
      if (Boolean(Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT ?? true))) {
        return true;
      }

      const user = (await isAuthorized(req)) as TinaCloudUser;
      return user && user.verified;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
});
