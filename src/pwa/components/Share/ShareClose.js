import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IconClose from 'react-icons/lib/md/close';
import * as actions from '../../actions';

const ShareClose = ({ shareModalClosingRequested }) =>
  <Container onClick={shareModalClosingRequested}>
    <IconClose size={33} />
  </Container>;

ShareClose.propTypes = {
  shareModalClosingRequested: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  shareModalClosingRequested: () => dispatch(actions.shareModal.closingRequested())
});

export default connect(null, mapDispatchToProps)(ShareClose);

// const touch = keyframes`
//   100% {
//     background-color: rgba(0, 0, 0, 0.2)
//   }
// `;

const Container = styled.div`
  width: ${({ theme }) => theme.titleSize};
  height: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color};

  ${'' /* animation-name: ${({ touched }) => (touched ? touch : '')};
  animation-duration: 70ms;
  animation-timing-function: ease-out;
  animation-iteration-count: 2;
  animation-direction: alternate; */};
`;
