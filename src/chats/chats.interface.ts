import { Observable } from 'rxjs';
import { CreateChatDto, GetChatDto, GetParams, UpdateChatDto } from './chat.dto';

export interface ChatService {
  FatchAll({}): Observable<{ chats: GetChatDto[] }>;
  FatchById(params: GetParams): Observable<GetChatDto>;
  FatchUserChat(params: GetParams): Observable<{ chats: GetChatDto[] }>;
  FatchChatHistory(params: GetParams): Observable<{ chats: GetChatDto[] }>;
  CreateChat(body: CreateChatDto): Observable<any>;
  UpdateChat(body: UpdateChatDto): Observable<any>;
  DeleteMessage(params: GetParams): Observable<any>;
}
