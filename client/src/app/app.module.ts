import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent,
  EmployeeDialog,
  AddressDialog,
  DepartmentDialog} from './app.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDialog,
    AddressDialog,
    DepartmentDialog
  ],
    imports: [
        BrowserModule,
        MatTabsModule,
        MatTableModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatToolbarModule,
        MatDialogModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
      MatMomentDateModule
    ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
