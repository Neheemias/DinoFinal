import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,             // Permite usar componentes de Ionic
    TranslateModule,        // Permite usar el pipe 'translate'
    LanguageComponent, // Lista de idiomas
    HeaderComponent]
})
export class IncorrectoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
