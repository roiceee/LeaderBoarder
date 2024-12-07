import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
