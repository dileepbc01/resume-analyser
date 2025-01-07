'use client';
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length > 50) {
        setMessage('You can upload a maximum of 50 files.');
      } else {
        setFiles(selectedFiles);
      }
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Please select files first.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post(
        'http://localhost:3100/application/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('Files uploaded successfully.');
    } catch (error) {
      console.log('error', error);
      setMessage('File upload failed.');
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <input type='file' onChange={handleFileChange} multiple />
      <button onClick={handleUpload} style={{ marginTop: '10px' }}>
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
