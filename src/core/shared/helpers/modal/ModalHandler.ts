import Store from "@/store/index";

export default class ModalHandler {
  static open(id: string) {
    Store.commit("setOpen", { id, open: true });
  }

  static close(id: string) {
    Store.commit("setClose", { id });
  }
}
