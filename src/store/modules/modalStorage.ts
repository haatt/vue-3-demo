import type { IModalStatus } from "@/core/shared/types/modal/modal.types";

interface IModalState {
  modals: IModalStatus[];
}

export default {
  namespace: true,
  state: (): IModalState => ({
    modals: [] as IModalStatus[],
  }),
  mutations: {
    setOpen(state: IModalState, modalStatus: IModalStatus) {
      const modalIndex = state.modals.findIndex((modal) => {
        modal.id === modalStatus.id;
      });

      if (modalIndex === -1) {
        state.modals.push(modalStatus);
      } else {
        state.modals[modalIndex] = modalStatus;
      }
    },
    setClose(state: IModalState, modalData: { id: string }) {
      const modalIndex = state.modals.findIndex((modal) => {
        return modal.id === modalData.id;
      });

      if (modalIndex !== -1) {
        state.modals.splice(modalIndex, 1);
      }
    },
  },
};
