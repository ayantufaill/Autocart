import { useParams } from "next/navigation";
import PlaceAd from "../../place-ad";
import { useEffect, useState } from "react";

const Index = () => {
  const [id, setId] = useState<string | null>(null);
  const param = useParams();
  useEffect(() => {
    if (param?.adId && typeof param?.adId === "string") {
      setId(param?.adId);
    }
  }, [param?.adId]);

  return id && <PlaceAd id={id} />;
};

export default Index;
