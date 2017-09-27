import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as selectors from '../../selectors';
import ShareItem from './ShareItem';
import ShareButton from './ShareButton';
import ShareLink from './ShareLink';
import ShareEmail from './ShareEmail';

const ShareList = ({ title, link }) => {
  const networks = [
    {
      El: ShareLink,
      type: 'copy',
      buttonText: 'Copiar link',
      buttonTextOnClick: 'Copiado'
    },
    {
      El: ShareButton,
      type: 'facebook',
      countText: 'Compartidos',
      buttonText: 'Compartir'
    },
    {
      El: ShareButton,
      type: 'twitter',
      buttonText: 'Tuitear'
    },
    {
      El: ShareButton,
      type: 'whatsapp',
      buttonText: 'Compartir'
    },
    {
      El: ShareButton,
      type: 'telegram',
      buttonText: 'Compartir'
    },
    {
      El: ShareButton,
      type: 'linkedin',
      countText: 'Compartidos',
      buttonText: 'Compartir'
    },
    {
      El: ShareButton,
      type: 'google',
      countText: 'Compartidos',
      buttonText: 'Compartir'
    },
    {
      El: ShareEmail,
      type: 'email',
      buttonText: 'Enviar'
    }
  ];

  return (
    <Container>
      {networks.map(({ El, type, countText, buttonText, buttonTextOnClick }) =>
        <ShareItem
          key={type}
          El={El}
          title={title}
          link={link}
          type={type}
          countText={countText}
          buttonText={buttonText}
          buttonTextOnClick={buttonTextOnClick}
        />
      )}
    </Container>
  );
};

ShareList.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  title: selectors.shareModal.getEntityTitle(state),
  link: selectors.shareModal.getEntityLink(state)
});

export default connect(mapStateToProps)(ShareList);

const Container = styled.ul`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 5px 15px;
`;
