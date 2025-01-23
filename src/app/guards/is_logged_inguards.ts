import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const isLoggedInGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token');
    const router = inject(Router);
  
    console.log('isLoggedInGuard: Token exists:', !!token);
  
    if (!token) {
      console.log('Redirecting to /user-login');
      return router.parseUrl('/user-login');
    }
  
    console.log('Access granted to premium page');
    return true;
  };