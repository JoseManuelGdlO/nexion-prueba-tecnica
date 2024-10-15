import { NgModule } from "@angular/core";
import { FilterComponent } from "./components/filter/filter.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        FilterComponent
    ],
    imports: [
        IonicModule,
        FormsModule,
        CommonModule,
    ],
    schemas: [
    ],
    providers: [
    ],
    exports: [
        FilterComponent
    ]
  })
  export class SharedModule { } 