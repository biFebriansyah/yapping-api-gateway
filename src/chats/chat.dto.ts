class CreateChatDto {
  readonly senderId: string;
  readonly receiverId: string;
  readonly messages: string;
}
class UpdateChatDto {
  readonly chatId: string;
  readonly messages: string;
}

class GetChatDto {
  readonly senderId: string | any;
  readonly receiverId: string | any;
  readonly message: string;
  readonly timestamp: Date;
}

type GetParams = {
  readonly chatId?: string;
  readonly userId?: string;
  readonly senderId?: string;
  readonly receiverId?: string;
};

export { CreateChatDto, GetChatDto, UpdateChatDto, GetParams };
