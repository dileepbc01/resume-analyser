import { ChatAnthropic } from "@langchain/anthropic";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ScoringCriteria } from "@repo/types";
import { z } from "zod";

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
    You are an AI assistant specializing in resume evaluation. Your task is to assess a candidate's resume against a job description using specific criteria. You will be provided with a resume, job description, and a list of criteria.

    Resume:
    <resume>
    ${resume_text}
    </resume>

    Job Description:
    <job_description>
    ${jd_text}
    </job_description>

    Criteria List:
    <criteria_list>
    ${criterias.criterias.map((criteria) => {
      return `${criteria.criteria_name}\n ${criteria.parameters.map((param) => {
        return ` - ${param}\n`;
      })}`;
    })}
    </criteria_list>
    


    Instructions:

    1. Carefully review the resume, job description, and criteria list.

    2. For each criterion in the criteria list:
       a. Evaluate each parameter within the criterion.
       b. Score each parameter on a scale of 0 to 1 (0 = no match, 1 = perfect match).
       c. Write a brief overview (2-3 sentences) for each parameter.
       d. After evaluating all parameters, write a summary overview (3-4 sentences) for the entire criterion.

    3. Before providing your final evaluation for each criterion, wrap your evaluation process in <evaluation_process> tags. Include the following steps:
       a. Quote relevant parts of the resume and job description for each parameter.
       b. List pros and cons for how well the candidate matches each parameter.
       c. Justify the score given for each parameter.
       d. Summarize the overall match for the criterion.

    4. After completing the analysis for all criteria, present your final evaluation as a JSON object with the following structure:

    Important Notes:
    - Ensure your evaluation is objective and based solely on the information provided in the resume and job description.
    - Do not make assumptions beyond what is explicitly stated in these documents.
    - Adhere strictly to the scoring scale of 0 to 1 for each parameter.
    - Keep your overviews concise and informative.

    Begin your analysis with the first criterion, showing your evaluation process in <evaluation_process> tags, and then provide the final JSON output after completing all criteria.
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
