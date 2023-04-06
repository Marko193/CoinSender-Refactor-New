import { useState } from 'react';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button, Checkbox, FormControlLabel, Link, TextField } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TestToken from '@/assets/swap-icons/TestToken.png';
import SushiToken from '@/assets/swap-icons/Sushi.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SouthIcon from '@mui/icons-material/South';
import { withStyles } from '@material-ui/styles';

// @ts-ignore
const WhiteBackgroundCheckbox = withStyles(theme => ({
  root: {
    '&:not($checked) .MuiIconButton-label:after': {
      backgroundColor: 'white !important',
    },
  },
  checked: {},
}))(Checkbox);

// @ts-ignore
const MainLayout = dynamic(
  () => import('@/layouts/main-layout.component').then((mod) => mod.MainLayout),
  {
    ssr: false,

    loading: () => <span> </span>,
  },
);

export default function SwapTokens() {

  const [firstTokenValue, setFirstTokenValue] = useState(23);
  const [secondTokenValue, setSecondTokenValue] = useState(473.21);

  const handleFirstTokenNumber = (e: any) => {
    const regex = /^([0-9]+([.][0-9]*)?|[.][0-9]+$)/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setFirstTokenValue(e.target.value);
    }
  };

  const handleSecondTokenNumber = (e: any) => {
    const regex = /^([0-9]+([.][0-9]*)?|[.][0-9]+$)/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setSecondTokenValue(e.target.value);
    }
  };

  return (
    <MainLayout>
      <div className={styles.main_wrapper}>
        <div className={styles.content_wrapper}>
          <div className={styles.content}>
            <div className={styles.title_block}>
              <div className={styles.title}>Trade</div>
              <div className={styles.exchange_course_wrapper}>
                <TrendingUpIcon />
                <span className={styles.first_coin}>&nbsp;1 $DG&nbsp;</span>
                <span className={styles.coin_amount}>($31.7526)</span>
                <span>&nbsp;=&nbsp;</span>
                <span className={styles.second_coin}>28.28 SUSHI&nbsp;</span>
                <span className={styles.coin_amount}>($1.12262)</span>
              </div>
            </div>
            <div className={styles.swap_blocks_layout}>
              <div className={styles.swap_block}>
                <div className={styles.swap_block_content}>
                  <div className={styles.swap_block_row}>
                    <TextField variant='standard'
                               className={styles.tokens_number}
                               sx={{ input: { height: '36px', color: '#F8FAFC', fontSize: '36px' } }}
                               InputProps={{ disableUnderline: true }}
                               onChange={(e) => handleFirstTokenNumber(e)}
                               value={firstTokenValue}
                               defaultValue={firstTokenValue}
                    />
                    <div className={styles.button_wrapper}>
                      <Image src={TestToken} alt='coin' className={styles.token_icon} />
                      <span>$DG</span>
                      <KeyboardArrowDownIcon style={{ color: '#F8FAFC' }} />
                    </div>
                  </div>
                  <div className={styles.swap_block_row}>
                    <div className={styles.tokens_amount}>
                      <span>$730.31</span>
                      {/*<span className={styles.percents_minus}> (-26.02%)</span>*/}
                    </div>
                    <div className={styles.wallet_block}>
                      <AccountBalanceWalletIcon /> 0.00
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.arrow_wrapper}>
                <SouthIcon sx={{ width: '25px', height: '20px', color: '#3C81F6' }} />
              </div>
              <div className={styles.swap_block}>
                <div className={styles.swap_block_content}>
                  <div className={styles.swap_block_row}>
                    <TextField variant='standard'
                               className={styles.tokens_number}
                               sx={{ input: { height: '36px', color: '#F8FAFC', fontSize: '36px' } }}
                               InputProps={{ disableUnderline: true }}
                               onChange={(e) => handleSecondTokenNumber(e)}
                               value={secondTokenValue}
                               defaultValue={secondTokenValue}
                    />
                    <div className={styles.button_wrapper}>
                      <Image src={SushiToken} alt='coin' className={styles.token_icon} />
                      <span>SUSHI</span>
                      <KeyboardArrowDownIcon style={{ color: '#F8FAFC' }} />
                    </div>
                  </div>
                  <div className={styles.swap_block_row}>
                    <div className={styles.tokens_amount}>
                      <span>$540.38</span>
                      <span className={styles.percents_minus}> (-26.02%)</span>
                    </div>
                    <div className={styles.wallet_block}>
                      <AccountBalanceWalletIcon /> 0.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button className={styles.connect_button}>Connect wallet</Button>
            <div className={styles.high_price_warning}>
              <div className={styles.warning_content}>
                <FormControlLabel
                  control={<WhiteBackgroundCheckbox defaultChecked style={{ color: 'white' }} />} label=''
                  style={{ width: '42px', height: '42px' }} className={styles.checkbox} />
                <div className={styles.warning_text}>
                  Price impact is too high.
                  You will lose a big portion of your funds in this trade. Please tick the box
                  if you would like to continue.
                </div>
              </div>
            </div>
            <div className={styles.statistic_wrapper}>
              <div className={styles.statistic_block}>
                <div className={styles.statistic_row}>
                  <div className={styles.statistic_title}>Price impact</div>
                  <div className={styles.percents_minus}>-30.42%</div>
                </div>
              </div>
              <div className={styles.statistic_block}>
                <div className={styles.statistic_row}>
                  <div className={styles.statistic_title}>Est. received</div>
                  <div className={styles.statistic_description}>475.762 SUSHI</div>
                </div>
              </div>
              <div className={styles.statistic_block}>
                <div className={styles.statistic_row}>
                  <div className={styles.statistic_title}>Min. received</div>
                  <div className={styles.statistic_description}>473.383 SUSHI</div>
                </div>
              </div>
              <div className={styles.statistic_block}>
                <div className={styles.statistic_row}>
                  <div className={styles.statistic_title}>Network fee</div>
                  <div className={styles.statistic_description}>~$7.202</div>
                </div>
              </div>
              <div className={styles.statistic_block}>
                <div className={styles.statistic_row}>
                  <div className={styles.statistic_title}>Route</div>
                  <Link className={styles.statistic_link}>View</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
