import { ChatAnthropic } from "@langchain/anthropic";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ResumeSchema } from "./resume.schema";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const officeParser = require("officeparser");

@Injectable()
export class LangchainService {
  private llm: ChatAnthropic;

  constructor(private configService: ConfigService) {
    this.llm = new ChatAnthropic({
      model: "claude-3-5-sonnet-20240620",
      temperature: 0,
      apiKey: this.configService.get("ANTHROPIC_API_KEY"),
    });
  }

  async generateText(resume_url: string) {
    const response = await fetch(resume_url);
    const buffer = await response.arrayBuffer();
    const text = await officeParser.parseOfficeAsync(Buffer.from(buffer));

    return text;
  }

  async getStructuredData(text: string) {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert extraction algorithm.
    Only extract relevant information from the text.
    If you do not know the value of an attribute asked to extract,
    return empty array, string , null at appropriate fields for the attribute's value.`,
      ],
      // Please see the how-to about improving performance with
      // reference examples.
      // ["placeholder", "{examples}"],
      ["human", "{text}"],
    ]);
    const structured_llm = this.llm.withStructuredOutput(ResumeSchema);

    const prompt = await promptTemplate.invoke({
      text,
    });
    const structured_resume = await structured_llm.invoke(prompt);
    return structured_resume;
  }
}
