/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthguardsGuard } from 'src/app/guard/authguards.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule),
        runGuardsAndResolvers: 'always'  // Forzar la recarga del componente
      },
      {
        path: 'account-info',
        loadChildren: () => import('../account-info/account-info.module').then(m => m.AccountInfoPageModule),

      },
      {
        path: 'courses',
        loadChildren: () =>
          import('../cursos/cursos.module').then((m) => m.CursosPageModule),
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('../bookings/bookings.module').then((m) => m.BookingsPageModule),
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('../inbox/inbox.module').then((m) => m.InboxPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'salon-info',
        loadChildren: () => import('../salon-info/salon-info.module').then(m => m.SalonInfoPageModule)
      },
      {
        path: 'select-slot',
        loadChildren: () => import('../select-slot/select-slot.module').then(m => m.SelectSlotPageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../payments/payments.module').then(m => m.PaymentsPageModule)
      },
      {
        path: 'confirm-payments',
        loadChildren: () => import('../confirm-payments/confirm-payments.module').then(m => m.ConfirmPaymentsPageModule)
      },
      {
        path: 'e-receipt',
        loadChildren: () => import('../e-receipt/e-receipt.module').then(m => m.EReceiptPageModule)
      },
      {
        path: 'service-details',
        loadChildren: () => import('../service-details/service-details.module').then(m => m.ServiceDetailsPageModule)
      },
      {
        path: 'services-list',
        loadChildren: () => import('../services-list/services-list.module').then(m => m.ServicesListPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: 'notification-settings',
        loadChildren: () => import('../notification-settings/notification-settings.module').then(m => m.NotificationSettingsPageModule)
      },
      {
        path: 'security-settings',
        loadChildren: () => import('../security-settings/security-settings.module').then(m => m.SecuritySettingsPageModule)
      },
      {
        path: 'languages',
        loadChildren: () => import('../languages/languages.module').then(m => m.LanguagesPageModule)
      },
      {
        path: 'invite-friends',
        loadChildren: () => import('../invite-friends/invite-friends.module').then(m => m.InviteFriendsPageModule)
      },
      {
        path: 'gallery-list',
        loadChildren: () => import('../gallery-list/gallery-list.module').then(m => m.GalleryListPageModule)
      },
      {
        path: 'payment-modal',
        loadChildren: () => import('../payment-modal/payment-modal.module').then( m => m.PaymentModalPageModule)
      },
      {
        path: 'courses-details',
        loadChildren: () => import('../package-details/package-details.module').then(m => m.PackageDetailsPageModule)
      },
      {
        path: 'courses-list',
        loadChildren: () => import('../packages-list/packages-list.module').then(m => m.PackagesListPageModule)
      },
      {
        path: 'review-list',
        loadChildren: () => import('../review-list/review-list.module').then(m => m.ReviewListPageModule)
      },
      {
        path: 'review/:appointmentId',
        loadChildren: () => import('../cursos/cursos.module').then(m => m.CursosPageModule)
      },
      {
        path: 'cancel-modal',
        loadChildren: () => import('../cancel-modal/cancel-modal.module').then(m => m.CancelModalPageModule)
      },
      {
        path: 'imagemodal',
        loadChildren: () => import('../imagemodal/imagemodal.module').then( m => m.ImagemodalPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../specialist/specialist.module').then(m => m.SpecialistPageModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () => import('../privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
      },
      {
        path: 'cancellation-policy',
        loadChildren: () => import('../cancellationpolicy/cancellationpolicy.module').then( m => m.CancellationpolicyPageModule)
      },
      {
        path: 'deletion-policy',
        loadChildren: () => import('../accountdeletionpolicy/accountdeletionpolicy.module').then( m => m.AccountdeletionpolicyPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
