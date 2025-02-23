import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatDeepSeek } from "@langchain/deepseek";

import OpenAI from "openai";
import "dotenv/config";

export const gptMiniModel = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
});

export const gptModel = new ChatOpenAI({
  model: "gpt-4o",
  apiKey: process.env.OPENAI_API_KEY,
});

export const claudeSonnetModel = new ChatAnthropic({
  model: "claude-3-5-sonnet-20241022",
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const deepseekReasonerModel = new ChatDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  model: "deepseek-reasoner",
});

export const deepseekChatModel = new ChatDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  model: "deepseek-chat",
});

export const openaiReasoningModel = new ChatOpenAI({
  model: "o3-mini-2025-01-31",
  apiKey: process.env.OPENAI_API_KEY,
});
