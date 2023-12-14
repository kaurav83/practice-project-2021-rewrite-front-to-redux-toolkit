import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { HowItWorksContext } from '../../../../context/HowItWorksContext/HowItWorksContext';

import AccountIcon from '../../../SvgComponents/accountIcon';
import PhoneIcon from '../../../SvgComponents/phoneIcon';
import ChatIcon from '../../../SvgComponents/chatIcon';
import EmailIcon from '../../../SvgComponents/emailIcon';
import HelpDeskIcon from '../../../SvgComponents/helpdeskIcon';
import HeartIcon from '../../../SvgComponents/heartIcon';
import MagnifierIcon from '../../../SvgComponents/magnifierIcon';
import HamburgerIcon from '../../../SvgComponents/hamburgerIcon';
import LogoWhite from '../../../SvgComponents/logoWhite';
import styles from './HowItWorksHeaderTop.module.sass';

const HowItWorksHeaderTop = () => {
  const { setOpenMenu, isOpenMenu } = useContext(HowItWorksContext);

  return (
    <div className={styles.HowItWorksHeaderTop}>
      <div className={styles.HowItWorksHeaderTopWrapper}>
        <Link to="/" className={styles.logo}>
          <LogoWhite />
        </Link>

        <div className={styles.search}>
          <input
            type='text'
            className={styles.field}
            placeholder="Search over 100,000 names"  
          />

          <button type="button" className={styles.buttonSearch}>
            <MagnifierIcon />
          </button>
        </div>

        <div className={styles.rightSide}>
          <ul className={styles.personalNavList}>
            <li className={styles.personalNav}>
              <span className={styles.personalWrapper}>
                <AccountIcon />

                <span className={styles.personalNavTitle}>
                  Account
                </span>
              </span>

              <ul className={styles.innerList}>
                <li className={styles.innerItem}>
                  <Link to="/login" className={styles.innerLink}>
                    <span className={styles.innerText}>
                      Login
                    </span>
                  </Link>
                </li>

                <li className={styles.innerItem}>
                  <Link to="/registration" className={styles.innerLink}>
                    <span className={styles.innerText}>
                      SignUp
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className={styles.personalNav}>
              <div className={styles.personalWrapper}>
                <PhoneIcon />

                <span className={styles.personalNavTitle}>
                  Contact
                </span>
              </div>

              <ul className={styles.innerList}>
                <li className={styles.innerItem}>
                  <a className={styles.innerLink} href="tel:(877)355-3585">
                    <PhoneIcon />

                    <span className={styles.innerText}>
                      (877) 355-3585
                    </span>
                  </a>
                </li>

                <li className={styles.innerItem}>
                  <Link to='/chat' className={styles.innerLink}>
                    <ChatIcon />

                    <span className={styles.innerText}>
                      Chat
                    </span>
                  </Link>
                </li>

                <li className={styles.innerItem}>
                  <a className={styles.innerLink} href="mailto:service@squadhelp.com">
                    <EmailIcon />

                    <span className={styles.innerText}>
                      Email
                    </span>
                  </a>
                </li>

                <li className={styles.innerItem}>
                  <Link to='/helpdesk' className={styles.innerLink}>
                    <HelpDeskIcon />

                    <span className={styles.innerText}>
                      Help Desk
                    </span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className={styles.personalNav}>
              <Link to='/favorites' className={styles.personalWrapper}>
                <HeartIcon />

                <span className={styles.personalNavTitle}>
                  Favorites
                </span>
              </Link>
            </li>

            <li className={styles.startContest}>
              <Link to='/startContest' className={styles.startContestLink}>
                Start Contest
              </Link>
            </li>

            <li className={styles.hamburger}>
              <button
                type="button"
                className={styles.hamburgerBtn}
                onClick={() => setOpenMenu(!isOpenMenu)}
              >
                <HamburgerIcon />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default HowItWorksHeaderTop;
