import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import GlobalStyle from '../styles/GlobalStyle';
import PageContainer from '../components/scroll/PageContainer';
import Loading from '../components/elements/Loading';
import BigBrother from '../sections/bigBrother';
import MotherA from '../sections/motherA';
import MotherAHeader from '../sections/motherA/MotherAHeader';
import HelpingEachOther from '../sections/helpingEachOther';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
    window.scrollTo(0, 0);
  }

  render() {
    const { isLoaded } = this.state;

    return (
      <>
        { isLoaded ? null : <Loading /> }
        <Provider store={store}>
          <PageContainer>
            <BigBrother />
            <MotherAHeader />
            <MotherA />
            <HelpingEachOther />
          </PageContainer>
        </Provider>
        {/* Inject global styles */}
        <GlobalStyle isLoaded={isLoaded} />
      </>
    );
  }
}

export default Index;
