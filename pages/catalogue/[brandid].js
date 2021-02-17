import { useRouter } from 'next/router'
import Home from "../../components/Home";

export default function Catalogue() {
  const router = useRouter()
  const { brandid } = router.query

  return (
    <div>
      {brandid &&
        <Home
          brandid={brandid}
          brandType="catalogue"
        />
      }
    </div>
  );
}
