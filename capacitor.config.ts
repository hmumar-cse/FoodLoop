import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.foodloop.app',
  appName: 'FoodLoop',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

