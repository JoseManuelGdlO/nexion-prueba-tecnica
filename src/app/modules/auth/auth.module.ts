import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPage } from "./pages/login/login.page";
import { SignupPage } from "./pages/signup/signup.page";

@NgModule({
    declarations: [ LoginPage, SignupPage ],
    imports: [
        IonicModule,
        AuthRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
  })
  export class AuthModule {}