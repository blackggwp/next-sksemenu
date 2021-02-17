import { useRouter } from 'next/router'
import Home from "../../components/Home";

const Menu: React.FC = () => {
  const router = useRouter()
  const { brandid } = router.query

  return (
    <div>
      {brandid &&
        <Home
          brandid={String(brandid)}
          brandType="menu"
        />
      }
    </div>
  );
}

export default Menu
