import { Component, ElementRef, ViewChild } from '@angular/core';
import { DinosaurComponent } from 'src/app/components/dinosaur/dinosaur.component';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, AnimationController, IonContent, IonItem, IonToolbar, IonLabel, IonButton } from '@ionic/angular/standalone'
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { Dinosaur } from 'src/app/model/dinosaur';
import { Capacitor } from '@capacitor/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { ForumComponent } from 'src/app/components/forum/forum.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationalLevel } from 'src/app/model/educational-level';
import { User } from 'src/app/model/user';
import { IonicModule } from '@ionic/angular';
import { DatePickerComponent } from "../../components/date-picker/date-picker.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    //IonButton,
    //IonLabel,
    //IonToolbar,
    //IonItem, 
    CommonModule,
    FormsModule,
    TranslateModule,
    //IonContent,
    IonicModule,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    QrWebScannerComponent,
    DinosaurComponent,
    ForumComponent,
    DatePickerComponent
]
})
export class HomePage {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;
  
  public listaNivelesEducacionales = EducationalLevel.getLevels();
  public usuario: User;
  
  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';

  constructor(private auth: AuthService, private scanner: ScannerService , private router: Router, private activatedRoute: ActivatedRoute ,
    private animationController: AnimationController ,
    private alertController: AlertController) {
    this.usuario = new User();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ionViewWillEnter() {
    this.changeComponent('welcome');
  }

  async headerClick(button: string) {

    if (button === 'testqr')
      this.showDinoComponent(Dinosaur.jsonDinoExample);

    if (button === 'scan' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'qrwebscanner';

    if (button === 'scan' && Capacitor.getPlatform() !== 'web')
        this.showDinoComponent(await this.scanner.scan());
  }

  webQrScanned(qr: string) {
    this.showDinoComponent(qr);
  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  showDinoComponent(qr: string) {

    if (Dinosaur.isValidDinosaurQrCode(qr)) {
      this.auth.qrCodeData.next(qr);
      this.changeComponent('dinosaur');
      return;
    }
    
    this.changeComponent('welcome');
  }

  footerClick(button: string) {
    this.selectedComponent = button;
  }

  changeComponent(name: string) {
    this.selectedComponent = name;
    this.footer.selectedButton = name;
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    this.animarVueltaDePagina();
  }

  public actualizarNivelEducacional(event: any) {
    this.usuario.educationalLevel 
      = EducationalLevel.findLevel(event.detail.value)!;
  }

  limpiarPagina() {
    this.usuario.userName = '';
    this.usuario.firstName = '';
    this.usuario.lastName = '';
    this.usuario.educationalLevel = EducationalLevel.findLevel(1)!;
    //this.usuario.dateOfBirth = ;
  }

  Salir(){
    this.router.navigate(['/ingreso'])
  }

  limpiarAnimandoDerIzq() {
    this.limpiarPagina();
    this.animarDerIzq(this.itemCuenta.nativeElement, 100);
    this.animarDerIzq(this.itemNombre.nativeElement, 200);
    this.animarDerIzq(this.itemApellido.nativeElement, 300);
    this.animarDerIzq(this.itemEducacion.nativeElement, 400);
    this.animarDerIzq(this.itemFechaNacimiento.nativeElement, 500);
  }

  limpiarAnimandoRotacion() {
    this.limpiarPagina();
    this.animarRotacion(this.itemCuenta.nativeElement, 800);
    this.animarRotacion(this.itemNombre.nativeElement, 1100);
    this.animarRotacion(this.itemApellido.nativeElement, 1400);
    this.animarRotacion(this.itemEducacion.nativeElement, 1700);
    this.animarRotacion(this.itemFechaNacimiento.nativeElement, 2000);
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1)
      .play();
  }

  animarDerIzq(nativeElement: any, duration: number) {
    this.animationController
      .create()
      .addElement(nativeElement)
      .iterations(1)
      .duration(duration)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }

  animarRotacion(elementRef: any, duration: number) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(duration)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)')
      .play();
  }

  animarVueltaDePagina() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'rotateY(deg)', 'rotateY(-180)')
      .duration(1000)
      .fromTo('transform', 'rotateY(-180deg)', 'rotateY(0deg)')
      .play();
  }

  asignado(texto: string) {
    if (texto.trim() !== '') {
      return texto;
    }
    return 'No asignado';
  }

  mostrarDatosPersona() {
    // Si el usuario no ingresa la cuenta, se mostrará un error
    if (this.usuario.userName.trim() === '') {
      this.mostrarMensajeAlerta('La cuenta es un campo obligatorio.');
      return;
    }

    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    this.usuario.firstName = this.usuario.firstName.trim();
    this.usuario.lastName = this.usuario.lastName.trim();
    if (this.usuario.firstName.trim() === '' && this.usuario.lastName === '') {
      this.mostrarMensajeAlerta('Debe ingresar al menos un nombre o un apellido.');
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    //let mensaje = `
      //<small>
       // <b>Cuenta:     </b> ${this.usuario.userName} <br>
       // <b>Usuario:    </b> ${this.usuario.email} <br>
       // <b>Nombre:     </b> ${this.asignado(this.usuario.firstName)} <br>
       // <b>Apellido:   </b> ${this.asignado(this.usuario.lastName)} <br>
       // <b>Educación:  </b> ${this.asignado(this.usuario.educationalLevel.getEducation())} <br>
       // <b>Nacimiento: </b> ${this.usuario.dateOfBirth()}
      //</small>
     //`;
    //this.mostrarMensajeAlerta(mensaje);
  }

  async mostrarMensajeAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Datos personales',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }


  qr(){
    this.router.navigate(['/leerqr'])
  }

  miClase(){
    this.router.navigate(['/miclase'])
  }

  foro(){
    this.router.navigate(['/foro'])
  }

  misDatos(){
    this.router.navigate(['/mis-datos'])
  }


}
