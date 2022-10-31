import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
},
{
  path: 'how-it-works',
  loadChildren: () => import('./how-it-works/how-it-works.module').then(m => m.HowItWorksModule),
},
{
  path: 'about-us',
  loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule),
},
{
  path: 'faqs',
  loadChildren: () => import('./faqs/faqs.module').then(m => m.FaqsModule),
},
{
  path: 'reviews',
  loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule),
},
{
  path: 'contact-us',
  loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule),
},
{
  path: 'privacy',
  loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule),
},
{
  path: 'search',
  loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
},
{
  path: 'register',
  loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
},
{
  path: 'forgot',
  loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotModule),
},
{
  path: 'cart',
  loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
},
{
  path: 'product-details',
  loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
},
{
  path: 'checkout-billing',
  loadChildren: () => import('./checkout-billing/checkout-billing.module').then(m => m.CheckoutBillingModule),
},

{
  path: 'profile',
  loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  canActivate: [AuthGuard],
},
{
  path: 'admin',
  loadChildren: () => import('./admin/main/main.module').then(m => m.MainModule),
  canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
},
{ path: '404', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
