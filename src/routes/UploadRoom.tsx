import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
  // useUser를 만들었던것 처럼 useHostOnlyPage hook을 만들어서 사용할 수 있다.
  // 궁금하면 nico commit 따로 확인해보기.
  // https://github.com/nomadcoders/airbnb-clone-frontend/commit/4411fc86e29f17bfa64db6be49e3fe023bed8ae5
  // 나는 개인적으로 hook으로 사용하는게 더 좋아보임.
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <h1>upload room</h1>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
