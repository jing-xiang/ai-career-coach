// components/FileUpload.tsx

'use client';

import { useState } from 'react';
import { Upload, FileUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

import { useNavigate } from 'react-router-dom';

export function FileUpload() {
    const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [parsedText, setParsedText] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      navigate('/console');
    }
  };

  const handleUpload = async () => {
    if (file) {
      setIsUploading(true);
      setProgress(0);

      try {
        let text = '';

          const reader = new FileReader();

          reader.onload = (event) => {
            if (event.target && typeof event.target.result === 'string') {
              text = event.target.result;
              setParsedText(text);
              console.log(text);
              localStorage.setItem('uploadedFileText', text);
              setIsModalOpen(true);
            }
            setIsUploading(false);
            setProgress(100);
          };

          reader.onerror = () => {
            console.error('Error reading file');
            setIsUploading(false);
          };

          reader.readAsText(file);
        

        if (text) {
          setParsedText(text);
          localStorage.setItem('uploadedFileText', text);
          setIsModalOpen(true);
          setProgress(100);
        }
      } catch (error) {
        console.error('Error processing file:', error);
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
    <h1 className="text-6xl font-bold mt-4 mb-8 text-center text-gray-800">Vostra</h1>
    <h2 className="text-2xl font-bold mt-8 mb-8 text-center text-gray-800">AI - Career Coach</h2>
    <h1 className="text-2xl font-bold mt-8 mb-8 text-center text-gray-800">Upload Your Resume Below, and let the magic happen !!!</h1>
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileUp className="h-6 w-6" />
          <span>Resume Upload</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Choose PDF files only!</p>
            </div>
            <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        {file && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Selected file: {file.name}
          </div>
        )}
        {isUploading && (
          <Progress value={progress} className="w-full" />
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full bg-black text-white">
          <Upload className="mr-2 h-4 w-4" /> Upload File
        </Button>
      </CardFooter>
      <Dialog open={isModalOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span>File Uploaded Successfully!</span>
            </DialogTitle>
          </DialogHeader>
          <p>Your file has been uploaded.</p>
        </DialogContent>
      </Dialog>
    </Card>
    </div>
  );
}
