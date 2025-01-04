import { Observable } from 'rxjs';
import { GetParams, GetUserDto, CreateUserDto, UpdateUserDto, GetUserCertDto } from './users.dto';

export interface UserService {
  FindByUsername(params: GetParams): Observable<GetUserDto>;
  FatchCert(params: GetParams): Observable<GetUserCertDto>;
  FindById(params: GetParams): Observable<GetUserDto>;
  FetchAll(): Observable<{ users: GetUserDto[] }>;
  CreateData(body: CreateUserDto): Observable<any>;
  UpdateData(body: UpdateUserDto): Observable<any>;
}
