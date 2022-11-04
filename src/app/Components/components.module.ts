import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from './dialog/dialog.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, DialogComponent, DeliveryComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule
  ],
  exports: [HeaderComponent, FooterComponent, SidebarComponent]
})
export class ComponentsModule { }
