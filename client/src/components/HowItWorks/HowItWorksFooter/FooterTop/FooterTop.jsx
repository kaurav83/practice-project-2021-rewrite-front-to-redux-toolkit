import React from 'react';
import { Link } from 'react-router-dom';

import { dataCategoriesFooter } from '../../config/dataCategoriesFooter';
import styles from './FooterTop.module.sass';

const FooterTop = () => {
  const renderTopContent = (() => {
    return dataCategoriesFooter.map((categories) => {
      const { id, title, list, columns } = categories;

      if (title) {
        return (
          <li className={styles.footerCategoryBlock} key={id}>
            <h2 className={styles.footerCategoryTitle}>
              {title}
            </h2>

            <ul className={styles.footerCategoryList}>
              {list.map((item) => {
                return (
                  <li className={styles.footerCategoryItem} key={item.id}>
                    {item.link.startsWith('http')
                      ? <a className={styles.footerCategoryLink} href={item.link}>{item.titleLink}</a>
                      : <Link className={styles.footerCategoryLink} to={item.link}>{item.titleLink}</Link>}


                    {item.innerList && (
                      <ul className={styles.footerInnerCategories}>
                        {item.innerList.map((innerItem) => {
                          return (
                            <li className={styles.footerInnerCategory} key={innerItem.id}>
                              <Link className={styles.footerInnerCategoryLink} to={innerItem.innerLink}>
                                {innerItem.innerTitleLink}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </li>
        )
      }

      else if (columns) {
        return (
          <li key={categories.id} className={styles.columns}>
            {columns.map((column) => {
              return (
                <div key={column.id}>
                  <h2 className={styles.footerCategoryTitle}>
                    {column.title}
                  </h2>

                  <ul className={styles.footerCategoryList}>
                    {column.list.map((item) => {
                      return (
                        <li className={styles.footerCategoryItem} key={item.id}>
                          {item.link.startsWith('http')
                            ? <a className={styles.footerCategoryLink} href={item.link}>{item.titleLink}</a>
                            : <Link className={styles.footerCategoryLink} to={item.link}>{item.titleLink}</Link>}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </li>
        )
      }

      return null;
    })
  })();

  return (
    <div className={styles.footerTop}>
      <ul className={styles.footerCategories}>
        {renderTopContent}
      </ul>
    </div>
  )
};

export default FooterTop;
