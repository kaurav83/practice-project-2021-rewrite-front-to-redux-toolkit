import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Chevron from '../../../SvgComponents/chevron';
import styles from './HowItWorksHeaderBottom.module.sass';

const HowItWorksHeaderBottom = () => {
  return (
    <div className={styles.howItWorksHeaderBottom}>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <div className={styles.navTitle}>
              <Link to='/premium-domains-for-sale' className={styles.navTitleLink}>
                Names For Sale
              </Link>

              <Chevron />
            </div>

            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link 
                  to='/premium-domains-for-sale/all'
                  className={styles.menuLink}
                >
                  Popular Brandable Names
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/premium-domains-for-sale'
                  className={styles.menuLink}  
                >
                  Premium Domains For Sale
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/premium-domains-for-sale/all/length/Short'
                  className={styles.menuLink}  
                >
                  Short Domains
                </Link>

                <ul className={styles.menuInnerVisible}>
                  <li className={styles.menuInnerVisibleItem}>
                    <Link
                      to='/premium-domains-for-sale/all/length/3%20Letters'
                      className={styles.menuInnerVisibleLink}  
                    >
                      3 Letter Domains
                    </Link>
                  </li>

                  <li className={styles.menuInnerVisibleItem}>
                    <Link
                      to='/premium-domains-for-sale/all/length/4%20Letters'
                      className={styles.menuInnerVisibleLink}  
                    >
                      4 Letter Domains
                    </Link>
                  </li>

                  <li className={styles.menuInnerVisibleItem}>
                    <Link
                      to='/premium-domains-for-sale/all/length/5%20Letters'
                      className={styles.menuInnerVisibleLink}  
                    >
                      5 Letter Domains
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/premium-domains-for-sale/all/type_of_name/One%20Word'
                  className={styles.menuLink}  
                >
                  One Word Names
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/industry-domains'
                  className={styles.menuLink}  
                >
                  Industry Domains
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link 
                  to='/geo-business-names/all'
                  className={styles.menuLink}  
                >
                  Location Based Names
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/recommended-for-you'
                  className={styles.menuLink}  
                >
                  Recommended For You
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/sell-domain-names'
                  className={styles.menuLink}  
                >
                  Become A Seller
                </Link>
              </li>
            </ul>
          </li>

          <li className={styles.navItem}>
            <div className={styles.navTitle}>
              <Link to='/branding-marketing-naming-contests' className={styles.navTitleLink}>
                Naming Contests
              </Link>

              <Chevron />
            </div>

            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link
                  to='/start-contest'
                  className={styles.menuLink}  
                >
                  Start A Contest
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/how-it-works'
                  className={styles.menuLink}  
                >
                  How It Works
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/squadhelp-pricing'
                  className={styles.menuLink}  
                >
                  Contest Pricing
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/managed-contests'
                  className={styles.menuLink}  
                >
                  Agency Services
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/our-work'
                  className={styles.menuLink}  
                >
                  Our Work
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/winners'
                  className={styles.menuLink}  
                >
                  Recent Winners
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link 
                  to='/branding-marketing-naming-contests/all'
                  className={styles.menuLink}  
                >
                  Active Contests
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/join-as-creative'
                  className={styles.menuLink}  
                >
                  Become A Creative
                </Link>
              </li>
            </ul>
          </li>

          <li className={styles.navItem}>
            <div className={styles.navTitle}>
              <Link to='#' className={styles.navTitleLink}>
                Other Services
              </Link>

              <Chevron />
            </div>

            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link
                  to='/logos'
                  className={styles.menuLink}  
                >
                  Logos
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/taglines'
                  className={styles.menuLink}  
                >
                  Taglines
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/audience-testing'
                  className={styles.menuLink}  
                >
                  Audience Testing
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/articles/389625-trademark-research-service7'
                  className={styles.menuLink}  
                >
                  Trademark Research
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/brand-identity-design'
                  className={styles.menuLink}  
                >
                  Brand Identity Design
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/videos'
                  className={styles.menuLink}  
                >
                  Video Creation
                </Link>
              </li>
            </ul>
          </li>

          <li className={styles.navItem}>
            <div className={styles.navTitle}>
              <Link to='/managed-contests' className={styles.navTitleLink}>
                Agency Experience
              </Link>
            </div>
          </li>

          <li className={styles.separator} />

          <li className={styles.navItem}>
            <div className={styles.navTitle}>
              <Link to='/' className={styles.navTitleLink}>
                Resources
              </Link>

              <Chevron />
            </div>

            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link
                  to='/business-name-generator'
                  className={styles.menuLink}  
                >
                  Business Name Generator
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/domain-name-generator'
                  className={styles.menuLink}  
                >
                  Domain Name Generator
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/blog/how-to-come-up-with-business-name'
                  className={styles.menuLink}  
                >
                  How to Name Your Business
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link
                  to='/free-trademark-search'
                  className={styles.menuLink}  
                >
                  Free Trademark Checker
                </Link>
              </li>

              <li className={classNames(styles.menuItem, styles.menuItemHaveList)}>
                <div className={styles.navInnerTitle}>
                  <span className={styles.navTitleLink}>
                    Industry Name Ideas
                  </span>

                  <Chevron />
                </div>

                <ul className={styles.menuListInner}>
                  <li className={styles.menuItem}>
                    <Link
                      to='/Name-Ideas/360/clothing-brand-name-ideas'
                      className={styles.menuLink}  
                    >
                      Clothing Brand Name Ideas
                    </Link>
                  </li>

                  <li className={styles.menuItem}>
                    <Link
                      to='/Name-Ideas/592/consulting-company-name-ideas'
                      className={styles.menuLink}  
                    >
                      Consulting Business Name Ideas
                    </Link>
                  </li>

                  <li className={styles.menuItem}>
                    <Link
                      to='/Name-Ideas/603/health-business-name-ideas'
                      className={styles.menuLink}  
                    >
                      Health & Wellness Business Name Ideas
                    </Link>
                  </li>

                  <li className={styles.menuItem}>
                    <Link
                      to='/Name-Ideas/602/food-brand-name-ideas'
                      className={styles.menuLink}  
                    >
                      Food Brand Name ideas
                    </Link>
                  </li>

                  <li className={styles.menuItem}>
                    <Link
                      to='/Name-Ideas/419/beauty-business-name-ideas'
                      className={styles.menuLink}  
                    >
                      Beauty Business Names
                    </Link>
                  </li>

                  <li className={styles.menuItem}>
                    <Link
                      to='/Name-Ideas/619/tech-startup-name-ideas'
                      className={styles.menuLink}  
                    >
                      Tech Startup Name Ideas
                    </Link>
                  </li>

                  <li className={styles.menuItem}>
                    <Link
                      to='/Name-Ideas/616/real-estate-business-names-ideas'
                      className={styles.menuLink}  
                    >
                      Real Estate Business Name Ideas
                    </Link>
                  </li>

                  <li className={styles.menuItem}>
                    <Link 
                      to='/Name-Ideas/135/insurance-business-name-ideas'
                      className={styles.menuLink}  
                    >
                      Insurance Business Name Ideas
                    </Link>
                  </li>

                  <li className={styles.menuItem}>
                    <Link
                      to='/Name-Ideas/601/finance-business-name-ideas'
                      className={styles.menuLink}  
                    >
                      Finance Business Name Ideas
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default HowItWorksHeaderBottom;
