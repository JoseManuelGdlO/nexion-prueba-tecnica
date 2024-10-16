import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    // Define un formulario reactivo que contiene tres controles: email, password y confirmPassword.
    signupForm: FormGroup = new FormGroup({
        email: this.fb.control('', [Validators.required, Validators.email]), // Control de email con validaciones.
        password: this.fb.control('', [Validators.required, Validators.minLength(6)]), // Control de contraseña con validaciones.
        confirmPassword: this.fb.control('', Validators.required) // Control para confirmar la contraseña.
    });

    constructor(private fb: FormBuilder, public router: Router, public toastController: ToastController) { }

    ngOnInit() {
        // Inicializa el formulario reactivo y establece los validadores.
        this.signupForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]], // Campo de email.
            password: ['', [Validators.required, Validators.minLength(6)]], // Campo de contraseña.
            confirmPassword: ['', Validators.required] // Campo para confirmar la contraseña.
        }, {
            validators: this.passwordsMatchValidator // Validador personalizado para comprobar si las contraseñas coinciden.
        });
    }

    // Validador personalizado que comprueba si las contraseñas coinciden.
    passwordsMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value; // Obtiene el valor del campo password.
        const confirmPassword = form.get('confirmPassword')?.value; // Obtiene el valor del campo confirmPassword.

        return password === confirmPassword ? null : { mismatch: true }; // Retorna null si coinciden, de lo contrario, un objeto de error.
    }

    // Método que se llama al enviar el formulario.
    onSubmit() {
        if (this.signupForm.valid) { // Verifica si el formulario es válido.
            const { email, password } = this.signupForm.value; // Desestructura email y password del formulario.

            const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase.
            // Crea un nuevo usuario con el email y la contraseña proporcionados.
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: UserCredential) => {
                    // Registro exitoso
                    const user = userCredential.user; // Obtiene el objeto del usuario registrado.
                    if (user.uid) { // Verifica si el usuario tiene un ID.
                        this.router.navigateByUrl('/auth'); // Redirige a la ruta '/auth'.
                    }
                })
                .catch((error) => {
                    const errorCode = error.code; // Captura el código de error.
                    const errorMessage = error.message; // Captura el mensaje de error.
                    this.toastController.create({ // Crea un toast con el mensaje de error.
                        message: 'El usuario ya existe', // Establece el mensaje del toast.
                        duration: 2000, // Duración del toast en milisegundos.
                        color: 'danger' // Establece el color del toast.
                    }).then(toast => toast.present()); // Muestra el toast en la vista.
                    console.error('Error:', errorCode, errorMessage); // Imprime el error en la consola.
                });
        }
    }
}
