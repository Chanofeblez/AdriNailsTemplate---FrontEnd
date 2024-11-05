import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myApp.AdriNails',
  appName: 'AdriNails',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LiveUpdates: {
      appId: 'e847d27e', // Tu appId proporcionado
      channel: 'Production', // Cambia 'Production' si prefieres otro canal
      autoUpdateMethod: 'background', // 'background' descarga las actualizaciones automáticamente
      maxVersions: 2 // Puedes ajustar el número de versiones que quieres mantener
    }
  }
};

export default config;

