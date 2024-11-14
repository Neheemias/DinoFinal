import { EducationalLevel } from './educational-level';
import { DatabaseService } from '../services/database.service';
import { inject } from '@angular/core';
import { convertDateToString } from '../tools/date-functions';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Person } from './person';



export class User extends Person {

  userName = '';
  email = '';
  password = '';
  secretQuestion = '';
  secretAnswer = '';
  //db: DatabaseService = inject(DatabaseService); // Inyección tardía //Error en esta seccion
  private db!: DatabaseService;
  image = '';


  constructor() {
    
    super();
    
  }

  static getNewUsuario(
    userName: string,
    email: string,
    password: string,
    secretQuestion: string,
    secretAnswer: string,
    firstName: string,
    lastName: string,
    educationalLevel: EducationalLevel,
    dateOfBirth: Date,
    address: string,
    image: string
  ) {
    let usuario = new User();
    usuario.userName = userName;
    usuario.email = email;
    usuario.password = password;
    usuario.secretQuestion = secretQuestion;
    usuario.secretAnswer = secretAnswer;
    usuario.firstName = firstName;
    usuario.lastName = lastName;
    usuario.educationalLevel = educationalLevel;
    usuario.dateOfBirth = dateOfBirth;
    usuario.address = address;
    usuario.image = image;
    return usuario;
  }

   async findUser(userName: string, password: string): Promise<User | undefined> {
     return await this.db.findUser(userName, password);
   }

   async findAnswer(secretAnswer: string): Promise<User | undefined> {
    return await this.db.findAnswer(secretAnswer);
  }

   async findByUserName(userName: string): Promise<User | undefined>  {
     return await this.db.findUserByUserName(userName);
   }

   async findByEmail(email: string): Promise<User | undefined>  {
     return await this.db.findUserByEmail(email);
   }

   async save(): Promise<void> {
     this.db.saveUser(this);
   }

   async delete(userName: string): Promise<void>  {
     this.db.deleteByUserName(userName);
   }

  async recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
    activatedRoute.queryParams.subscribe(async () => { // Cambiar a async
      const nav = router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          const userName = nav.extras.state['userName'];
          const password = nav.extras.state['password'];
          const usuarioInstance = new User();  // Crea una instancia sin pasar parámetros
          const user = await usuarioInstance.findUser(userName, password);  // Usar await
          if (user) {
            this.userName = user.userName;
            this.email = user.email;
            this.password = user.password;
            this.secretQuestion = user.secretQuestion;
            this.secretAnswer = user.secretAnswer;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.educationalLevel = user.educationalLevel;
            this.dateOfBirth = user.dateOfBirth ;
            return;
          }
        }
      }
      router.navigate(['/login']);
    });
  }

  navegarEnviandousuario(router: Router, pagina: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        cuenta: this.email,
        password: this.password, 
      }
    }
    if (this.email.trim() !== '' && this.password.trim()) {
      router.navigate([pagina], navigationExtras);
    } else {
      router.navigate(['/login']);
    }
  }


  override toString(): string {
    return `\n
        User name: ${this.userName}\n
        Email: ${this.email}\n
        Password: ${this.password}\n
        secretQuestion: ${this.secretQuestion}\n
        secretAnswer: ${this.secretAnswer}\n
        First name: ${this.firstName}\n
        Last name: ${this.lastName}\n
        Education level: ${this.educationalLevel.getEducation()}\n
        Date of birth: ${convertDateToString(this.dateOfBirth)}\n
        Address: ${this.address}\n
        Image: ${this.image !== ''}\n
      `;
  }

}