import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const resetGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router)
  if(localStorage.getItem('resetState')){
  return true;
}
else{
  _Router.navigate(['/login']);
  return false;
}
};
