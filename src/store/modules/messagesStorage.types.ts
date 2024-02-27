import type { Commit } from "vuex";
import type { IRootState } from "@/store/index.types";
import type {
  IChatRoom,
  IMessage,
  IMyDestination,
  IChatListItem,
  IDestMap,
} from "@/sockets/types/Messages.types";

export interface IMessagesState {
  sentMessageRequest: boolean;
  seenMessages: IMessage[];
  unreadMessages: IMessage[];
  allMessages: IMessage[];
  chatRooms: IChatRoom[];
  chatList: IChatListItem[];
  destinations: IMyDestination[];
  totalUnreadMessages: number;
  destinationsMap: Map<string, IDestMap>;
  chatSelected: IMyDestination;
}

export interface IActionsProps {
  commit: Commit;
  rootState: IRootState;
}
