"use client";

import { useState } from "react";

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

export const ParameterSlider = ({ initialWeights, onSubmit }: ParameterSliderProps) => {
  const [weights, setWeights] = useState<ScoringWeights>(
    initialWeights ? mapApiToUiWeights(initialWeights) : DEFAULT_WEIGHTS
  );
  const [error, setError] = useState<string>("");

  const handleSliderChange = (index: number, newValue: number) => {
    const currentValue = Object.values(weights)[index].value;
    const diff = newValue - currentValue;

    if (diff === 0) return;

    const otherIndices = Object.values(weights)
      .map((_, i) => i)
      .filter((i) => i !== index);
    const totalOthers = otherIndices.reduce((sum, i) => sum + Object.values(weights)[i].value, 0);

    const newWeights = { ...weights };
    newWeights[Object.keys(weights)[index]] = { ...Object.values(weights)[index], value: newValue };

    // Distribute the difference proportionally among other sliders
    const ratio = (totalOthers - diff) / totalOthers;
    otherIndices.forEach((i) => {
      newWeights[Object.keys(weights)[i]] = {
        ...Object.values(weights)[i],
        value: Math.round(Object.values(weights)[i].value * ratio),
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
