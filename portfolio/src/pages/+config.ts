// src/pages/+config.ts
import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';
import Layout from '../layouts/Layout';

export default {
  Layout,              
  title:       'Kazuki Fujimoto',
  lang:'ja',


  extends:   vikeReact,     
  prerender: true           
} satisfies Config;
