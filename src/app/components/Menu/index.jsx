import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Logo from '../Header/Logo';
import MenuItem from './MenuItem';
import CloseButton from './CloseButton';
import * as deps from '../../deps';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

const Menu = ({
  isOpen,
  menuItemsList,
  currentCat,
  currentTag,
  currentAuthor,
  currentPost,
  currentPage,
  menuHasClosed,
}) =>
  <Container isOpen={isOpen}>
    <Overlay isOpen={isOpen} onClick={menuHasClosed} onTouchMove={menuHasClosed} />
    <InnerContainer isOpen={isOpen}>
      <Header>
        <Logo />
        <CloseButton />
      </Header>
      <Body>
        <List>
          {menuItemsList.map((item, index) =>
            <MenuItem
              key={index}
              currentCat={currentCat}
              currentTag={currentTag}
              currentAuthor={currentAuthor}
              currentPost={currentPost}
              currentPage={currentPage}
              {...item}
            />
          )}
        </List>
      </Body>
    </InnerContainer>
  </Container>;

Menu.propTypes = {
  menuItemsList: PropTypes.arrayOf(PropTypes.object),
  currentCat: PropTypes.number,
  currentTag: PropTypes.number,
  currentAuthor: PropTypes.number,
  currentPost: PropTypes.number,
  currentPage: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  menuHasClosed: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menuItemsList: deps.selectorCreators.getSetting('theme', 'menu')(state),
  currentCat: parseInt(deps.selectors.getURLQueries(state).cat, 10) || 0,
  currentTag: parseInt(deps.selectors.getURLQueries(state).tag, 10) || 0,
  currentAuthor: parseInt(deps.selectors.getURLQueries(state).author, 10) || 0,
  currentPost: parseInt(deps.selectors.getURLQueries(state).p, 10) || 0,
  currentPage: parseInt(deps.selectors.getURLQueries(state).page_id, 10) || 0,
  isOpen: selectors.menu.isOpen(state),
});

const mapDispatchToProps = dispatch => ({
  menuHasClosed: () => dispatch(actions.menu.hasClosed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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

const Header = styled.div`
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
`;

const Body = styled.div`
  width: 100%;
  height: calc(100% - ${({ theme }) => theme.titleSize});
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &:-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;
