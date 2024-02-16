import React from 'react';
import { Placeholder, Segment, Container } from 'semantic-ui-react';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer

const LoadingPage = () => {
    return (
        <>
            {/* Placeholder for Header */}
            <Container textAlign='center' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Segment raised>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line length='full' />
                            <Placeholder.Line length='very long' />
                        </Placeholder.Header>
                    </Placeholder>
                </Segment>
            </Container>

            {/* Main Content Placeholder */}
            <Container>
                <Segment raised>
                    <Placeholder fluid>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='full' />
                            <Placeholder.Line length='very long' />
                            <Placeholder.Line length='long' />
                            <Placeholder.Line length='medium' />
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='long' />
                            <Placeholder.Line length='medium' />
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
            </Container>

            <Footer />
        </>
    );
};

export default LoadingPage;
