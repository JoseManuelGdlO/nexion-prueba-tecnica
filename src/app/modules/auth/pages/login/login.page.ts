import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ACCESS_TOKEN } from 'src/app/shared/utils/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    // Define un formulario reactivo que contiene los controles email y password.
    loginForm: FormGroup = new FormGroup({
        email: this.fb.control('', [Validators.required, Validators.email]), // Control de email con validaciones.
        password: this.fb.control('', [Validators.required, Validators.minLength(6)]), // Control de password con validaciones.
    });

    constructor(
        private fb: FormBuilder, // Inyecta el FormBuilder para gestionar formularios reactivos.
        public router: Router, // Inyecta el Router para la navegación entre páginas.
        public storageService: StorageService, // Inyecta el servicio de almacenamiento para guardar datos.
        public toastcontroller: ToastController // Inyecta el ToastController para mostrar mensajes emergentes.
    ) { }

    ngOnInit() {
        // Inicializa el formulario reactivo con los controles necesarios.
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]], // Campo de email con validaciones.
            password: ['', [Validators.required, Validators.minLength(6)]], // Campo de contraseña con validaciones.
        });
    }

    // Método que se llama al enviar el formulario.
    onSubmit() {
        if (this.loginForm.valid) { // Verifica si el formulario es válido.
            const email = this.loginForm.get('email')?.value; // Obtiene el valor del campo email.
            const password = this.loginForm.get('password')?.value; // Obtiene el valor del campo password.
            const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase.

            // Intenta iniciar sesión con el email y la contraseña proporcionados.
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user: any = userCredential.user; // Captura la información del usuario.
                    this.storageService.set(ACCESS_TOKEN, user['accessToken']); // Almacena el token de acceso en el almacenamiento.
                    this.router.navigateByUrl('/home'); // Redirige al usuario a la página de inicio.
                })
                .catch((error) => {
                    const errorCode = error.code; // Captura el código de error.
                    const errorMessage = error.message; // Captura el mensaje de error.
                    console.error('Error:', errorCode, errorMessage); // Imprime el error en la consola.

                    // Crea un toast con el mensaje de error.
                    this.toastcontroller.create({
                        message: errorMessage, // Establece el mensaje del toast.
                        duration: 2000, // Duración del toast en milisegundos.
                        color: 'light' // Establece el color del toast.
                    }).then(toast => toast.present()); // Muestra el toast en la vista.
                });
        }
    }

    // Método que navega a la página de registro.
    signup() {
        this.router.navigateByUrl('/auth/signup'); // Redirige a la ruta de registro.
    }
}
