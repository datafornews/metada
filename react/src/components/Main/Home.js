import React from 'react';





class Home extends React.Component {




  render() {

    const { children } = this.props;

    return (
      <Container {...this.props}>
        <div style={{ margin: 'auto' }} ref='exampleDiv'>
          {children}
        </div>
      </Container>
    );
  }
}

export default Home;