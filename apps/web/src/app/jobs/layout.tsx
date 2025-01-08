'use client';
import { ProtectedRoute } from '@/lib/ProtectedRote';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
