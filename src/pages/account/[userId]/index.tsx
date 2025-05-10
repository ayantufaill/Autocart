import { useRouter } from "next/router";
import Account from "../index";

const Index = () => {
  const router = useRouter();
  return (
    <>
      {router?.query?.userId && typeof router?.query?.userId === "string" && (
        <Account id={router?.query?.userId} />
      )}
    </>
  );
};

export default Index;
