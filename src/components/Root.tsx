import { Box, Button, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import {FaAirbnb} from "react-icons/fa";

export default function Root(){
    return (
        <Box>
            <HStack justifyContent={"space-between"} py={10} px={5} borderBottomWidth={1}>
                <Box color={"red.500"}>
                    <FaAirbnb size={"48px"}/>
                </Box>
                {/*Box로 감싼 이유: FaAirbnb는 Chakra UI가 아니다. 그래서 red.500값을 못쓰고, #E53E3E값을 직접 입력해줘야 한다.*/}
                <HStack spacing={2}>
                    <Button>Sign In</Button>
                    <Button>Sign Up</Button>
                </HStack>
            </HStack>
            <Outlet/>
        </Box>
    )
}