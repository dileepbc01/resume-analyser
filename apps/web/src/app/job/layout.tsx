"use client";

import AppLayout from "@/components/common/AppLayout";

import { ProtectedRoute } from "@/lib/ProtectedRote";

export default function JobDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}
