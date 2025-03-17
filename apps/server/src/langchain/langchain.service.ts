import { ChatAnthropic } from "@langchain/anthropic";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ScoringCriteria } from "@repo/types";
import { z } from "zod";

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

  async scoreResume(resume_text: string, jd_text: string, criteria: ScoringCriteria) {
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        `Given the resume of the candidate and the job description, your task is to evaluate the candidate based on the provided criteria and parameters.\n
        
        Criteria:${criteria.criteria_name} score each parameter between 1-10 \n
        Parameters:${criteria.parameters.join("\n")}\n             
        `,
      ],
      ["human", "{text}"],
    ]);

    // const prompt = await promptTemplate.invoke({
    //   text: `Resume: ${resume_text}\n\nJob Description: ${jd_text}\n`,
    // });
    // const structured_llm = this.llm.withStructuredOutput(criteriaSchema);
    // const structured_criteria = await structured_llm.invoke(prompt);

    return "";
  }

  async getStructedScoreSettings(str_score_setting: string) {
    // Define the schema for a single criterion as per your requirements
    const CriterionSchema = z.object({
      criteria_name: z.string().describe("The name of the evaluation criterion"),
      importance: z.number().min(0).max(100).describe("The importance score (0-100) of this criterion"),
      parameters: z
        .array(z.string())
        .describe("List of specific parameters to evaluate within this criterion"),
    });

    // Define the schema for the entire criteria set
    const CriteriaSetSchema = z.object({
      criteria: z.array(CriterionSchema).describe("List of all evaluation criteria"),
    });

    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        `
You are analyzing a prompt that contains criteria for evaluating resumes.
Your task is to extract and structure these criteria according to the specified format.

Input Text:
{input_text}

Instructions:
1. Identify all evaluation criteria mentioned in the text.
2. For each criterion, extract:
   - The name of the criterion
   - The importance score (a number from 0 to 100)
   - Parameters or aspects to evaluate within that criterion

3. Organize this information according to the Given schema:

Note: If importance scores are not explicitly stated, infer them from the emphasis placed on each criterion in the text. If parameters are not clearly defined for a criterion, leave the parameters array empty.
`,
      ],

      ["human", "{input_text}"],
    ]);

    const structured_llm = this.llm.withStructuredOutput(CriteriaSetSchema);

    const prompt = await promptTemplate.invoke({
      input_text: str_score_setting,
    });

    const Structured_setting = await structured_llm.invoke(prompt);

    return Structured_setting;
  }
}
