import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISignUpRequest, ISignUpResponse } from '../models/auth.model';
import { Observable, of } from 'rxjs';
import { GenerateUserIdService } from '../services/generate-user-id.service'; // Import the hashing service

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(
    private http: HttpClient,
    private userIdService: GenerateUserIdService // Inject hashing service
  ) {}

  signup(req: ISignUpRequest): Observable<ISignUpResponse> {
    const hashedUserId = this.userIdService.stringToHash(req.Email).toString(); // Generate a numeric hash for user ID

    const mockUser: ISignUpResponse = {
      id: hashedUserId, // Use the hashed ID
      createdTimestamp: Date.now(),
      username: req.Email, // Keeping email as username
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

    // Save the user as a mock signup (for testing purposes)
    localStorage.setItem('mockUser', JSON.stringify(mockUser));

    return of(mockUser); // Returning an Observable with the mock user
  }

  getMockUser(): ISignUpResponse | null {
    return JSON.parse(localStorage.getItem('mockUser') || 'null');
  }
}
