import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { collection, doc, getDoc, where,query, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  rutauser:any;
  storage1:any;

  nombreNino: string="";
  usuario: string="";
  edadNino: string="";
  constructor(private actionSheetCtrl: ActionSheetController, private router: NavController, private db:Firestore, private storage:Storage) { 
    
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cerrar Sesión',
          role: 'destructive',
          data: {
            action: 'delete',
            
          },
          handler: () => {
            this.router.navigateForward('home');
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }
  
  async ngOnInit(){
    await this.mostrardatos();
  }
capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}  
async mostrardatos(){
  this.storage1 = await this.storage.get('User');
  this.rutauser = doc(this.db, 'Registros', this.storage1);
  const rutadoc = await getDoc(this.rutauser);
  const info = await rutadoc.data() as datauser;
  this.nombreNino = this.capitalizeFirstLetter(info.nombreNino);
  this.usuario = info.usuario;
  this.edadNino = info.edadNino;
  console.log("Datos del usuario:", this.nombreNino, this.usuario, this.edadNino);
}
}
interface datauser {
  nombreNino: string;
  contrasena: string;
  usuario: string;
  edadNino: string;
}

