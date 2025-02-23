import { gptMiniModel } from "../utils/models.js";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { agentState } from "../utils/state.js";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const searchTool = new TavilySearchResults({
  maxResults: 2,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a seasoned researcher that takes a question and does a research on it and you have access to the internet.
    You will be given a question and you will need to research the question and return the answer.`,
  ],
  new MessagesPlaceholder("messages"),
]);

export const researcherNode = async (state: typeof agentState.State) => {
  const currentQuestion = state.plan[state.currentStep];

  const researchGraph = createReactAgent({
    llm: gptMiniModel,
    tools: [searchTool],
    stateModifier: prompt,
  });

  const researchResult = await researchGraph.invoke({
    messages: [
      {
        role: "user",
        content: `Question: ${currentQuestion}
        Research Question: ${state.researchQuestion}
            `,
      },
    ],
  });

  console.log(researchResult);

  return {
    research:
      researchResult.messages[researchResult.messages.length - 1].content,
    currentStep: 1,
  };
};
