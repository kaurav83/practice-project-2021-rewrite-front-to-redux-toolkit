import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  changeShowModeCatalog,
  deleteCatalog,
} from '../../../../store/slices/chatSlice';

import Catalog from '../Catalog/Catalog';
import styles from '../CatalogListContainer/CatalogListContainer.module.sass';

const CatalogList = (props) => {
  const dispatch = useDispatch();

  const goToCatalog = useCallback((event, catalog) => {
    dispatch(changeShowModeCatalog(catalog));
    event.stopPropagation();
  }, [dispatch]);

  const deleteCatalogCallback = useCallback((event, catalogId) => {
    dispatch(deleteCatalog({ catalogId }));
    event.stopPropagation();
  }, [dispatch]);

  const getListCatalog = () => {
    const { catalogList } = props;
    const elementList = [];

    catalogList.forEach((catalog) => {
      elementList.push(
        <Catalog
          catalog={catalog}
          key={catalog._id}
          deleteCatalog={deleteCatalogCallback}
          goToCatalog={goToCatalog}
        />
      );
    });

    return elementList.length ? (
      elementList
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  return (
    <div className={styles.listContainer}>
      {getListCatalog()}
    </div>
  );
};

export default CatalogList;
