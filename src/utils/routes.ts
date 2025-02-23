import { END } from "@langchain/langgraph";
import { agentState } from "./state.js";

export const researchRoute = (state: typeof agentState.State) => {
  if (state.currentStep < state.plan.length) {
    return "researcher";
  }
  return "compiler";
};
