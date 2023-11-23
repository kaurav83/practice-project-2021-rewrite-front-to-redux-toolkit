import React from 'react';
import { useField } from 'formik';

const FieldFileInput = ({ classes, name, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;
  const [{ value, ...restFields }, meta, helpers] = useField(name);

  const getFileName = () => {
    if (value) {
      return value.name;
    }
    return '';
  };

  return (
    <div className={fileUploadContainer}>
      <label htmlFor='fileInput' className={labelClass}>
        Choose file
      </label>
      <span id='fileNameContainer' className={fileNameClass}>
        {getFileName()}
      </span>
      <input {...restFields} className={fileInput} id='fileInput' type='file' />
    </div>
  );
};

export default FieldFileInput;
