import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { gsap } from "gsap";
import { Firestore,doc,setDoc,getDoc,collection } from '@angular/fire/firestore';
@Component({
  selector: 'app-re',
  templateUrl: './re.page.html',
  styleUrls: ['./re.page.scss'],
})
export class RePage implements OnInit {

  constructor(private alertController:AlertController,private loadingCtrl:LoadingController,private toastController: ToastController,private router: NavController, private db:Firestore) { }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Este usuario ya existe. Por favor, elige otro',
      duration: 3000,
      position: position,
    });

    await toast.present();
  }
  
  formData ={
    user:"",
    pass:"",
    age:"",
    kidname:""
  }

  ngOnInit() {
    gsap.to(".container", {direction: 360, y:-8, duration: 2});
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Creando usuario...',
      duration: 1500,
      spinner: 'dots'
    });

    loading.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Enhorabuena!',
      subHeader: 'Tu usuario ha sido registrado correctamente',
      message: 'Por favor, inicia sesión con tus credenciales nuevas. ¡Disfruta!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  ruta:any;
  compro:any;
  botonHabilitado: boolean = false;

  actualizarEstadoBoton() {
    this.botonHabilitado = this.formData.user !== '' && this.formData.pass !== '' && this.formData.age !== '' && this.formData.kidname !== '';
  }
  async agregarUsuario() {
    this.ruta = doc(this.db,'Registros',this.formData.user);
    const compro = await getDoc(this.ruta);
    this.showLoading();
    if(compro.exists()){
      this.loadingCtrl.dismiss();
      this.presentToast('bottom');
      
    }else{
      
      await setDoc(this.ruta,{usuario:this.formData.user, contrasena:this.formData.pass, nombreNino:this.formData.kidname, edadNino:this.formData.age});
      this.router.navigateForward('inses');
      this.loadingCtrl.dismiss();
      this.presentAlert();
    }
    
    
  }
  
  alertButtons = ['OK'];
  
}
