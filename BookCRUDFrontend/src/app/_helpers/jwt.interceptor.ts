import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user?.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`,
                    'Access-Control-Allow-Origin': '*', // Change this according to your requirements
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Add other methods as needed
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization', // Add other headers as needed            
                }
            });
        }

        return next.handle(request);
    }
}