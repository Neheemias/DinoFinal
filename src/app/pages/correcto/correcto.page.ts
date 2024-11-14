import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [
    //IonContent, 
    //IonHeader, 
    //IonTitle, 
    //IonToolbar,
    CommonModule,
    IonicModule, 
    FormsModule,
    TranslateModule,        // Permite usar el pipe 'translate'
    LanguageComponent, // Lista de idiomas
    HeaderComponent]
})
export class CorrectoPage  {
  public usuario!: User ;

  constructor(public user: User) { }

  
  secretAnswer = '';

  

   

}
