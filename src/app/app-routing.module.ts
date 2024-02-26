import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { EmailresetComponent } from './components/emailreset/emailreset.component';
import { CodelresetComponent } from './components/codelreset/codelreset.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { resetGuard } from './shared/guards/reset.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

const routes: Routes = [
  {path:'',
  canActivate:[authGuard],
  component:BlankLayoutComponent,
  children:[
    {path:"" , redirectTo:'home' , pathMatch:"full"},
    {path:'details/:id' , component:DetailsComponent},
    {path:'home' , component:HomeComponent , title:'Home'},
    {path:'cart' , component:CartComponent,title:'Cart'},
    {path:'products' , component:ProductsComponent,title:'Products'},
    {path:'categories' , component:CategoriesComponent},
    {path:'brands' , component:BrandsComponent},
    {path:'wishlist' , component:WishListComponent},
    {path:'payment/:cartId' , component:PaymentComponent},
    {path:'allorders' , component:AllordersComponent , title:'All orders'},
    {path:'categoryProducts/:id' , component:ProductsByCategoryComponent},
    {path:'brandDetails/:id' , component:BrandDetailsComponent},

  ]
}
,
{path:'' , component:AuthLayoutComponent , children:[
  {path:'login' ,component: LoginComponent},
  {path:'register' ,component: RegisterComponent},
  {path:'resetpass', component:ResetpassComponent , children:[
    {path:'' , redirectTo:'sendmail' , pathMatch:'full'},
    {path:'sendmail' , component:EmailresetComponent},
    {path:'code' , component:CodelresetComponent},
    {path:'changePass' , component:ChangePassComponent , canActivate:[resetGuard]}
  ]}
]},
{
  path:'**' , component:NotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
