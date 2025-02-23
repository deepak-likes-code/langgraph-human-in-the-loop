import { openaiReasoningModel } from "../utils/models.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableConfig, RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { agentState } from "../utils/state.js";

const prompt = PromptTemplate.fromTemplate(
  `
  You are a seasoned research planner that can breakdown a research question into smaller questions and make a plan on how to go about it.


  You will be given a research question and you will need to breakdown it into a plan of steps to be taken that will be passed on to a research assistant.
  Keep the steps short and concise.

  Question: {question}

  Output format: {format_instructions}
  `
);

const feedbackPrompt = PromptTemplate.fromTemplate(
  `
 You have been given a feedback by the researcher on the research plan that you have made. Based on the feedback, you need to revise the plan and the steps in it.

  Feedback: {feedback}

  Plan: {plan}

  Output format: {format_instructions}
  `
);

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    plan: z.array(z.string()),
  })
);

const chain = RunnableSequence.from([prompt, openaiReasoningModel, parser]);

export const plannerNode = async (
  state: typeof agentState.State,
  config: RunnableConfig
) => {
  const question = state.researchQuestion;
  const feedback = state.feedback;

  if (feedback) {
    const feedbackChain = RunnableSequence.from([
      feedbackPrompt,
      openaiReasoningModel,
      parser,
    ]);

    const result = await feedbackChain.invoke(
      {
        feedback,
        plan: state.plan,
        format_instructions: parser.getFormatInstructions(),
      },
      config
    );

    return {
      plan: result.plan,
    };
  } else {
    const result = await chain.invoke(
      {
        question,
        format_instructions: parser.getFormatInstructions(),
      },
      config
    );

    return {
      plan: result.plan,
    };
  }
};
