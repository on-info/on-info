import { baseURLDev } from './Configs/dev.json';
import { baseURLProd } from './Configs/prod.json';

let dev = process.env.NODE_ENV !== 'production';

export let server = dev ? baseURLDev : baseURLProd;
