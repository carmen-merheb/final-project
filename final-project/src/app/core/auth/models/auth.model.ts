export interface ILoginRequest{
    username: string,
    password: string
    }
    
export interface ILoginResponse{
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
    }

export interface ISignUpRequest{
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    }
      
export interface ISignUpResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    }

export interface IToken {
    refreshToken: string;
    accessToken: string;
    }