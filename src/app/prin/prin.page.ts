import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import gsap from 'gsap';

@Component({
  selector: 'app-prin',
  templateUrl: './prin.page.html',
  styleUrls: ['./prin.page.scss'],
})
export class PrinPage implements OnInit {
  usuarioID: string = "";

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: NavController,
    private db: Firestore,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.obtenerTareas();
    this.obtenerCarla();
    gsap.to(".button-enlace", {
      duration: 1,
      ease: "power1.out",
      y: -500,
      opacity: 1
    });
  }

  tareas: any[] = [];
  ruta: any;
  user: any;
  user1: any;
  nombre: any;
  code: any;

  async obtenerCarla() {
    this.user = await this.storage.get('User');
    this.ruta = collection(this.db, 'Carlas');
    const ref = query(this.ruta, where('usuario', '==', this.user));
    const consulta = await getDocs(ref);
    consulta.forEach(element => {
      const dato = element.data() as carla;
      if (dato.usuario === this.user) {
        this.user1 = dato.usuario;
        this.nombre = dato.nombre;
        this.code = dato.codigo;
      }
    });
  }

  async obtenerTareas() {
    this.user = await this.storage.get('User');
    this.ruta = collection(this.db, 'Tareas');
    const ref = query(this.ruta, where('usuario', '==', this.user), orderBy('fecha', 'asc'));
    const consulta = await getDocs(ref);

    this.tareas = [];
    consulta.forEach(element => {
      const dato = element.data() as datauser;
      const color = dato.color;
      const comando = dato.comando;
      const fecha = dato.fecha.toDate(); // Convertir a objeto Date
      const logoCom = dato.logoCom;
      const id = dato.id;
      const usuario = dato.usuario;
      this.tareas.push({ color, comando, fecha, logoCom, id, usuario });
    });

    // Programar notificaciones después de obtener las tareas
    this.programarNotificaciones();
  }

  async programarNotificaciones() {
    await LocalNotifications.requestPermissions();

    // Obtener la fecha y hora actual
    const now = new Date();

    // Iterar sobre las tareas y programar una notificación para cada una si ha llegado el momento adecuado
    this.tareas.forEach(async tarea => {
      const { comando, fecha } = tarea;

      // Verificar si la fecha de la tarea es posterior a la fecha actual
      if (fecha > now) {
        // Calcular la diferencia en milisegundos entre la fecha de la tarea y la fecha actual
        const tiempoRestante = fecha.getTime() - now.getTime();

        // Programar la notificación solo si el tiempo restante es mayor que cero
        if (tiempoRestante > 0) {
          // Programar la notificación con un retraso igual al tiempo restante
          setTimeout(async () => {
            // Lógica para programar una notificación para el comando dado
            let image = '';
            let sound = '';
            switch (comando) {
              case 'ir al baño':
                image = 'ir_al_baño.png';
                sound = '003.mp3';
                break;
              case 'ir a comer':
                image = 'ir_a_comer.jpg';
                sound = '004.mp3';
                break;
              // Agregar más casos según los comandos que tengas
              default:
                // Si no hay una imagen o sonido específico para el comando, usar valores predeterminados o dejar vacío
                break;
            }

            await LocalNotifications.schedule({
              notifications: [
                {
                  title: `¡${comando}!`,
                  body: `Hora de ${comando}!`,
                  id: Math.floor(Math.random() * 1000), // ID de notificación único
                  schedule: { at: new Date() }, // Programar la notificación en el momento actual
                  attachments: [
                    { id: 'image', url: `assets/images/${image}` }, // Ruta relativa de la imagen
                  ],
                  sound: `assets/sounds/${sound}`, // Ruta relativa del sonido
                }
                
              ]
            });
          }, tiempoRestante);
        }
      }
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.obtenerTareas();
      this.obtenerCarla();
      event.target.complete();
    }, 2000);
  }

  tiempoRes() {
    // Función para calcular el tiempo restante para las tareas
  }
}

interface carla {
  nombre: string;
  codigo: string;
  usuario: string;
}

interface datauser {
  color: string;
  comando: string;
  fecha: any; // Tipo any porque se convertirá a Date
  logoCom: number;
  id: number;
  usuario: number;
}
