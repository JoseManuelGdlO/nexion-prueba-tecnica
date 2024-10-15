import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomePage } from "./pages/home/home.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [ HomePage ],
    imports: [
        IonicModule,
        HomeRoutingModule,
        CommonModule,
        FormsModule,
        SharedModule
    ],
  })
  export class HomePageModule {}