import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISignUpRequest, ISignUpResponse } from '../models/auth.model';
import { Observable, of } from 'rxjs';
import { GenerateUserIdService } from '../services/generate-user-id.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(
    private http: HttpClient,
    private userIdService: GenerateUserIdService 
  ) {}

  signup(req: ISignUpRequest): Observable<ISignUpResponse> {
    const hashedUserId = this.userIdService.stringToHash(req.Email).toString();

    const mockUser: ISignUpResponse = {
      id: hashedUserId, 
      createdTimestamp: Date.now(),
      username: req.Email, 
      enabled: true,
      totp: false,
      emailVerified: true,
      firstName: req.Firstname,
      lastName: req.Lastname,
      email: req.Email,
      disableableCredentialTypes: [],
      requiredActions: [],
      notBefore: 0,
      access: {
        manageGroupMembership: false,
        view: true,
        mapRoles: false,
        impersonate: false,
        manage: false,
      },
      attributes: null,
    };

    localStorage.setItem('mockUser', JSON.stringify(mockUser));

    return of(mockUser);
  }

  getMockUser(): ISignUpResponse | null {
    return JSON.parse(localStorage.getItem('mockUser') || 'null');
  }
}
