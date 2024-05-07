import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios'; 
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
  import { Storage } from '@ionic/storage-angular'; 
import { Firestore,getDoc,doc,docData  } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { gsap } from "gsap";
@Component({
  selector: 'app-inses',
  templateUrl: './inses.page.html',
  styleUrls: ['./inses.page.scss'],
})
export class InsesPage implements OnInit {
 
  constructor(private storage:Storage,private loadingCtrl:LoadingController,private toastController: ToastController,private router: NavController, private db:Firestore) { }

  formData ={
    user:"",
    pass:""
  }


  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos, o el usuario no existe',
      duration: 3000,
      position: position,
    });

    await toast.present();
  }
   async ngOnInit() {
    await this.storage.create();
    gsap.to(".container", {direction: 360, y:50, duration: 2});

  }

  botonHabilitado: boolean = false;
  rutauser:any;
  valueuser:any;
  usuario:any;
  actualizarEstadoBoton() {
    this.botonHabilitado = this.formData.user !== '' && this.formData.pass !== '';
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión',
      duration: 1500,
      spinner: 'dots'
    });

    loading.present();
  }

  

  async login() {
    this.showLoading();
    this.rutauser = doc(this.db,'Registros',this.formData.user);
    const rutadoc = await getDoc(this.rutauser);
    const info = rutadoc.data() as datauser;
    if(rutadoc.exists() && info.usuario == this.formData.user && info.contrasena == this.formData.pass){
      this.router.navigateForward('prin');
      this.loadingCtrl.dismiss();
      this.storage.set("User",this.formData.user);
    }else{
      this.loadingCtrl.dismiss();
      this.presentToast('bottom');
    }
  }
}
interface datauser {
  nombreNino: string;
  contrasena: string;
  usuario: string;
  edadNino: number;
}