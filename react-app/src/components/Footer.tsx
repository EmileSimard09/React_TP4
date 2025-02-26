import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box component="footer">
      <Container>
        <Typography align="center" paddingBottom={3}>
          &copy; Emile Simard 2025
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
