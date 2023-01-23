import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '../guards/auth.guard';
// import { Role } from '../models/role.model';
import {
  ChatComponent,
  RoomsComponent,
  PrivateRoomComponent
} from './index';

const routes: Routes = [
  { path: '', component: ChatComponent },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'private-room',
    component: PrivateRoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}


