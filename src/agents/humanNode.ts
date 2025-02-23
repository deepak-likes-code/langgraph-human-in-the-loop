import { Command, END, interrupt } from "@langchain/langgraph";
import { agentState } from "../utils/state.js";
import { RunnableConfig } from "@langchain/core/runnables";

export const humanNode = async (
  state: typeof agentState.State,
  config: RunnableConfig
) => {
  const value = interrupt({
    question: "Give feedback on the research",
    plan: state.plan,
  });
  console.log(value);

  if (value === "continue") {
    return new Command({
      goto: "researcher",
    });
  } else if (value !== "continue") {
    return new Command({
      goto: "planner",
      update: {
        feedback: value as string,
      },
    });
  }
};
