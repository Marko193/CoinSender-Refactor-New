import React from "react";
import { useRouter } from 'next/router'
export default function RestorePassPage() {

    const router = useRouter()
    const { restorePasswordToken } = router.query

    return (
      <> Content {restorePasswordToken} </>
    )
}
