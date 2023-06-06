import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// Import Styles
import '../../global.css';
import './styles.css';

export default function InputForm({
  label,
  helperText,
  onChange,
  defaultValue,
  type,
  margin,
  disabled,
}) {
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#000',
      fontSize: 28,
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '900',
    },
    '& label': {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '900',
      paddingTop: 20,
      zIndex: 1,
      marginLeft: 12,
    },
    '& .MuiInputLabel-root': {
      color: '#000',
      fontSize: 24,
    },

    '& .MuiInput-underline:after': {
      borderColor: '#000',
    },
    '& .MuiInputBase-input': {
      fontSize: 20,
      fontFamily: 'Inter',
      fontWeight: '900',
      fontStyle: 'normal',
      marginTop: 20,
      color: '#575757',
    },
  });
  return (
    <CssTextField
      label={label}
      id="input"
      variant="standard"
      size="normal"
      fullWidth
      type={type}
      helperText={helperText}
      defaultValue={defaultValue}
      onChange={onChange}
      autoFocus
      margin={margin}
      disabled={disabled}
    />
  );
}
