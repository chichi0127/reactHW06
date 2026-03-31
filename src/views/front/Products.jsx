import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from '../../components/Pagination';
import { Link, useNavigate } from "react-router";


const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;

function Products() {

    const BPtoken = document.cookie
        .replace(/(?:(?:^|.*;\s*)BPToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    

    const goPage = async (pageLocation) => {

        try {
            const res = await axios.get(`${apiBase}v2/api/${apiPath}/admin/products?page=${pageLocation}`, {
                headers: {
                    Authorization: BPtoken
                }
            });
            console.log("前往頁面:", res);
            setProducts(res.data.products);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error("前往頁面時發生錯誤:", error);
        }

    };

    useEffect(() => {
        const customerProduct = async () => {
            try {
                const res = await axios.get(`${apiBase}v2/api/${apiPath}/products`);
                console.log(res.data);
                setProducts(res.data.products);
                setPagination(res.data.pagination);
            } catch (error) {
                console.log(error);
            }
        };
        customerProduct();
    }
        , [])

    return (
        <>
            <div className="bg-color">
                <h2 className="text-center fw-semibold pt-3 text-light">產品列表頁</h2>
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        products && products.map(product => {
                            return (
                                <div key={product.id} className="card text-center mx-3 my-2" style={{ width: "18rem" }}>
                                    <div className="card-header">
                                        {product.category}
                                    </div>
                                    <img src={product.imageUrl} className="card-img-top" alt={product.title}></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text" style={{ height: "120px" }}>{product.description}</p>
                                        <Link to={`/product/${product.id}`} className="btn btn-primary">詳細資訊</Link>
                                    </div>
                                    <div className="card-footer text-body-secondary">
                                        {product.publish_date}發行
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Pagination pagination={pagination} goPage={goPage} />
            </div>


        </>
    )
}

export default Products;