// data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tareas: any[] = [];

 

  setTareas(nuevasTareas: any[]): void {
    this.tareas = nuevasTareas;
    console.log(this.tareas);
  }
  getTareas(): any[] {
    return this.tareas;
  }
}
