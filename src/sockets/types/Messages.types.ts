export interface INewMessage {
  isRoom: boolean; //(Is this message for a chat room?)
  destinationId: string; //(Id of a User or ChatRoom)
  createdBy?: string;
  message: string; //(The Message)
}

export interface IMessage extends INewMessage {
  id: string;
  createdOn: string; //(ISO Date)
  createdByName: string; //(Name of user who sent it)
  destinationName: string; //(Name of User)
}

export interface IMyChatMessagesResponse {
  unreadMessages: IMessage[];
  seenMessages: IMessage[];
}

export interface ILastSeenMessage {
  destinationId: string; // ID of destination
  lastSeen: {
    messageId: string; // ID of last message in room/chat
    messageCreatedOn: string; // ISO string from createdOn of the last message
  };
}

export interface INewChatRoom {
  name: string; //(Name of the ChatRoom)
  description: string;
  categories: string[];
}

export interface IChatRoom extends INewChatRoom {
  id: string; //(ChatRoom Id)
}

export interface IMyDestination {
  destinationId: string; //(User or ChatRoom Id)
  destinationName: string; //(Name of the User or ChatRoom)
  isRoom: boolean; //(Is this a Chat Room or a User?)
}

export interface IChatListItem extends IMyDestination {
  lastMessage?: IMessage;
  unreadMessages?: number;
}

export interface IDestMap extends IChatListItem {
  unreadMessages: number;
  destMessages: Array<IMessage>;
}
