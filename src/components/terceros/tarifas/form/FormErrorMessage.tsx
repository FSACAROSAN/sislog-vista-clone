
import React from 'react';

interface FormErrorMessageProps {
  message: string | null;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
      {message}
    </div>
  );
};

export default FormErrorMessage;
