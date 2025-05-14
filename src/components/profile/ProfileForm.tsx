import React, { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ProfileField {
  label: string;
  value: string;
  required?: boolean;
  name: string;
  type: 'text' | 'email' | 'select' | 'date' | 'textarea';
  options?: string[];
  max?: string;
}

interface ProfileFormProps {
  fields: ProfileField[];
  isEditing: boolean;
  onChange: (name: string, value: string) => void;
  onSubmit?: (data: any) => void;
  defaultValues?: Record<string, any>;
}

export default function ProfileForm({
  fields,
  isEditing,
  onSubmit,
  defaultValues = {},
}: ProfileFormProps) {
  // Dynamically build validation schema for current fields only
  const schema = useMemo(() => {
    const shape: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.required) {
        switch (field.type) {
          case 'email':
            shape[field.name] = yup
              .string()
              .email('Invalid email')
              .required(`${field.label} is required`);
            break;
          case 'date':
            shape[field.name] = yup
              .date()
              .nullable()
              .transform((curr, orig) => (orig === '' ? null : curr))
              .max(new Date(Date.now() - 17 * 365 * 24 * 60 * 60 * 1000), 'Must be at least 17 years old')
              .required(`${field.label} is required`);
            break;
          default:
            shape[field.name] = yup.string().required(`${field.label} is required`);
        }
      } else {
        shape[field.name] = yup.string().nullable();
      }
    });

    return yup.object().shape(shape);
  }, [fields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  // Update form values when `isEditing` changes
  useEffect(() => {
    if (isEditing) {
      reset(defaultValues); // Reset form with preloaded values
    }
  }, [isEditing, defaultValues, reset]);

  const renderField = (field: ProfileField) => {
    const errorMessage = errors[field.name]?.message as string;

    if (!isEditing) {
      return <p className="text-gray-800">{field.value || '-'}</p>;
    }

    const commonProps = {
      ...register(field.name),
      className: `w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
        errorMessage ? 'border-red-500' : 'border-gray-300'
      }`,
    };

    switch (field.type) {
      case 'select':
        return (
          <div>
            <select {...commonProps}>
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
          </div>
        );
      case 'textarea':
        return (
          <div>
            <textarea {...commonProps} rows={3} />
            {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
          </div>
        );
      case 'date':
        return (
          <div>
            <input type="date" max={field.max} {...commonProps} />
            {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
          </div>
        );
      default:
        return (
          <div>
            <input type={field.type} {...commonProps} />
            {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
          </div>
        );
    }
  };

  return (
    <form
      id="profile-form"
      onSubmit={handleSubmit(onSubmit || (() => {}))}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
    </form>
  );
}
