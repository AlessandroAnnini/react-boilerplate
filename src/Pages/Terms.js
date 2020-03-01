import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Markdown from 'Common/Components/Markdown';
import Typography from '@material-ui/core/Typography';
import terms from 'MarkdownFiles/terms.md.js.js.js';

export default () => (
  <Container>
    <Box mt={7} mb={12}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Terms
      </Typography>
      <Markdown>{terms}</Markdown>
    </Box>
  </Container>
);
