import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { showToast  } from 'src/app/tools/message-functions';
import { Params } from '@angular/router';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
  standalone: true,
  imports: [
    //IonContent, 
    //IonHeader, 
    //IonTitle, 
    //IonToolbar, 
    CommonModule,
    FormsModule, 
    IonicModule,             // Permite usar componentes de Ionic
    TranslateModule,        // Permite usar el pipe 'translate'
    LanguageComponent, // Lista de idiomas
    HeaderComponent // CGV-Permite usar el componente Header
  ]
})
export class PreguntasPage  {



   public usuario!: User ;
   respuesta: string = '';
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bd: DatabaseService
    ) {
      this.activatedRoute.queryParams.subscribe ((params: Params) =>  {
                const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
          this.usuario = navigation.extras.state['usuario'];
        } else {
          this.router.navigate(['/login']);
        }
      });
     }

  

//  public validarRespuesta(): void{
//    if (this.bd.findAnswer === this.respuesta){
//      showToast('Correo validado con éxito. Redirigiendo...');
//        this.router.navigate(['/correcto'])
//    } else {
//      this.router.navigate(['/incorrecto']);
//    }
//  }

async validarRespuesta() {
  if (!this.respuesta) {
      // Si no se ingresa un correo, mostramos un mensaje de error
     showToast('Por favor, ingresa una respuesta.');
      return;
    }

    // Consultamos si el correo está registrado en la base de datos
    try {
      const correo = await this.bd.findAnswer(this.respuesta);

      if (this.respuesta) {
        // Si el correo es encontrado, redirigimos a la página que desees
       showToast('Respuesta correcta. Redirigiendo...');
        this.router.navigate(['/correcto'], {  // Ejemplo: redirigir a la página de contraseña
          state: { correo: this.respuesta }  // Pasar el correo a la siguiente página
        });
      } else {
        // Si el correo no existe, mostramos un mensaje de error
        showToast('La respuesta no es la correcta');
        this.router.navigate(['/incorrecto']);  
      }
    } catch (error) {
      // Manejo de errores si hay problemas con la consulta
      console.error('Error al validar la respuesta:', error);
      showToast('Hubo un problema al validar la respuesta. Intenta nuevamente.');
     }
    }
  
}