import { Component, OnInit } from '@angular/core';
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
export class PreguntasPage implements OnInit {

   public usuario!: User ;
   respuesta: string = '';

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    ) {
      this.activatedRouter.queryParams.subscribe ((params: Params) =>  {
                const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
          this.usuario = navigation.extras.state['usuario'];
        } else {
          this.router.navigate(['/ingreso']);
        }
      });
     }

  ngOnInit() {
  }

  public validarRespuesta(): void{
    if (this.usuario.secretAnswer === this.respuesta){
      showToast('Correo validado con éxito. Redirigiendo...');
        this.router.navigate(['/orrecto'])
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  Salir(){
    this.router.navigate(['/ingreso'])
  }
}