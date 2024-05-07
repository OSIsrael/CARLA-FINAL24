import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Timestamp, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-agendar-page',
  templateUrl: './agendar-page.page.html',
  styleUrls: ['./agendar-page.page.scss'],
})
export class AgendarPagePage implements OnInit {

  async ngOnInit() {
    await this.storage.create();
    this.hora();
  }
  fechaHoraFormateada:any;
  async hora(){
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const horaFormateada = fecha.toLocaleTimeString('es-EC', { hour12: false });
    this.fechaHoraFormateada = await `${fechaFormateada}T${horaFormateada}`;
  }
  formData = {
    logoCom:"",
    comando:"",
    fecha:"",
    color:""
  }
  botonHabilitado: boolean = false;
  actualizarEstadoBoton() {
    this.botonHabilitado = this.formData.logoCom !== '' && this.formData.comando !== ''&& this.formData.fecha !== null && this.formData.color!=='';
  }
  constructor(private alertController:AlertController,private db:Firestore, private storage:Storage) {}
 
  ruta:any;
  id:any;
  async agregarTarea(){
    try{
      const usuarios = await this.storage.get("User");
    const number = usuarios + this.formData.comando + this.formData.fecha + this.formData.logoCom;
    const fechaHoraLocal = new Date(this.formData.fecha);
    const fechaHoraUTC = new Date(fechaHoraLocal.toUTCString());
    const fechaHoraFirestore = Timestamp.fromDate(fechaHoraUTC);
    const poscoma = this.formData.color.indexOf(",");
    const posdoblecoma = this.formData.color.indexOf(",,");
    this.ruta = doc(this.db,'Tareas', number);
    await setDoc(this.ruta, { id: number, logoCom:this.formData.logoCom, r:this.formData.color.substring(0,poscoma),g:this.formData.color.substring(poscoma+1,posdoblecoma),b:this.formData.color.substring(posdoblecoma+2), comando:this.formData.comando, fecha: fechaHoraFirestore, usuario: usuarios});
    }catch(err){
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Comprueba tu conexión a internet',
          message: 'Error'+err,
          buttons: ['OK'],
        });
    
        await alert.present();
      
    }
   }
  
}
interface FormData {
  logoCom: string;
  comando: string;
  fecha: Date; // fecha puede ser Timestamp o null
  color: string;
}