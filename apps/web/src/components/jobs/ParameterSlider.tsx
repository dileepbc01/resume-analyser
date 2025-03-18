"use client";

import { useState } from "react";
import TipTapEditor from "../common/TiptapEditor";
import { jobApi } from "@/lib/api/job.api";
import { useGetScoringPromptSettings } from "../../hooks/useJob";

export enum ApiWeightKey {
  TECHNICAL = "technical_competence",
  EXPERIENCE = "proffessional_experience_impact",
  EDUCATION = "education",
  LEADERSHIP = "leadership_soft_skills",
  CULTURAL = "role_alignment_cultural_fit",
}

export interface ApiScoringWeights {
  [ApiWeightKey.TECHNICAL]: number;
  [ApiWeightKey.EXPERIENCE]: number;
  [ApiWeightKey.EDUCATION]: number;
  [ApiWeightKey.LEADERSHIP]: number;
  [ApiWeightKey.CULTURAL]: number;
}

export interface ScoringWeight {
  name: string;
  value: number;
  color: string;
  description: string;
  apiKey: ApiWeightKey;
}

export interface ScoringWeights {
  [key: string]: ScoringWeight;
}

const DEFAULT_WEIGHTS: ScoringWeights = {
  technical: {
    name: "Technical Competence",
    value: 30,
    color: "bg-blue-500",
    description: "Technical skills, domain knowledge, certifications, and programming experience.",
    apiKey: ApiWeightKey.TECHNICAL,
  },
  experience: {
    name: "Professional Experience & Impact",
    value: 25,
    color: "bg-green-500",
    description: "Years of experience, project scope, business value delivered, and leadership roles.",
    apiKey: ApiWeightKey.EXPERIENCE,
  },
  education: {
    name: "Education & Continuous Learning",
    value: 20,
    color: "bg-purple-500",
    description: "Academic qualifications, certifications, self-learning, and industry contributions.",
    apiKey: ApiWeightKey.EDUCATION,
  },
  leadership: {
    name: "Leadership & Soft Skills",
    value: 15,
    color: "bg-orange-500",
    description: "Team management, communication skills, mentoring, and cultural adaptability.",
    apiKey: ApiWeightKey.LEADERSHIP,
  },
  cultural: {
    name: "Role Alignment & Cultural Fit",
    value: 10,
    color: "bg-red-500",
    description: "Alignment with company values, industry knowledge, work style, and clearances.",
    apiKey: ApiWeightKey.CULTURAL,
  },
};

const mapApiToUiWeights = (apiWeights: ApiScoringWeights): ScoringWeights => {
  const uiWeights = { ...DEFAULT_WEIGHTS };
  Object.entries(apiWeights).forEach(([apiKey, value]) => {
    const weight = Object.values(uiWeights).find((w) => w.apiKey === apiKey);
    if (weight) {
      weight.value = value;
    }
  });
  return uiWeights;
};

const mapUiToApiWeights = (uiWeights: ScoringWeights): ApiScoringWeights => {
  const apiWeights = {} as ApiScoringWeights;
  Object.values(uiWeights).forEach((weight) => {
    apiWeights[weight.apiKey] = weight.value;
  });
  return apiWeights;
};

interface ParameterSliderProps {
  initialWeights?: ApiScoringWeights;
  onSubmit: (weights: ApiScoringWeights) => void;
}
const getWeightValAtIdx = (weights: ScoringWeights, index: number) => {
  const weight = Object.values(weights)[index];
  if (weight) {
    return weight.value;
  }
  return 0;
};
const getWeightKeyAtIdx = (weights: ScoringWeights, index: number) => {
  const weightKey = Object.keys(weights)[index];
  if (!weightKey) {
    throw new Error("Invalid weight index");
  }
  return weightKey;
};

export const ResumeScoreSettings = ({jobId}:{jobId:string}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'parameters'>('parameters');
  const {
    scoreSetting,
    error,
    isLoading,
  }=useGetScoringPromptSettings(jobId);
    
  const update = async()=>{
      try{
        const d = jobApi.updateScoringCriteria(jobId, "CriteriaString");

      }catch(err){
        console.log(err)
      }
    }

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-lg border border-gray-200">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              activeTab === 'parameters' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('parameters')}
          >
            Parameters
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              activeTab === 'prompt' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('prompt')}
          >
            Prompt
          </button>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'parameters' ? (
          <ParameterSlider onSubmit={() => {}} initialWeights={null} />
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Resume Scoring Prompt</h3>
            <div>
              <p>Choose Prompt Specific suited for a ROle</p>
              <select className="w-full p-2 border rounded-md mb-4">
                <option value="">Select a role-specific prompt</option>
                <option value="software-engineer">Software Engineer</option>
                <option value="data-scientist">Data Scientist</option>
                <option value="product-manager">Product Manager</option>
                <option value="designer">UX/UI Designer</option>
                <option value="devops">DevOps Engineer</option>
              </select>
            </div>
           <TipTapEditor
            description={scoreSetting?scoreSetting.scoring_instructions:""}
            onChange={() => {}}
            isDisabled={false}
           />
           <button onClick={update} className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <span>Save Prompt</span>
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ParameterSlider = ({ initialWeights, onSubmit }: ParameterSliderProps) => {
  const [weights, setWeights] = useState<ScoringWeights>(
    initialWeights ? mapApiToUiWeights(initialWeights) : DEFAULT_WEIGHTS
  );
  const [error, setError] = useState<string>("");

  const handleSliderChange = (index: number, newValue: number) => {
    const currentValue = getWeightValAtIdx(weights, index);
    const diff = newValue - currentValue;

    if (diff === 0) return;

    const otherIndices = Object.values(weights)
      .map((_, i) => i)
      .filter((i) => i !== index);
    const totalOthers = otherIndices.reduce((sum, i) => getWeightValAtIdx(weights, i), 0);

    const newWeights = { ...weights };
    const currentKey = getWeightKeyAtIdx(weights, index);
    newWeights[currentKey] = { ...(weights[currentKey] as ScoringWeight), value: newValue };

    // Distribute the difference proportionally among other sliders
    const ratio = (totalOthers - diff) / totalOthers;
    otherIndices.forEach((i) => {
      const key = getWeightKeyAtIdx(weights, i);
      newWeights[key] = {
        ...(weights[key] as ScoringWeight),
        value: Math.round(getWeightValAtIdx(weights, i) * ratio),
      };
    });

    setWeights(newWeights);
  };

  const handleSubmit = () => {
    const total = Object.values(weights).reduce((sum, w) => sum + w.value, 0);
    if (total !== 100) {
      setError("Total weight must equal 100%");
      return;
    }
    setError("");
    onSubmit(mapUiToApiWeights(weights));
  };

  return (
    <div className="space-y-6 p-4">
      {Object.values(weights).map((weight, index) => (
        <div key={weight.name} className="space-y-2">
          <div className="flex justify-between">
            <label className="font-medium">{weight.name}</label>
            <span>{weight.value}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weight.value}
            onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
            className={`w-full ${weight.color}`}
          />
          <p className="text-sm text-gray-600">{weight.description}</p>
        </div>
      ))}

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        className="ml-auto rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Save Weights
      </button>
    </div>
  );
};
