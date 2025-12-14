"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box,  Container, Flex, Heading } from "@radix-ui/themes"


export default function HomePage() {
  const currentAccount = useCurrentAccount();

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* Place navbar at the top, full width */}
        
      {/* Main content below the navbar */}
      <Container size="3"  className="mt-4">
        <Flex direction="column" gap="6" align="center">
          <Heading size="2">Welcome to Sui Homes</Heading>
          <Box>
            {currentAccount ? (
              <div>
                <p>Connected account: {currentAccount.address}</p>
              </div>
            ) : (
              <ConnectButton />
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}


