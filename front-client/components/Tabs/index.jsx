import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PColor, PVColor } from '../../public/colors';

const TabPanel = ({ children }) => (
    <TabContent role="tabpanel" tabindex="0">
        {children}
    </TabContent>
);

TabPanel.propTypes = {
    children: PropTypes.any.isRequired
};

class Tabs extends Component {
  static Panel = TabPanel;

  static propTypes = {
      children: PropTypes.any.isRequired,
      tabBreak: PropTypes.string
  };

  static defaultProps = {
      tabBreak: '200px'
  };

  state = {
      selectedTab: 0
  };

  selectTab = tabIndex => {
      this.setState({ selectedTab: tabIndex });
  };

  render() {
      const { children, tabBreak, width } = this.props;
      const { selectedTab } = this.state;

      return (
          <TabsWrapper>
              <TabList  columnWidth={width} breakPoint={tabBreak} role="tablist">
                  {React.Children.map(children, ({ props: { label } }, index) => (
                      <TabButton
                          role="tab"
                          selected={selectedTab === index}
                          aria-selected={selectedTab === index ? 'true' : 'false'}
                          onClick={() => this.selectTab(index)}
                      >
                          {label}
                      </TabButton>
                  ))}
              </TabList>

              <Content>
                  {React.Children.map(children, (comp, index) => selectedTab === index ? comp : undefined
                  )}
              </Content>
          </TabsWrapper>
      );
  }
}

const TabsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TabButton = styled.button`
  height: 50px;
  padding: 0px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: default;
  background: transparent;

  transition: border-color 0.2s ease-in;
  border: none;
  border-bottom: 4px solid ${ props => (props.selected ? PColor : '#eee') };
  &:hover,
  &:focus,
  &:active {
    border-bottom: 4px solid ${ props => (props.selected ? PColor : '#c0bebe') };
  }
`;

const TabList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  display: grid;
  grid-template-columns: ${({ columnWidth }) => columnWidth ? columnWidth?.map(x => `${x} `) : '1fr'}; 
  height: auto;
  align-items: center;
  margin: 0 auto;
  outline: none;
  @media (max-width: ${ props => props.breakPoint }) {
    flex-direction: column;
    & > div,
    & > div > button {
      width: 100%;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  padding-top: 16px;
`;

const TabContent = styled.div`
  flex: 1;
  width: 100%;
`;

export default Tabs;
