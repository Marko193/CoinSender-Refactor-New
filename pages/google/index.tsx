import { useRouter } from 'next/router';
import axios from 'axios';

export default function GoogleAuth() {
  const router = useRouter();
  const test = async () => {
    const value = await axios.get(`https://nova.coinsender.io/api/auth/google/get-auth-token?code=${router.query.code}`);
    console.log('value', value);
  };

  console.log('router', router.query.code);
  return (
    <>
      <button onClick={() => test()}>Click</button>
      Content</>
  );
}
