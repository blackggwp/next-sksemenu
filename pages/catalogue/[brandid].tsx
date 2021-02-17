import { useRouter } from 'next/router'
import Home from "../../components/Home";

const Catalogue: React.FC = () => {
  const router = useRouter()
  const { brandid } = router.query

  return (
    <div>
      {brandid &&
        <Home
          brandid={String(brandid)}
          brandType="catalogue"
        />
      }
    </div>
  );
}

export default Catalogue
