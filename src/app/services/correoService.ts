import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CorreoService {
  private serviceId = 'service_ytvdoq5';
  private templateId_brigada = 'template_3vhp3wk';
  private templateId_postulacion = 'template_oa0wkth';
  private userId = 'X1hTCkeS_6iqy9AsH';

  constructor(private http: HttpClient) {}

  enviarCorreo(idBrigada: number) {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(`https://proyecto-integrador-5-backend.onrender.com/api/brigadistas/brigada/${idBrigada}`)
      .subscribe({
        next: async (brigadistas) => {
          try {
            for (const b of brigadistas) {
              console.log('📦 brigadista:', b);
              const templateParams = {
                to_email: b.Correo_Electronico,
                nombre: b.Nombre,
                brigada: b.Brigada.Nombre,
                municipio: b.Brigada.Municipio.Nombre,
                fecha: b.Brigada.Fecha_Inicio,
              };

              console.log('🧪 templateParams:', templateParams);


              await emailjs.send(this.serviceId, this.templateId_brigada, templateParams, this.userId);
              console.log('✅ Correo enviado a', b.Correo_Electronico);

            }
            resolve(true);
          } catch (error) {
            console.error('❌ Error al enviar uno de los correos:', error);
            reject(error);
          }
        },
        error: (err) => {
          console.error('❌ Error al obtener brigadistas:', err);
          reject(err);
        }
        });
    });
  }

  enviarCorreoIngreso(correos: string[]){
    return new Promise((resolve, reject) => {
      const to_email = correos.join(",");
      console.log("a")
      const templateParams = { to_email };

      emailjs.send(this.serviceId, this.templateId_postulacion, templateParams, this.userId)
              .then((response) => {
                console.log('✉️ Correos enviados:', response.status, response.text);
                resolve(true);
              })
              .catch((error) => {
                console.error('❌ Error al enviar correos:', error);
                reject(error);
              });
    });
  }
}
