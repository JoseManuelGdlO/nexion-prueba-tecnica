import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { LoginPage } from './login.page';
import { StorageService } from 'src/app/shared/services/storage.service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SharedModule } from 'src/app/shared/shared.module';

class MockRouter {
    navigateByUrl(url: string) {}
}

class MockStorageService {
    set(key: string, value: any) {}
}

class MockToastController {
    create() {
        return {
            then: (callback: any) => callback({ present: () => {} })
        };
    }
}

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let router: Router;
    let storageService: StorageService;
    let toastController: ToastController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginPage],
            imports: [ReactiveFormsModule, IonicModule, FormsModule, SharedModule, IonicStorageModule.forRoot()],
            providers: [
                { provide: Router, useClass: MockRouter },
                { provide: StorageService, useClass: MockStorageService },
                { provide: ToastController, useClass: MockToastController },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        storageService = TestBed.inject(StorageService);
        toastController = TestBed.inject(ToastController);
        fixture.detectChanges();
    });

    it('should create the login page', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with email and password controls', () => {
        expect(component.loginForm.contains('email')).toBeTruthy();
        expect(component.loginForm.contains('password')).toBeTruthy();
    });

    it('should mark the email field as required', () => {
        const emailControl = component.loginForm.get('email');
        emailControl?.setValue('');
        expect(emailControl?.valid).toBeFalsy();
    });

    it('should mark the password field as required', () => {
        const passwordControl = component.loginForm.get('password');
        passwordControl?.setValue('');
        expect(passwordControl?.valid).toBeFalsy();
    });

    it('should call the signup method to navigate to the signup page', () => {
        spyOn(router, 'navigateByUrl');
        component.signup();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/signup');
    });
});
