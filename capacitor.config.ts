import { CapacitorConfig } from '@capacitor/cli';

function getLocalNotificationConfig() {
  return {
    smallIcon: "ic_stat_icon_config_sample", // Icono de la app solo para Android
    iconColor: "#488AFF", // Color de Icono
    sound: "beep.wav", // Sonido de la notificación solo para Android"
    schedule: [
      {
        title: 'Tienes que ir al baño',
        sound: 'bathroom.wav', // Aquí puedes poner el sonido específico para "Tienes que ir al baño"
        repeats: true,
        every: 'day', // Opción para repetir la notificación cada día
        channelId: 'bathroom_channel' // Identificador de canal para Android, opcional
      },
      {
        title: 'Tienes que ir a dormir',
        sound: 'sleep.wav', // Aquí puedes poner el sonido específico para "Tienes que ir a dormir"
        repeats: true,
        every: 'day', // Opción para repetir la notificación cada día
        channelId: 'sleep_channel' // Identificador de canal para Android, opcional
      },
      {
        title: 'Tienes que ir a comer',
        sound: 'eat.wav', // Aquí puedes poner el sonido específico para "Tienes que ir a comer"
        repeats: true,
        every: 'day', // Opción para repetir la notificación cada día
        channelId: 'eat_channel' // Identificador de canal para Android, opcional
      }
    ]
  };
}

const config: CapacitorConfig = {
  appId: 'com.carla.app',
  appName: 'carla',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LocalNotifications: getLocalNotificationConfig()
  }
};

export default config;
