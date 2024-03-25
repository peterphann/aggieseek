import Button from "../components/Button";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="text-center">
        <Link to="/signin">
          <Button>Get started</Button>
        </Link>
      </div>

    </div>

  );
}

export default Home;