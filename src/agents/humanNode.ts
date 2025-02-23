import { Command, END, interrupt } from "@langchain/langgraph";
import { agentState } from "../utils/state.js";
import { RunnableConfig } from "@langchain/core/runnables";

export const humanNode = async (
  state: typeof agentState.State,
  config: RunnableConfig
) => {
  const value = interrupt({
    text_to_revise: state.plan,
  });

  return new Command({
    goto: END,
    update: {
      plan: value,
    },
  });
};
