/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import TipTapEditor from "../common/TiptapEditor";

interface JobFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: {
    role?: string;
    type?: string;
    location?: string;
    company?: string;
    description?: string;
  };
  disabled?: boolean;
}

const jobTypes = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "temporary", label: "Temporary" },
];

const createjobSchema = z.object({
  role: z.string().nonempty("Role is required"),
  type: z.string().nonempty("Job type is required"),
  location: z.string().nonempty("Location is required"),
  company: z.string().nonempty("Company is required"),
  description: z.string().nonempty("Description is required"),
});

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  defaultValues = {
    role: "",
    type: "full-time",
    location: "",
    company: "",
    description: "",
  },
  disabled = false,
}) => {
  const form = useForm({
    disabled,
    resolver: zodResolver(createjobSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Role field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Type field */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. New York, Remote" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company field */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description field */}
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <TipTapEditor
              description={form.watch("description") || ""}
              onChange={(value) => form.setValue("description", value)}
              isDisabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <div className="flex justify-end">
          <Button type="submit">Create Job</Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
