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
  useToast,
  Text,
} from "@chakra-ui/react";
import { FaBed, FaToilet } from "react-icons/fa";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { getAmenities, getRoomCategories, uploadRoom } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IAmenity, ICategory, IUploadRoomVariables } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";

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
  const uploadRoomForm = useForm<IUploadRoomVariables>();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(uploadRoom, {
    onMutate: () => {
      console.log("is Mutating");
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        const toastId = toast({
          title: "Room created!",
          description: "^^",
          status: "success",
        });
        navigate(`/rooms/${response.data.id}`);
      } else {
        const toastId = toast({
          title: "Failed uploading room!",
          description: "ㅠㅠ",
          status: "error",
        });
      }
    },
  });
  const onSubmit: SubmitHandler<IUploadRoomVariables> = (data) => {
    // 여기서 바로 api.ts에 있는 fetch 함수를 호출해도 되지만 UI를 좀 더 nice하게 만들기 위해 useMutation사용.
    // ex. useMuation 덕분에 fetch함수가 아직 실행 중일때는 Button의 isLoading에 true를 넣어주고 실행 완료가 되면 false를 넣어줄 수 있다.
    mutation.mutate(data);
  };
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
            <VStack as="form" onSubmit={uploadRoomForm.handleSubmit(onSubmit)} spacing={10} mt={5}>
              {/* submit 이벤트 발생 시 handleSubmit는 콜백 함수에게 form 데이터를 argument로 넣어서 호출한다.
              UsernameLogin.tsx처럼 노가다를 안해도 된다.*/}
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...uploadRoomForm.register("name", { required: true })}
                  required
                  type="text"
                />
                <FormHelperText>Write the name of your room.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...uploadRoomForm.register("country", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...uploadRoomForm.register("city", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...uploadRoomForm.register("address", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="￦" />
                  <Input
                    {...uploadRoomForm.register("price", { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...uploadRoomForm.register("rooms", { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input
                    {...uploadRoomForm.register("toilets", { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea {...uploadRoomForm.register("description", { required: true })} />
              </FormControl>
              <FormControl>
                <Checkbox {...uploadRoomForm.register("pet_friendly")}>Pet friendly?</Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <FormHelperText>What kind of room are you renting?</FormHelperText>
                <Select
                  {...uploadRoomForm.register("kind", { required: true })}
                  placeholder="Choose a kind"
                >
                  <option value="entire_place">Entire Place</option>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  {...uploadRoomForm.register("category", { required: true })}
                  placeholder="Choose a category"
                >
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
                      <Checkbox
                        {...uploadRoomForm.register("amenities", { required: true })}
                        value={e.pk}
                      >
                        {/* 
                        Checkbox value의 default는 체크시 true, 아닐시 false가 전달된다. (pet_friendly)
                        같은 이름(amenities)으로 된 체크박스를 여러개 생성하면 react-hhok-form은 위에서 부터 순서대로 배열에 넣는다.
                        */}
                        {e.name}
                      </Checkbox>
                      <FormHelperText>{e.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              {mutation.isError ? <Text color={"red.500"}>Something went wrong</Text> : null}
              <Button
                isLoading={mutation.isLoading}
                type="submit"
                colorScheme="red"
                size="lg"
                w="100%"
              >
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
