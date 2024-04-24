import BotUICreate  from "./botUIConfig";

export default {
  permissions: {
    canEdit: ["Admin"],
    canDelete: ["Admin"],
    canCreate: ["Admin"],
    canList: ["Admin"]
  },
  list: BotUICreate,
  create: BotUICreate
};
