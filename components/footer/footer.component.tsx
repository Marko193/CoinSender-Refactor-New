import styles from "./footer.module.scss";
import Logo from "@/assets/new-login-icons/CoinSenderIcon.svg";
import Twitter from '@/assets/social-networks-icons/logo_twitter.svg';
import Telegram from "@/assets/social-networks-icons/logo_telegram.svg";
import Discord from '@/assets/social-networks-icons/logo_discord.svg';
import Instagram from '@/assets/social-networks-icons/logo_instagram.svg';
import LinkedIn from '@/assets/social-networks-icons/logo_linkedin.svg';
import Facebook from "@/assets/social-networks-icons/logo_facebook.svg"
import YouTube from "@/assets/social-networks-icons/logo_youtube.svg";
import {Link} from "@mui/material";
import Image from 'next/image';

export default function Footer() {

    const items = [
        {name: "Features", link: "features"},
        {name: "How it works", link: "howitworks"},
        {name: "Benefits", link: "benefits"},
        {name: "Pricing", link: "pricing"},
        {name: "Intagrations", link: "integrations"},
        {name: "Roadmap", link: "roadmap"},
        {name: "Backed by Product Company", link: "backed"},
        {name: "Contact", link: "contact"},
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.logo}>
                    <Image src={Logo} alt=""/>
                </div>
                <div className={styles.footer__desktop_menu}>
                    <ul className={styles.footer__nav}>
                        <li>
                            <Link style={{textDecoration: 'none'}}>Home</Link>
                        </li>

                        {items.map(({name, link}, index) => (
                            <li key={index}>
                                <Link style={{textDecoration: 'none'}}>
                                    {name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link style={{textDecoration: 'none'}}>FAQ</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.icons_row}>
                <Link style={{textDecoration: 'none'}} href="https://twitter.com/coinsender?s=21&t=ViD6j5YwOt_YiKArWEPrMA">
                    <Image src={Twitter} alt="social_icon"/>
                </Link>
                <Link style={{textDecoration: 'none'}} href="https://t.me/community_coinsender">
                    <Image
                        src={Telegram}
                        alt="social_icon"
                    />
                </Link>
                <Link style={{textDecoration: 'none'}} href="https://discord.gg/uwDcyU7r">
                    <Image src={Discord} alt="social_icon"/>
                </Link>
                <Link style={{textDecoration: 'none'}} href="https://twitter.com/coinsender?s=21&t=ViD6j5YwOt_YiKArWEPrMA">
                    <Image
                        src={Instagram}
                        alt="social_icon"
                    />
                </Link>
                <Link style={{textDecoration: 'none'}} href="https://www.linkedin.com/company/coinsender/">
                    <Image
                        src={LinkedIn}
                        alt="social_icon"
                    />
                </Link>
                <Link style={{textDecoration: 'none'}} href="https://www.facebook.com/profile.php?id=100090399190512&mibextid=LQQJ4d">
                    <Image
                        src={Facebook}
                        alt="social_icon"
                    />
                </Link>
                <Link style={{textDecoration: 'none'}} href="https://youtube.com/@CoinSender">
                    <Image src={YouTube} alt="social_icon"/>
                </Link>
            </div>
            <div className={styles.privacy_policy_wrapper}>
                <div className={styles.privacy_policy_layout}>
                    <Link style={{textDecoration: 'none'}}
                        className={styles.privacy_policy}
                    >
                        Privacy policy
                    </Link>
                    <span className={styles.dot}></span>
                    <Link style={{textDecoration: 'none'}} className={styles.terms_of_use}>Terms of Use</Link>
                </div>
            </div>
        </footer>
    );
}
