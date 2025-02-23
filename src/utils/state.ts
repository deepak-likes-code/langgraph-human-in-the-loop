import { Annotation } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";
import { messagesStateReducer } from "@langchain/langgraph";

interface Research {
  title: string;
  url: string;
  summary: string;
}

export const agentState = Annotation.Root({
  researchQuestion: Annotation<string>({
    reducer: (a, b) => b,
    default: () => "",
  }),

  feedback: Annotation<string>({
    reducer: (a, b) => b,
    default: () => "",
  }),

  plan: Annotation<string[]>({
    reducer: (a, b) => b,
    default: () => [],
  }),
  currentStep: Annotation<number>({
    reducer: (a, b) => a + b,
    default: () => 0,
  }),

  research: Annotation<Research[]>({
    reducer: (a, b) => a.concat(b),
    default: () => [],
  }),

  compiledResearch: Annotation<string>({
    reducer: (a, b) => b,
    default: () => "",
  }),
});
