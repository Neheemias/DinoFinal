import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';

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
    LanguageComponent ]
})
export class CorreoPage implements OnInit {
  
  public email: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async validarRespuesta(): Promise<void> {
    const user = new User();
    const usuarioEncontrado = await user.findByEmail(this.email); // Función async en User

    if (!usuarioEncontrado) {
      alert('EL CORREO NO EXISTE DENTRO DE LAS CUENTAS EXISTENTES');
    } else {
      const navigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      await this.router.navigate(['/pregunta'], navigationExtras);
    }
  }
  


}