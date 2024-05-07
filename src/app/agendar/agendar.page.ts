  import { Component, OnInit , AfterViewInit} from '@angular/core';
  import { Firestore } from '@angular/fire/firestore';
  import { AlertController, AnimationController, IonRefresher, LoadingController } from '@ionic/angular';
  import { Storage } from '@ionic/storage-angular';
  import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
  import { DataService } from '../data.service'; 
  import { PopoverController } from '@ionic/angular';
  import gsap from 'gsap';
  @Component({
    selector: 'app-agendar',
    templateUrl: './agendar.page.html',
    styleUrls: ['./agendar.page.scss'],
  })
  export class AgendarPage implements OnInit{

  
    constructor(private loadingCtrl:LoadingController , private alertController:AlertController,private service:DataService,private db:Firestore, private storage:Storage,private popoverController: PopoverController, ) { }
    ngOnInit() { 
      this.storage.create();
      this.obtenerTareas();
      this.tareas=[];
      gsap.to(".div-bot", {
        duration:1,
        ease: "power1.out",
        y: -150,
        opacity: 1
        });
    }
    tareas:any[]=[];
    ruta:any;
    user:any;
    consulta:any;
    async obtenerTareas(){
        this.user = await this.storage.get('User');
        this.ruta = collection(this.db, 'Tareas');
        const ref = query(this.ruta, where('usuario', '==', this.user),orderBy('fecha','asc'));
        try{
          const consulta = await getDocs(ref);
          this.tareas = [];
            consulta.forEach(element => {
              const dato = element.data() as datauser;
              const r = dato.r;
              const g = dato.g;
              const b = dato.b;
              const color = "rgb("+r+","+g+","+b+")";
              const comando = dato.comando;
              const fecha = dato.fecha;
              const logoCom = dato.logoCom;
              const id = dato.id;
              const usuario = dato.usuario;
              this.tareas.push({ color, comando, fecha, logoCom, id, usuario });
            });
            console.log(this.tareas[0]);
            this.service.setTareas(this.tareas[0]);
        }catch{
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Comprueba tu conexión a internet',
            buttons: ['OK'],
          });
      
          await alert.present();
        
      }
        
    }
      
    handleRefresh(event:any) {
      setTimeout(() => {
        this.obtenerTareas();
        event.target.complete();
      }, 2000);
    }
    async modificar(id:any){
      console.log("Modifica a: "+id);
    }

    async eliminar(id:any){
      this.presentAlert(id);
    }

    async presentAlert(id: any) {
      const alert = await this.alertController.create({
        header: 'Estás a punto de eliminar esta tarea',
        subHeader: 'Y no se puede recuperar',
        message: '¿Estás seguro?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('No eliminó');
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: async () => {
              this.ruta = collection(this.db, 'Tareas');
              const docRef = doc(this.db, 'Tareas', id);
              await deleteDoc(docRef);
              this.loaEliminar();
              this.obtenerTareas();
              this.loadingCtrl.dismiss();
            },
          },
        ],
      });
    
      await alert.present();
    }
    async loaEliminar() {
      const loading = await this.loadingCtrl.create({
        message: 'Eliminando...',
        duration: 1500,
        spinner: 'dots'
      });
  
      loading.present();
    }
  }

  interface datauser {
    r: string;
    g: string;
    b: string;
    comando: string;
    fecha: string;
    logoCom: number;
    id: number;
    usuario: number;
  }