import Productlist from "../Product/Component/Productlist";
import Footer from "../Footer/Footer"
import WhatsApp from "../Whatsapp/Whatsapp";

const Product = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Productlist />
      <WhatsApp />
      <Footer />
    </div>
  )
}

export default Product;
