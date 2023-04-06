import styles from './styles.module.scss';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import dynamic from 'next/dynamic';

// @ts-ignore
const MainLayout = dynamic(
  () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
  {
    ssr: false,

    loading: () => <span> </span>,
  },
);

export default function SwapTokens() {
  return (
    <MainLayout>
      <div className={styles.main_wrapper}>
        <div className={styles.content}>
          <div className={styles.title_block}>
            <div className={styles.title}>Trade</div>
            <div className={styles.exchange_course_wrapper}>
              {/*<Image src={GrowUpIcon} alt='grow_up' />*/}
              <TrendingUpIcon />
              <span className={styles.first_coin}>1 $DG&nbsp;</span>
              <span className={styles.coin_amount}>($31.7526)</span>
              <span>&nbsp;=&nbsp;</span>
              <span className={styles.second_coin}>28.28 SUSHI&nbsp;</span>
              <span className={styles.coin_amount}>($1.12262)</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
