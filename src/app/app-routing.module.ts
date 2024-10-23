/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardsGuard } from './guard/authguards.guard';  // Ajusta la ruta según la ubicación de tu AuthGuard
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
//  {
//    path: 'success-payment',
//    loadChildren: () => import('./pages/success-payment/success-payment.module').then(m => m.SuccessPaymentPageModule)
//  },
  {
    path: 'success',
    loadChildren: () => import('./pages/success/success.module').then(m => m.SuccessPageModule)
  },
  //  {
  //    path: 'cancel-success-modal',
  //    loadChildren: () => import('./pages/cancel-success-modal/cancel-success-modal.module').then(m => m.CancelSuccessModalPageModule)
  //  },

  {
    path: 'confirm-payments',
    loadChildren: () => import('./pages/confirm-payments/confirm-payments.module').then(m => m.ConfirmPaymentsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    // canActivate: [AuthguardsGuard]  // Proteges la ruta de login
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
   // canActivate: [AuthguardsGuard]  // Proteges la ruta de login
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/tabs/home',  // Redirige a la ruta 'home' o la que quieras
    pathMatch: 'full'
  },
  {
    path: 'confirmappointmentmodal',
    loadChildren: () => import('./pages/confirmappointmentmodal/confirmappointmentmodal.module').then( m => m.ConfirmappointmentmodalPageModule)
  },


//  {
//    path: 'auth',
//    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
//  },
//  {
//    path: 'bookmarks',
//    loadChildren: () => import('./pages/bookmarks/bookmarks.module').then(m => m.BookmarksPageModule)
//  },
//  {
//    path: 'saved-paidmethod',
//    loadChildren: () => import('./pages/cancel-booking/cancel-booking.module').then(m => m.CancelBookingPageModule)
//  },
//  {
//    path: 'notifications',
//    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
//  },
//  {
//    path: 'chats',
//    loadChildren: () => import('./pages/chats/chats.module').then(m => m.ChatsPageModule)
//  },
//  {
//    path: 'explore',
//    loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExplorePageModule)
//  },
//  {
//    path: 'remove-bookmark',
//    loadChildren: () => import('./pages/remove-bookmark/remove-bookmark.module').then(m => m.RemoveBookmarkPageModule)
//  },
//  {
//    path: 'salon-list',
//    loadChildren: () => import('./pages/salon-list/salon-list.module').then(m => m.SalonListPageModule)
//  },
//
//  {
//    path: 'welcome',
//    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
//  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
       onSameUrlNavigation: 'reload'
     })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
