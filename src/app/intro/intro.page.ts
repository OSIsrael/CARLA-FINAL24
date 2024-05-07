import { Component, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { AlertController, IonInput, LoadingController, NavController, ToastController } from '@ionic/angular';
import { BarcodeScanner,Barcode } from '@capacitor-mlkit/barcode-scanning';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Storage } from '@ionic/storage-angular';
import { gsap } from "gsap";
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  
  @ViewChild('code1') code1!: IonInput;
  @ViewChild('code2') code2!: IonInput;
  @ViewChild('code3') code3!: IonInput;
  @ViewChild('code4') code4!: IonInput;
  @ViewChild('code5') code5!: IonInput;
  @ViewChild(Swiper) slides!: Swiper;
  inputModel = '';
  cod1:string='';
  cod2:string='';
  cod3:string='';
  cod4:string='';
  ruta:any;
  name:any;
  go:boolean=false;
  go1:boolean=false;
  codigo:any;
  @ViewChild(IonInput, { static: true }) ionInputEl!: IonInput;
  constructor(private storage:Storage,private router:NavController,private loadingCtrl:LoadingController,private alertController: AlertController, private toastController:ToastController, private db:Firestore) {}
  
  ngOnInit() {
    this.go=false;
    this.go1=false;
    gsap.from(".img", {
      rotation: 270,
      opacity: 0, 
      y: 100, 
      duration: 1.5
    });

  }
  async correct(){
    
    this.showLoading('Agregando información');
    this.ruta = await doc(this.db,'Carlas', this.codigo);
    await setDoc(this.ruta,{nombre: this.name, codigo: this.codigo, usuario: await this.storage.get('User')});
    this.loadingCtrl.dismiss();
    this.presentToast('top',"Carla configurada para este usuario correctamente");
    this.router.navigateRoot('prin');
    
  }
  initSwiper() {
    this.slides.on('slideChange', () => {
      this.cambiado();
    });
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', mensaje:any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: position,
    });

    await toast.present();
  }
  async cambiado(){
    const currentIndex = await this.slides.activeIndex;
    if (currentIndex === 3) {
      this.focusSiguiente(this.code1);
    }
  }
  async scan(){
    if(this.cod1=='' || this.cod2=='' || this.cod3=='' || this.cod4==''){
      this.presentToast('top',"Ingresa el código completo");
    }else{
      this.codigo=this.cod1+this.cod2+this.cod3+this.cod4;
      console.log(this.codigo);
      this.ruta = doc(this.db,"Carlas",this.codigo);
      this.showLoading('Comprobando existencia de tu CARLA');
      const compro = await getDoc(this.ruta);
      
      if(await compro.exists()){
        this.go=true;
      }else{
        this.presentToast('top','Esta CARLA no existe, ingresa un código válido');
      }
    }
  }
  async nameInput(){
    this.ruta = doc(this.db,"Carlas",this.codigo);
    this.showLoading('Configurando nombre');
    this.loadingCtrl.dismiss();
    this.go1=true;
  }
  async showLoading(mensaje:any) {
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1500,
      spinner: 'dots'
    });

    loading.present();
  }
  focusSiguiente(nextInput: IonInput | undefined) {
    if (nextInput) {
      nextInput.setFocus();
    }
  }
  async presentAlert(content:any){
    const alert = await this.alertController.create({
      header: content,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
