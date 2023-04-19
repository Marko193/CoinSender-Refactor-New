// import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { useState } from 'react';
import { Avatar, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from '../../helpers/stringUtils';

const UploadIcon = styled(CloudUploadIcon);

export default function AvatarUpload({ avatar, handler, flag, deleteHandler, user, type }) {
  const [newValue, setNewValue] = useState(avatar);

  // const { t } = useTranslation('common');

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const sendFile = e.target.files;
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setNewValue(base64);
    handler('avatar', sendFile);
  };

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <>
      <Avatar
        src={
          flag === 'new'
            ? newValue
            : newValue && newValue.length > 1000
            ? newValue
            : newValue || '/images/example.jpg'
        }
        style={{
          margin: '10px',
          width: '100px',
          height: '100px',
          cursor: 'pointer',
          position: 'relative',
        }}
        {...(type === 'client'
          ? stringAvatar(user?.name)
          : stringAvatar(user?.name, user?.second_name))}
      />
      <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
        <label style={{ margin: 0 }} htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            onChange={(e) => handleFileUpload(e)}
            type="file"
          />

          <Button variant="contained" component="span">
            <UploadIcon mr={2} />
            Upload
          </Button>
        </label>
        <Button
          disabled={newValue === '/images/example.jpg' || newValue === null}
          onClick={() => {
            handler('avatar', null);
            setNewValue('/images/example.jpg');
          }}
          variant="contained"
        >
          <DeleteIcon />
        </Button>
      </Stack>
    </>
  );
}
