export interface IUser{
    id:         number;
    firstName:  string;
    lastName:   string;
    email:      string;
    phone:      string;
    username:   string;
    password:   string;
    address: {
      address: string;
      city: string;
    } 
    token: string;
  }