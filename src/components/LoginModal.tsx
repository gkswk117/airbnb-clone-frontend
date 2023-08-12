import { useForm } from "react-hook-form";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import UsernameLogin from "./UsernameLogin";

interface kk {
  isLoginOpen: boolean;
  onLoginClose(): void;
}
export default function LoginModal({ isLoginOpen, onLoginClose }: kk) {
  return (
    <Box>
      <Modal onClose={onLoginClose} isOpen={isLoginOpen}>
        {/*onClose: 모달을 닫을때(배경을 클릭할 때) 실행되는 함수, isOpen: isOpen이 true면 modal은 켜지고 false면 꺼진다.*/}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UsernameLogin onLoginClose={onLoginClose} />
            <SocialLogin />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
