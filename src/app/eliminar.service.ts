import { Injectable, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular';
import { Timestamp, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { timestamp } from 'rxjs';
import { LocalNotifications} from '@capacitor/local-notifications';
@Injectable({
  providedIn: 'root'
})
export class EliminarService implements OnInit {

  constructor(private db:Firestore) {
    this.repeliminar();
  }
  async ngOnInit(){
    await LocalNotifications.requestPermissions();
  }
  repeliminar(){
    this.eliminar();
    setInterval(() => {
      this.eliminar();
      console.log("eliminado registro");
    }, 60000);
  }

  usuario:any;
  ruta:any;
  tareas:any[]=[];
  async eliminar(){
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const horaFormateada = fecha.toLocaleTimeString('es-EC', { hour12: false });
    const fechaHoraFormateada = await `${fechaFormateada}T${horaFormateada}`;
    this.ruta =  await collection(this.db,'Tareas');
    const fecha1 = new Date(fecha);
    fecha1.setMinutes(fecha1.getMinutes() - 1);
    console.log(fecha1);
    const ref = await query(this.ruta,where('fecha','<',fecha1));
    const consulta = await getDocs(ref);
    this.tareas = [];
    
    consulta.forEach(async element => { 
        const dato = element.data() as datauser;
        const id = dato.id.toString();
        const fecha = dato.fecha;
          await LocalNotifications.schedule({
            notifications: [
              {
                title: dato.comando,
                body: 'Es la hora de cumplir una tarea',
                id: 1,
                schedule:{
                  allowWhileIdle:true
                }
              }
            ]
          });
        console.log(id);
        const docRef = doc(this.db, 'Tareas', id);
        await deleteDoc(docRef);
      });

  }
  convertFirestoreTimestamp(timestamp: Timestamp): Date {
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const date = new Date(milliseconds);
    return date;
  }
  
}
interface datauser {
  color: string;
  comando: string;
  fecha: string;
  logoCom: number;
  id: number;
  usuario: number;
}
