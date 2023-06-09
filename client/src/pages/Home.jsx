import PopulatProducts from "../components/layout/PopulatProducts";
import ToastContainers from "../utils/params_toast";
// import PopulatCategory from "../components/layout/PopularCategory";

const Home = () => {
  return (
    <>
      <PopulatProducts />

      <ToastContainers />
      {/* убрал блок, потому что нет подходящих изображения под категории */}
      {/* <PopulatCategory /> */}
    </>
  );
};

export default Home;
