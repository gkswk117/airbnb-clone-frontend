import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaBed, FaToilet } from "react-icons/fa";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { getAmenities, getRoomCategories } from "../api";
import { useQuery } from "@tanstack/react-query";
import { IAmenity, ICategory } from "../types";

export default function UploadRoom() {
  // useUser를 만들었던것 처럼 useHostOnlyPage hook을 만들어서 사용할 수 있다.
  // 궁금하면 nico commit 따로 확인해보기.
  // https://github.com/nomadcoders/airbnb-clone-frontend/commit/4411fc86e29f17bfa64db6be49e3fe023bed8ae5
  // 나는 개인적으로 hook으로 사용하는게 더 좋아보임.
  const { isLoading: isAmenityLoading, data: amenityData } = useQuery<IAmenity[]>(
    ["amenities"],
    getAmenities
  );
  const { isLoading: isCategoryLoading, data: categoryData } = useQuery<ICategory[]>(
    ["categories"],
    getRoomCategories
  );
  console.log(amenityData);
  console.log(categoryData);
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={"center"}>Upload Room</Heading>
            <VStack spacing={10} as="form" mt={5}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input required type="text" />
                <FormHelperText>Write the name of your room.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="￦" />
                  <Input type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea />
              </FormControl>
              <FormControl>
                <Checkbox>Pet friendly?</Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <FormHelperText>What kind of room are you renting?</FormHelperText>
                <Select placeholder="Choose a kind"></Select>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select placeholder="Choose a category">
                  {categoryData?.map((e) => (
                    <option key={e.pk} value={e.pk}>
                      {e.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <FormHelperText>Which amenities does your room have?</FormHelperText>
                <Grid templateColumns={"1fr 1fr"} gap={5}>
                  {amenityData?.map((e) => (
                    <Box key={e.pk}>
                      <Checkbox value={e.pk}>{e.name}</Checkbox>
                      <FormHelperText>{e.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              <Button as="input" type="submit" colorScheme="red" size="lg" w="100%">
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
