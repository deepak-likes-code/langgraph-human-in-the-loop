import { agentState } from "./utils/state.js";
import { plannerNode } from "./agents/planner.js";
import { MemorySaver, StateGraph } from "@langchain/langgraph";
import { humanNode } from "./agents/humanNode.js";
import { researcherNode } from "./agents/researcher.js";
import { START, END } from "@langchain/langgraph";
import { researchRoute } from "./utils/routes.js";
import { compilerNode } from "./agents/compiler.js";

const workflow = new StateGraph(agentState)
  .addNode("planner", plannerNode)
  .addNode("humanNode", humanNode)
  .addNode("researcher", researcherNode)
  .addNode("compiler", compilerNode)
  .addEdge(START, "planner")
  .addEdge("planner", "humanNode")
  .addEdge("humanNode", "researcher")
  .addConditionalEdges("researcher", researchRoute)
  .addEdge("compiler", END);

const checkPoint = new MemorySaver();
export const graph = workflow.compile({
  checkpointer: checkPoint,
});

// Add this export

const checkpointConfig = { configurable: { thread_id: "1" } };

// const result = await graph.invoke(
//   {
//     researchQuestion: "What is the way to make a meme coin?",
//   },
//   checkpointConfig
// );

// console.log(result);
