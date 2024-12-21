export interface SignResponse {
  user?: {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image: string | null;
  };
  errors?: {
    body: string[];
  };
}
