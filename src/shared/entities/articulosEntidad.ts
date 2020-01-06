import {SafeUrl} from '@angular/platform-browser';

export class ArticulosEntidad {
  id: number;
  fecha: Date;
  esp_titulo: string;
  ing_titulo: string;
  ubicacion_thumbnail: string;
  esp_cuerpo: string;
  ing_cuerpo: string;
  id_area_interes: number;
  correo_usuario: string;
  url_imagen: SafeUrl;
  nombreAutor: string;
}
