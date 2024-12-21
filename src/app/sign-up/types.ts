export interface SignUpType {
  username: string;
  email: string;
  password: string;
  repeat: string;
}

export interface Error {
  username?: string;
  email?: string;
  password?: string;
}

export interface ErrorStack {
  data: {
    errors: Error;
  };
}
