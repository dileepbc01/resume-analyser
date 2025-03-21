import { ChatAnthropic } from "@langchain/anthropic";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ScoringCriteria } from "@repo/types";

import { CriteriaSetSchema, EvaluationSchema, ResumeSchema } from "./resume.schema";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const officeParser = require("officeparser");

@Injectable()
export class LangchainService {
  private llm: ChatAnthropic;

  constructor(private configService: ConfigService) {
    this.llm = new ChatAnthropic({
      // model: "claude-3-5-haiku-20241022",
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
    this.llm.model = "claude-3-5-haiku-20241022"; // TODO: remove hardcoding
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

  async scoreResume(resume_text: string, jd_text: string, criterias: ScoringCriteria) {
    this.llm.model = "claude-3-5-haiku-20241022"; // TODO: remove hardcoding
    const systemMessage = `
    You are an AI assistant evaluating a resume against a job description using specific criteria.

    Resume:
    ${resume_text}

    Job Description:
    ${jd_text}

    Criteria:
    ${criterias.criterias
      .map(
        (criteria) =>
          `${criteria.criteria_name}
       ${criteria.parameters.map((param) => `- ${param}`).join("\n")}`
      )
      .join("\n\n")}

    Instructions:
    1. For each criterion and its parameters, evaluate how well the resume matches the job description
    2. Score each parameter from 0 to 1 (0=no match, 1=perfect match)
    3. justify your evaluation of each criteria in 1-2 sentence.

    Return your evaluation as a structured JSON object following the EvaluationSchema format.
    `;

    const structured_llm = this.llm.withStructuredOutput(EvaluationSchema);
    const structured_resume = await structured_llm.invoke(systemMessage);
    return structured_resume;
  }

  async getStructedScoreSettings(str_score_setting: string) {
    this.llm.model = "claude-3-5-haiku-20241022"; // TODO: remove hardcoding
    // Define the schema for a single criterion as per your requirements

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
