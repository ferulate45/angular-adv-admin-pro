import { EventEmitter, Injectable } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _hideModal: boolean = true;

  tipo: 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
  id: string = '';
  img?: string;

  nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get hideModal(){
    return this._hideModal;
  }

  openModal(tipo: 'usuarios' | 'medicos' | 'hospitales',
            id: string = '',
            img: string = 'no-image')
  {
    this._hideModal = false;

    this.tipo = tipo;
    this.id = id;

    if(img.includes('https')){
      this.img = img;
    }else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  closeModal(){
    this._hideModal = true;
  }

  constructor() { }
}
