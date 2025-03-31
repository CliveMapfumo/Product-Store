import React from 'react'
import {Container, Flex} from '@chakra-ui/react'

function Navbar() {
  return (
    <Container maxW={'1140px'} px={4}>
        <Flex 
        h={16}
        alignitems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row" }}
        >
            

        </Flex>
    </Container>
  )
}

export default Navbar