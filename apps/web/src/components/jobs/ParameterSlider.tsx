import { useGetScoringPromptSettings, useUpdateScoringSlider } from '@/hooks/useJob';
import { useForm, Controller } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useMemo } from 'react';
import { GetScoringSettingsResponse } from '@repo/types';

interface Criteria {
  criteriaName: string;
  importance: number;
}

interface FormData {
  criterias: Criteria[];
}

const ParameterSlider = ({ jobId }: { jobId: string }) => {
  const { scoreSetting, isLoading, error } = useGetScoringPromptSettings(jobId);
  const {updateScoringSlider}=useUpdateScoringSlider(jobId)
  const { control, handleSubmit, setValue, reset, watch } = useForm<FormData>({
    defaultValues: {
      criterias: scoreSetting?.criterias || [],
    },
  });

  // Ensure `criterias` is always an array
  const criterias = useMemo(() => (watch('criterias') as GetScoringSettingsResponse['criterias']) || [], [watch('criterias')]);
  
  // Track which slider is being adjusted
  const [activeSliderIndex, setActiveSliderIndex] = useState<number | null>(null);

  // Function to adjust other sliders when one slider changes
  const handleSliderChange = (index: number, newValue: number) => {
    if (!criterias || criterias.length <= 1) return;

    // Set the active slider index
    setActiveSliderIndex(index);
    
    // Get the current values and calculate the difference
    const oldValue = criterias[index]?.importance || 0; // Default to 0 if undefined
    const difference = newValue - oldValue;
    
    // Update the current slider value
    setValue(`criterias.${index}.importance`, newValue);
    
    // Get all other slider indices
    const otherIndices = criterias
      .map((_, i) => i)
      .filter(i => i !== index);
    
    // Get sum of other sliders
    const otherSum = otherIndices.reduce(
      (sum, i) => sum + (criterias[i]?.importance || 0), // Default to 0 if undefined
      0
    );
    
    if (otherSum === 0) {
      // If all other sliders are at 0 and we're decreasing, we can't adjust
      if (difference < 0) {
        setValue(`criterias.${index}.importance`, oldValue);
        return;
      }
      
      // If increasing, distribute the remaining evenly
      const remainingValue = 100 - newValue;
      const valuePerSlider = remainingValue / otherIndices.length;
      
      otherIndices.forEach(i => {
        setValue(`criterias.${i}.importance`, valuePerSlider);
      });
    } else {
      // Calculate how much to adjust other sliders proportionally
      const adjustmentFactor = difference / otherSum;
      
      // Apply adjustments to other sliders
      otherIndices.forEach(i => {
        const currentValue = criterias[i]?.importance || 0; // Default to 0 if undefined
        let adjustedValue = currentValue - (currentValue * adjustmentFactor);
        
        // Ensure no slider goes below 0
        adjustedValue = Math.max(0, adjustedValue);
        
        setValue(`criterias.${i}.importance`, adjustedValue);
      });
      
      // Check if any adjustment made sliders negative and fix the total
      setTimeout(() => {
        const newTotal = criterias.reduce((sum, c) => sum + (c.importance || 0), 0);
        
        if (Math.abs(newTotal - 100) > 0.01) {
          const remainingDifference = 100 - newTotal;
          
          // Find sliders that can be adjusted (non-zero values)
          const adjustableIndices = otherIndices.filter(i => (criterias[i]?.importance || 0) > 0);
          
          if (adjustableIndices.length > 0) {
            const adjustment = remainingDifference / adjustableIndices.length;
            adjustableIndices.forEach(i => {
              const newAdjustedValue = (criterias[i]?.importance || 0) + adjustment;
              setValue(`criterias.${i}.importance`, Math.max(0, newAdjustedValue));
            });
          } else {
            // If no other slider can be adjusted, adjust the active one
            setValue(`criterias.${index}.importance`, newValue + remainingDifference);
          }
        }
      }, 0);
    }
    
    // Clear active slider when done
    setTimeout(() => setActiveSliderIndex(null), 100);
  };

  // Initialize sliders to sum to 100 if they don't already
  useEffect(() => {
    if (criterias && activeSliderIndex === null) {
      const total = criterias.reduce((sum, criteria) => sum + (criteria?.importance || 0), 0);
      
      if (Math.abs(total - 100) > 0.01) {
        // Adjust proportionally to make total 100
        const factor = 100 / total;
        criterias.forEach((criteria, index) => {
          setValue(`criterias.${index}.importance`, (criteria?.importance || 0) * factor);
        });
      }
    }
  }, [criterias, activeSliderIndex, setValue]);


  if (isLoading) {
    return <></>;
  }
  if (error || !scoreSetting) {
    return <></>;
  }

  const onSubmit = ({criterias}: FormData) => {
    updateScoringSlider({
      criterias
    })
  };

  // Handle reset logic
  const handleReset = () => {
    reset({
      criterias: scoreSetting?.criterias || [],
    });
    
    // Ensure total is 100 after reset
    setTimeout(() => {
      const resetCriterias = watch('criterias') || [];
      const resetTotal = resetCriterias.reduce((sum, c) => sum + (c?.importance || 0), 0);
      
      if (Math.abs(resetTotal - 100) > 0.01) {
        const factor = 100 / resetTotal;
        resetCriterias.forEach((_, index) => {
          setValue(
            `criterias.${index}.importance`, 
            (resetCriterias[index]?.importance || 0) * factor
          );
        });
      }
    }, 0);
  };

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Criteria Importance</CardTitle>
        <CardDescription>Adjust the importance of each criteria (total always equals 100%)</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          {scoreSetting.criterias.map((criteria, index) => (
            <div
              key={criteria.criteriaName}
              className="flex items-center justify-between space-x-4"
            >
              <Label htmlFor={criteria.criteriaName} className="w-1/4">
                {criteria.criteriaName}:
              </Label>
              <Controller
                name={`criterias.${index}.importance`}
                control={control}
                defaultValue={criteria.importance}
                render={({ field }) => (
                  <>
                    <Slider
                      id={criteria.criteriaName}
                      value={[field.value]}
                      max={100}
                      step={1}
                      aria-label={criteria.criteriaName}
                      className="flex-1"
                      onValueChange={(value) => {
                        handleSliderChange(index, Number(value[0]));
                      }}
                    />
                    <span className="w-12 text-right">{Math.round(field.value)}%</span>
                  </>
                )}
              />
            </div>
          ))}
          <div className="mt-2 flex justify-between font-medium">
            <span>Total:</span>
            <span className={"text-green-500"}>
              {Math.round(100)}%
            </span>
          </div>
        </CardContent>
        <div className="flex justify-between items-center mt-4 p-3">
          <div className="flex space-x-4 ml-auto">
            <Button variant="outline" onClick={handleReset} type="button">
              Reset
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ParameterSlider;