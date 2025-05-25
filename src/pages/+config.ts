// src/pages/+config.ts
import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';
import Layout from '../layouts/Layout';
// import favicon from '../';

export default {
  Layout,              
  title:       'Portfolio | Kazuki Fujimoto',
  lang:'ja',

  favicon: '/favicon.ico',
  extends:   vikeReact,     
  prerender: true           
} satisfies Config;
