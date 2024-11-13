import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/interfaces/asistencia'; 
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { QrWebScannerComponent } from "../../components/qr-web-scanner/qr-web-scanner.component";

@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.page.html',
  styleUrls: ['./leerqr.page.scss'],
  standalone: true,
  imports: [
    CommonModule // CGV-Permite usar directivas comunes de Angular
    ,
    FormsModule // CGV-Permite usar formularios
    ,
    IonicModule // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    ,
    TranslateModule // CGV-Permite usar pipe 'translate'
    ,
    HeaderComponent // CGV-Permite usar el componente Header
    ,
    FooterComponent, // CGV-Permite usar el componente Footer
    QrWebScannerComponent
]
})
export class LeerqrPage implements OnInit {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public usuario: User;
  public asistencia: Asistencia | undefined = undefined;
  public escaneando = false;
  public datosQR: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    this.usuario = new User();
    this.usuario.recibirUsuario(activatedRoute, router);
  }

  ngOnInit() {
    this.comenzarEscaneoQR();
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth; 
    const h: number = this.video.nativeElement.videoHeight; 
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h; 
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext(
      '2d', {willReadFrequently: true}
    );
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, {inversionAttempts: 'dontInvert'});
    if (qrCode) {
      if (qrCode.data !== ''){
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    this.asistencia = JSON.parse(datosQR);
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

}
