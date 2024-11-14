import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-miclase',
    templateUrl: './miclase.page.html',
    styleUrls: ['./miclase.page.scss'],
    standalone: true,
    imports: [IonButton, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class MiclasePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
