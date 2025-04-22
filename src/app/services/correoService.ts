import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CorreoService {
  private serviceId = 'service_ytvdoq5';
  private templateId = 'template_3vhp3wk';
  private userId = 'X1hTCkeS_6iqy9AsH';

  constructor(private http: HttpClient) {}

  enviarCorreo(idBrigada: number) {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(`http://localhost:3000/api/brigadistas/brigada/${idBrigada}`)
        .subscribe({
          next: (brigadistas) => {
            const correos = brigadistas.map(b => b.Correo_Electronico);
            const to_email = correos.join(',');

            // 👉 Ver lo que se envía
            console.log('📤 Correos que se van a enviar:', to_email);

            const templateParams = { to_email };

            emailjs.send(this.serviceId, this.templateId, templateParams, this.userId)
              .then((response) => {
                console.log('✉️ Correos enviados:', response.status, response.text);
                resolve(true);
              })
              .catch((error) => {
                console.error('❌ Error al enviar correos:', error);
                reject(error);
              });
          },
          error: (err) => {
            console.error('❌ Error al obtener brigadistas:', err);
            reject(err);
          }
        });
    });
  }
}
