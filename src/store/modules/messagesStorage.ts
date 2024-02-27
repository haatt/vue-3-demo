import type { IRootState } from "@/store/index.types";
import type { IMessagesState, IActionsProps } from "@/store/modules/messagesStorage.types";
import type {
  IChatRoom,
  IMessage,
  IMyChatMessagesResponse,
  IMyDestination,
  IChatListItem,
} from "@/sockets/types/Messages.types";

export default {
  namespace: true,
  state: (): IMessagesState => ({
    sentMessageRequest: false,
    seenMessages: [] as IMessage[],
    unreadMessages: [] as IMessage[],
    allMessages: [] as IMessage[],
    chatRooms: [] as IChatRoom[],
    chatList: [] as IChatListItem[],
    destinations: [] as IMyDestination[],
    totalUnreadMessages: 0,
    destinationsMap: new Map(),
    chatSelected: {} as IMyDestination,
  }),
  mutations: {
    async SET_MESSAGES(state: IMessagesState, rootState: IRootState): Promise<void> {
      if (!state.sentMessageRequest) {
        // Listener is subscribed to broadcast and should not need multiple calls
        state.sentMessageRequest = true;
        await rootState.socket.initGetMyChatMessagesListener(
          (messages: IMyChatMessagesResponse) => {
            state.totalUnreadMessages += messages.unreadMessages.length;
            state.unreadMessages.push(...messages.unreadMessages);
            state.seenMessages.push(...messages.seenMessages);
            state.allMessages.push(...messages.seenMessages);
            state.allMessages.push(...messages.unreadMessages);

            // Run Syncronous loops to put the read and unread arrays into the destination maps
            for (const message of messages.seenMessages) {
              let destinationId = message.destinationId;
              if (!message.isRoom && message.destinationId == localStorage.getItem("userId")) {
                destinationId = message.createdBy || "";
                console.log("message was to me: ", destinationId, " ", message.message);
              }
              const dest = state.destinationsMap.get(destinationId) || {
                destinationId: destinationId,
                destinationName: message.destinationName,
                isRoom: message.isRoom,
                unreadMessages: 0,
                destMessages: [],
              };
              dest.destMessages.push(message);
              if (dest.lastMessage) {
                if (new Date(dest.lastMessage?.createdOn) < new Date(message.createdOn)) {
                  dest.lastMessage = message;
                }
              } else {
                dest.lastMessage = message;
              }
              state.destinationsMap.set(destinationId, dest);
            }

            // Loop through the unread to count for each destinations
            for (const message of messages.unreadMessages) {
              let destinationId = message.destinationId;
              if (!message.isRoom && message.destinationId == localStorage.getItem("userId")) {
                console.log("message was to me: ", destinationId, " ", message.message);
                destinationId = message.createdBy || message.destinationId;
              }
              const dest = state.destinationsMap.get(destinationId) || {
                destinationId: message.destinationId,
                destinationName: "",
                isRoom: message.isRoom,
                unreadMessages: 0,
                destMessages: [],
              };
              dest.destMessages.push(message);
              console.log("unread: ", message.message);

              if (dest.lastMessage) {
                if (new Date(dest.lastMessage?.createdOn) < new Date(message.createdOn)) {
                  dest.lastMessage = message;
                }
              } else {
                dest.lastMessage = message;
              }

              console.log(dest.lastMessage?.message);
              dest.unreadMessages++;
              state.destinationsMap.set(destinationId, dest);
              console.log("unread loop: ", state.destinationsMap.get(dest.destinationId));
            }

            // Use the destinationsMap to correct the chatList
            state.chatList = state.destinations.map((chat: IChatListItem) => {
              const dest = state.destinationsMap.get(chat.destinationId);
              chat.unreadMessages = dest?.unreadMessages;
              chat.lastMessage = dest?.lastMessage;
              console.log("lastMessage: ", dest?.lastMessage?.message);
              return chat;
            });
            console.log("state.destinationsMap: ", state.destinationsMap);
          }
        );
        rootState.socket.getMyChatMessages();
      }
    },
    async SET_ALL_CHAT_ROOMS(state: IMessagesState, rootState: IRootState): Promise<void> {
      await rootState.socket.initGetAllChatRoomsListener((chatRooms: IChatRoom[]) => {
        state.chatRooms = chatRooms;
      });
      await rootState.socket.getAllChatRooms();
    },
    async SET_MY_DESTINATIONS(state: IMessagesState, rootState: IRootState): Promise<void> {
      await rootState.socket.initGetMyDestinationsListener((rooms: IMyDestination[]) => {
        state.destinations = rooms;
        for (const destination of rooms) {
          const dest = state.destinationsMap.get(destination.destinationId) || {
            destinationId: destination.destinationId,
            destinationName: destination.destinationName,
            isRoom: destination.isRoom,
            unreadMessages: 0,
            destMessages: [],
          };
          dest.destinationName = destination.destinationName;
          state.destinationsMap.set(destination.destinationId, dest);
        }
      });

      await rootState.socket.getMyDestinations();
    },
    setUnreadMessages(state: IMessagesState): void {
      state.totalUnreadMessages = 0;

      state.chatList.forEach((chat: IChatListItem) => {
        const unreadChatMessages = state.unreadMessages.filter((message: IMessage) => {
          if (chat.isRoom) {
            return message.destinationId === chat.destinationId && message.isRoom;
          } else {
            return (
              !message.isRoom &&
              (message.createdByName === chat.destinationName ||
                message.destinationId === chat.destinationId)
            );
          }
        });

        if (unreadChatMessages.length > 0) {
          chat.unreadMessages = unreadChatMessages.length;
          state.totalUnreadMessages += unreadChatMessages.length;
        }
      });
    },
    updateUnreadMessages(state: IMessagesState): void {
      state.chatList.forEach((chat: IChatListItem) => {
        if (
          chat.destinationId !== state.chatSelected.destinationId &&
          chat.destinationName !== state.chatSelected.destinationName
        ) {
          const unreadChatMessages = state.unreadMessages.filter((message: IMessage) => {
            if (chat.isRoom) {
              return message.destinationId === chat.destinationId && message.isRoom;
            } else {
              return (
                !message.isRoom &&
                (message.createdByName === chat.destinationName ||
                  message.destinationId === chat.destinationId)
              );
            }
          });

          if (unreadChatMessages.length > 0) {
            if (chat.unreadMessages) {
              chat.unreadMessages += unreadChatMessages.length;
            } else {
              chat.unreadMessages = unreadChatMessages.length;
            }
            state.totalUnreadMessages += unreadChatMessages.length;
          }
        }
      });
    },
    setUnreadMessagesOnChat(state: IMessagesState): void {
      state.chatList.forEach((chat: IChatListItem) => {
        if (
          chat.destinationId === state.chatSelected.destinationId ||
          chat.destinationName === state.chatSelected.destinationName
        ) {
          if (chat.unreadMessages) {
            state.totalUnreadMessages -= chat.unreadMessages;
          }
          chat.unreadMessages = 0;
        }
      });
    },
    setChatSelected(state: IMessagesState, chatSelected: IMyDestination): void {
      state.chatSelected = chatSelected;
    },
  },
  actions: {
    async GET_ALL_CHAT_ROOMS({ commit, rootState }: IActionsProps): Promise<void> {
      await commit("SET_ALL_CHAT_ROOMS", rootState);
    },
    async GET_MY_DESTINATIONS({ commit, rootState }: IActionsProps): Promise<void> {
      await commit("SET_MY_DESTINATIONS", rootState);
    },
    async GET_MESSAGES_DATA({ commit, rootState }: IActionsProps): Promise<void> {
      await commit("SET_MY_DESTINATIONS", rootState);
      await commit("SET_MESSAGES", rootState);
    },
    async setUnreadMessagesData({ commit }: IActionsProps): Promise<void> {
      commit("setUnreadMessages");
    },
    updateUnreadMessagesData({ commit }: IActionsProps): void {
      commit("updateUnreadMessages");
    },
    setUnreadMessagesOnChatData({ commit }: IActionsProps): void {
      commit("setUnreadMessagesOnChat");
    },
    async setChatSelectedData(
      { commit }: IActionsProps,
      chatSelected: IMyDestination
    ): Promise<void> {
      await commit("setChatSelected", chatSelected);
    },
  },
};
