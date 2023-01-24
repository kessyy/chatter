import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ImageCropperModule } from 'ngx-image-cropper';

import {
  ChatComponent,
  RoomsComponent,
  PrivateRoomComponent
} from './index';
import { CardComponent } from '../components/card/card.component';
import { ButtonComponent } from '../components/button/button.component';
import { SideCardPopupComponent } from '../components/side-card-popup/side-card-popup.component';
import { SideCardComponent } from '../components/side-card/side-card.component';
import { MessagesAreaComponent } from '../components/messages-area/messages-area.component';
import { PersonalAreaComponent } from '../components/personal-area/personal-area.component';
import { ProfileAreaComponent } from '../components/profile-area/profile-area.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { MainTopbarComponent } from '../components/main-topbar/main-topbar.component';
import { SubTopbarComponent } from '../components/sub-topbar/sub-topbar.component';
import { EditUserComponent } from '../components/edit-user-form/edit-user.component';
import { SelectComponent } from '../components/select/select.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    ChatComponent,
    CardComponent,
    ButtonComponent,
    SideCardPopupComponent,
    SideCardComponent,
    MessagesAreaComponent,
    PersonalAreaComponent,
    ProfileAreaComponent,
    TopbarComponent,
    MainTopbarComponent,
    SubTopbarComponent,
    EditUserComponent,
    SelectComponent,
    RoomsComponent,
    PrivateRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SweetAlert2Module,
    NgxIntlTelInputModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    AutocompleteLibModule,
    ImageCropperModule,
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    SideCardPopupComponent,
    SideCardComponent,
    MessagesAreaComponent,
    PersonalAreaComponent,
    ProfileAreaComponent,
    TopbarComponent,
    SubTopbarComponent,
    EditUserComponent,
    SelectComponent,
    ImageCropperModule,
  ],

})
export class PagesModule { }
