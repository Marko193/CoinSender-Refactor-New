import { Button, Stack, Typography, useTheme } from '@mui/material';
import LeftIcon from '@/assets/icons/arrow-button-left.svg';
import Image from 'next/image';
import styles from './styles.module.scss';
import Link from 'next/link';

export const PageTitle = ({
                            title,
                            path,
                            button_name,
                            button_route,
                            button_icon,
                            handler,
                            border,
                          }: any) => {
  const { spacing } = useTheme();

  return (
    <Stack
      width='100%'
      flexDirection='row'
      alignItems='center'
      position='relative'
      justifyContent='space-between'
      className={styles.page_title_wrapper}
      mt={spacing(9)}
      mb={spacing(3)}
    >
      {path && handler && (
        <Stack onClick={handler} style={{ position: 'absolute', top: '-100%', cursor: 'pointer' }}>
          <Image width='20' height='20' src={LeftIcon} alt='' />
        </Stack>
      )}
      {path && !handler && (
        <Link href={path} style={{ position: 'absolute', top: '-100%', cursor: 'pointer' }}>
          <Image width='20' height='20' src={LeftIcon} alt='' />
        </Link>
      )}
      <Stack borderBottom={border ? '1px solid #FFA31A' : 'none'}>
        <Typography variant='caption' className={styles.title}>{title}</Typography>
      </Stack>

      {button_route && (
        <Link href={button_route} className={styles.button_link}>
          <Button variant='contained' style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: '__Inter_01180f, __Inter_Fallback_01180f, sans-serif',
          }}>
            {button_name}
          </Button>
        </Link>)
      }

    </Stack>
  );
};
