import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';

import {
  changeShowModeCatalog,
  changeRenameCatalogMode,
  changeCatalogName,
} from '../../../../store/slices/chatSlice';
import { Schems } from '../../../../utils/validators/validationSchems';

import FormInput from '../../../FormInput/FormInput';
import styles from './CatalogHeader.module.sass';

const CatalogListHeader = (props) => {
  const dispatch = useDispatch();
  const {
    isRenameCatalog,
    currentCatalog: {
      catalogName,
      _id,
    },
  } = useSelector((state) => state.chatStore);
  const initialValues = {catalogName};

  const changeCatalogNameCallback = useCallback((values) => {
    dispatch(changeCatalogName({
      catalogName: values.catalogName,
      catalogId: _id
    }));
  }, [dispatch, _id]);

  return (
    <div className={styles.headerContainer}>
      <i
        className="fas fa-long-arrow-alt-left"
        onClick={() => dispatch(changeShowModeCatalog())}
      />

      {!isRenameCatalog && (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>

          <i
            className="fas fa-edit"
            onClick={() => dispatch(changeRenameCatalogMode())}
          />
        </div>
      )}
      {isRenameCatalog && (
        <div className={styles.changeContainer}>
          <Formik
            onSubmit={changeCatalogNameCallback}
            initialValues={initialValues}
            validationSchema={Schems.CatalogSchema}
          >
            <Form>
              <FormInput
                name="catalogName"
                classes={{
                  container: styles.inputContainer,
                  input: styles.input,
                  warning: styles.fieldWarning,
                  notValid: styles.notValid,
                }}
                type="text"
                label="Catalog Name"
              />

              <button type="submit">Change</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CatalogListHeader;
