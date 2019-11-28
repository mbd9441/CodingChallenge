import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatListModule, MatExpansionModule, MatDialogModule} from '@angular/material';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AppComponent} from './app.component';
import {BackendlessMockService} from './backendless-mock.service';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeService} from './employee.service';
import { EmployeeDetailsModalComponent } from './employee-details-modal/employee-details-modal.component';
import { EmployeeRemoveModalComponent } from './employee-remove-modal/employee-remove-modal.component';
import { EmployeeReportAddModalComponent } from './employee-report-add-modal/employee-report-add-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailsModalComponent,
    EmployeeRemoveModalComponent,
    EmployeeReportAddModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(BackendlessMockService, {
      apiBase: 'api/',
      delay: 250,
      passThruUnknownUrl: true,
      post204: false,
      put204: false
    }),
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [EmployeeService],
  entryComponents: [EmployeeDetailsModalComponent, EmployeeRemoveModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
