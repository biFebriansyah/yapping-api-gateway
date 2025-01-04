import { Observable } from 'rxjs';
import { SignInAuthDto, SignUpAuthDto, TokenAuthDto } from './auth.dto';

export interface AuthService {
  SignUp(body: SignUpAuthDto): Observable<any>;
  SignIn(body: SignInAuthDto): Observable<TokenAuthDto>;
}
