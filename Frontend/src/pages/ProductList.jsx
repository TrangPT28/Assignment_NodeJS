import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProductList() {
  const [products, setProducts] = useState([]);

  async function getProductList() {
    const { data } = await axios.get("http://localhost:3000/products");
    setProducts(data.products); // detructring res.data giong {data}
  }

  useEffect(() => {
    getProductList();
  }, []);

  async function deleteProduct(id) {
    if (confirm("ban co muon xoa khong?")) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        toast.success("Xoa thanh cong");
        // cap nhat danh sach
        getProductList();
      } catch (error) {
        console.log(error);
        toast.error("Xoa KO thanh cong");
      }
    }
  }
  return (
    <div className="container">
      <h1 className="text-center my-2">ProductList</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price} USD</td>
                <td>
                <img
                  src={product.image}
                  
                  style={{ width: "100px", height: "auto" }}
                />
                </td>
                <td>{product.description}</td>

                <td>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  {/* /product/edit/:id */}
                  <a href={`/product/edit/${product.id}`}>
                    <button className="btn btn-info">Edit</button>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
