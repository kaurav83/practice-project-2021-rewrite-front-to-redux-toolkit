import React, { useState } from 'react';

import { CONSTANTS } from '../../../constants';

import Modal from '../../Modal/Modal';
import styles from './HeroBanner.module.sass';

const HeroBanner = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroBannerWrapper}>
        <div className={styles.leftSide}>
          <span className={styles.hashTag}>
            World's #1 Naming Platform
          </span>

          <h1 className={styles.title}>
            How Does Squadhelp Work?
          </h1>

          <p className={styles.description}>
            Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.
          </p>

          <button className={styles.buttonPlay} onClick={() => setOpenModal(true)}>
            <small className='fas fa-play mr-2' />

            <span className={styles.buttonPlayText}>Play Video</span>
          </button>

          {isOpenModal && (
            <Modal onClose={() => setOpenModal(false)}>
              <div className={styles.modalContent}>
                <iframe id="fancybox-frame1702636090245" name="fancybox-frame1702636090245" className="fancybox-iframe" frameBorder="0" vspace="0" hspace="0" webkitallowfullscreen="" mozallowfullscreen="" allowFullScreen="" allowtransparency="true" title="marketing video" src="//player.vimeo.com/video/826948811?autoplay=1&amp;hd=1&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;fullscreen=1&amp;api=1&amp;player_id=fancybox-frame1702636090245" scrolling="no" />
              </div>
            </Modal>
          )}

        </div>

        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}app-user.svg`}
          alt="app-user"
          className={styles.appUserImg}
        />
      </div>
    </div>
  )
};

export default HeroBanner;
