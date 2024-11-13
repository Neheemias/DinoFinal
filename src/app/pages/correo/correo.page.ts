import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { showToast } from 'src/app/tools/message-functions';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [
    //IonContent, 
    //IonHeader, 
    //IonTitle, 
    //IonToolbar, 
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LanguageComponent,
    HeaderComponent,
    FooterComponent
]
})
export class CorreoPage  {
  
   email: string = '';

   // Inyección de Usuario
   constructor(private router: Router ,

    private bd: DatabaseService, private authService: AuthService
   ) { }

  ngOnInit() {}

  

 async respuesta() {
  if (!this.email) {
      // Si no se ingresa un correo, mostramos un mensaje de error
     showToast('Por favor, ingresa un correo electrónico.');
      return;
    }

    // Consultamos si el correo está registrado en la base de datos
    try {
      const correo = await this.bd.findUserByEmail(this.email);

      if (this.email) {
        // Si el correo es encontrado, redirigimos a la página que desees
       showToast('Correo validado con éxito. Redirigiendo...');
        this.router.navigate(['/preguntas'], {  // Ejemplo: redirigir a la página de contraseña
          state: { correo: this.email }  // Pasar el correo a la siguiente página
        });
      } else {
        // Si el correo no existe, mostramos un mensaje de error
        showToast('El correo ingresado no está registrado.');
        this.router.navigate(['/incorrecto']);  
      }
    } catch (error) {
      // Manejo de errores si hay problemas con la consulta
      console.error('Error al validar el correo:', error);
      showToast('Hubo un problema al validar el correo. Intenta nuevamente.');
     }
    }
  }
  


