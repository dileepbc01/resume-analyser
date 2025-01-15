import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Loader2, X, Upload, File } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const MAX_FILES = 30
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 10MB

export function TopBar({ job_id }: { job_id: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = (acceptedFiles: File[]) => {
    const totalFiles = files.length + acceptedFiles.length
    if (totalFiles > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} files allowed`)
      return
    }
    
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Max size is 5MB`)
        return false
      }
      return true
    })
    
    setFiles(prev => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles(files => files.filter((_, idx) => idx !== index))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpg', '.jpeg']
    }
  })

  const handleUpload = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      
      files.forEach(file => {
        formData.append('files', file)
      })
      formData.append('job_id', job_id)

      const response = await fetch('/api/upload-resumes', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')
      
      toast.success('Resumes uploaded successfully')
      setOpen(false)
      setFiles([])
    } catch (error) {
      toast.error('Failed to upload resumes')
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <>
      <div className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium">Job Details</h1>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">Full Stack Developer</span>
          </div>
          <div className="flex items-center gap-3 pb-3">
            <Button variant="ghost" onClick={() => setOpen(true)}>Add candidates</Button>
            <Button variant="ghost"
              onClick={() => {
                router.push(`/job/edit?job_id=${job_id}`);
              }}
            >Edit</Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Upload Resumes</DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Upload candidate resumes (max {MAX_FILES} files, 10MB each)
            </p>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div 
              {...getRootProps()} 
              className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8",
                "hover:border-primary cursor-pointer transition-colors",
                isDragActive ? "border-primary bg-primary/5" : "border-muted",
                files.length >= MAX_FILES ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              <input {...getInputProps()} disabled={files.length >= MAX_FILES} />
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm text-center">
                {files.length >= MAX_FILES 
                  ? "Maximum files limit reached"
                  : "Drag & drop files here, or click to select files"}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {files.length} / {MAX_FILES} files • PDF, DOC, DOCX, TXT, JPEG
              </p>
            </div>

            {files.length > 0 && (
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="space-y-2">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <File className="h-4 w-4" />
                      <span className="text-sm flex-1 truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(idx)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {loading && (
              <Progress value={uploadProgress} className="w-full" />
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleUpload}
              disabled={loading || files.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TopBar