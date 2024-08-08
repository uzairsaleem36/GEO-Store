import { Box, Flex, Button, IconButton } from '@chakra-ui/react'; 
import React from 'react'; 
import { MdOutlineManageAccounts } from "react-icons/md";

export default function Header() {
  const handleGoogleSignUp = () => {
    // Redirect to Google's OAuth 2.0 authorization endpoint
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
      'client_id=YOUR_GOOGLE_CLIENT_ID&' +
      'redirect_uri=YOUR_REDIRECT_URI&' +
      'response_type=token&' +
      'scope=email%20profile';
  };

  return (
    <Box as="nav" backgroundColor="#1A4870" padding="10px 30px">
      <Flex
        justifyContent="space-between"
        align="center"
        fontSize="30px"
        height="60px" // Adjust the height as needed
      >
        <h1 style={{ color: 'white' }}>GEO</h1>
        <Flex align="center">
         
          <IconButton
            icon={<MdOutlineManageAccounts />}
            colorScheme="teal"
            variant="outline"
            marginRight="20px"
            aria-label="Manage Account"
          />
          <Button colorScheme="yellow" onClick={handleGoogleSignUp}>
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
