import { useRouter } from "next/router";
import Followings from "../index";

const Index = () => {
  const router = useRouter();
  return (
    router.query?.userId &&
    typeof router.query?.userId === "string" && (
      <Followings userId={router.query?.userId} />
    )
  );
};

export default Index;
