import { RunnableConfig, RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { agentState } from "../utils/state.js";
import { gptModel } from "../utils/models.js";
const prompt = PromptTemplate.fromTemplate(
  `
  You are a seasoned compiler that can compile a plan into a research report.

  Plan: {plan}

  research : {research}

  `
);

export const compilerNode = async (
  state: typeof agentState.State,
  config: RunnableConfig
) => {
  const research = state.research.join("\n");

  const chain = RunnableSequence.from([prompt, gptModel]);

  const result = await chain.invoke(
    {
      plan: state.plan,
      research,
    },
    config
  );

  return {
    compiledResearch: result,
  };
};
