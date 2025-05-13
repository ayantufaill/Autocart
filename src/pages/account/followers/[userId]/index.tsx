import { useRouter } from "next/router";
import Followers from "../index";

const Index = () => {
  const router = useRouter();
  return (
    router.query?.userId &&
    typeof router.query?.userId === "string" && (
      <Followers userId={router.query?.userId} />
    )
  );
};

export default Index;
