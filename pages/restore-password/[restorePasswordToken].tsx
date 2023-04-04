import React from 'react';
import { useRouter } from 'next/router';
import ChangePasswordForm from '@/components/changePasswordForm';

export default function RestorePassPage() {

  const router = useRouter();
  const { restorePasswordToken } = router.query;

  return (
    <>
      <ChangePasswordForm /><>
      Content {restorePasswordToken} </>
    </>
  );
}
