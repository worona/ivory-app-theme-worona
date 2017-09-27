import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import MenuHeader from './MenuHeader';
import MenuList from './MenuList';
import NotificationsSwitch from '../../elements/NotificationsSwitch';

const Menu = ({ isOpen, menuHasClosed }) =>
  <Container isOpen={isOpen}>
    <Overlay isOpen={isOpen} onClick={menuHasClosed} onTouchMove={menuHasClosed} />
    <InnerContainer isOpen={isOpen}>
      <MenuHeader />
      <MenuList />
      <NotificationsSwitch />
    </InnerContainer>
  </Container>;

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  menuHasClosed: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isOpen: selectors.menu.isOpen(state)
});

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: visibility 0s ease-in ${({ isOpen }) => (isOpen ? '' : '0.3s')};
  z-index: 150;
`;

const Overlay = styled.div`
  filter: opacity(${({ isOpen }) => (isOpen ? 100 : 0)}%);
  transition: filter 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(${({ isOpen }) => (isOpen ? '0%' : '-100%')});
  width: 75vw;
  height: 100%;
  background-color: #fff;
  transition: transform 0.3s ease-out;
  z-index: 151;
`;
