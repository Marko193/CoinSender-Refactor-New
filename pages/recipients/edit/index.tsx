import { useRouter } from 'next/router';

export default function EditRecipient() {

  const router = useRouter();
  const { recipientId } = router.query;

  return (
    <div>Edit recipient page { recipientId } </div>
  )
}
