import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;


function Cart() {
    const BPtoken = document.cookie
        .replace(/(?:(?:^|.*;\s*)BPToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    // 解釋這個ID哪來的
    const { id } = useParams();
    const [cartList, setCartList] = useState();
    const dataCart = {
        "product_id": id,
        "qty": 1
    };

    const getCart = async () => {
        try {
            const res = await axios.get(`${apiBase}v2/api/${apiPath}/cart`, {
                headers: {
                    Authorization: BPtoken
                }
            });
            console.log("數據", res.data.data.carts);
            setCartList(res.data.data.carts)
        } catch (error) {
            console.error(error);
        }
    };
    // 把這三個功能做完
    const addOne = async () => {
        try {
            const res = await axios.post(`${apiBase}v2/api/${apiPath}/cart`, { data: dataCart });
            console.log(res);
            navigator("/cart");
        } catch (error) {
            console.log(error);
        }
    }

    const deleteOne = async () => {
        try {
            const res = await axios.post(`${apiBase}v2/api/${apiPath}/cart`, { data: dataCart });
            console.log(res);
            navigator("/cart");
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async () => {
        try {
            const res = await axios.post(`${apiBase}v2/api/${apiPath}/cart`, { data: dataCart });
            console.log(res);
            navigator("/cart");
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            <div className="bg-color">
                <h2 className="text-center fw-semibold pt-3 text-light pb-3">購物車頁</h2>

                {
                    cartList && cartList.map(carts => {
                        const cart = carts.product
                        return (<>
                            <div className="px-5 pb-3 " key={cart.id} >
                                <div className="container shadow bg-primary rounded-2 px-5 py-2 " data-bs-toggle="collapse" data-bs-target={`#${cart.id}`} aria-expanded="false" aria-controls={cart.id}>
                                    <div className="row">
                                        <div className="col-11 d-flex justify-content-between align-items-center">
                                            <h5 className="card-title text-light fw-semibold">{cart.title}</h5>
                                            <div className="card-title text-light d-flex justify-content-evenly align-items-center ">
                                                <h5 className="card-title text-light fw-semibold">類別:</h5>
                                                <h5 className="card-title text-light fw-semibold px-2">{cart.category}</h5>
                                            </div>
                                            <div className="card-title text-light d-flex justify-content-evenly align-items-center ">
                                                <h5 className="card-title text-light fw-semibold">金額:</h5>
                                                <h5 className="card-title text-light fw-semibold px-2">{cart.price}</h5>
                                            </div>
                                            <div className="card-title text-light d-flex justify-content-evenly align-items-center ">
                                                <h5 className="fw-semibold d-inline mb-0">購買數量:</h5>
                                                <button className="btn fw-bold" type="button" onClick={deleteOne}>-</button>
                                                <h5 className="card-title text-light fw-semibold">{carts.qty}</h5>
                                                <button className="btn fw-bold" type="button" onClick={addOne}>+</button>

                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <button className="btn fw-bold btn-danger" type="button" onClick={deleteItem}>刪除</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="collapse  pt-3" id={cart.id}>
                                    <div className="card card-body">
                                        <div className="row">
                                            <img src={cart.imageUrl} className="w-25 col-6" alt={cart.title}></img>
                                            <div className="col-6">
                                                <h5 className="card-title">{cart.title}</h5>
                                                <p className="card-text">{cart.description}</p>
                                                <p className="card-text">{cart.content}</p>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item"><p className="card-text">人物小卡：<span className='fw-semibold'>{cart.card_person}</span></p></li>
                                                    <li className="list-group-item">
                                                        <p className="card-text">原價：<span className='text-decoration-line-through'>{cart.origin_price}</span></p></li>
                                                    <li className="list-group-item"><p className="card-text fs-5">售價：<span className='text-danger fw-semibold'>{cart.price}</span></p></li>
                                                    <li className="list-group-item"><p className="card-text">剩餘數量：<span className='text-warning'>{cart.unit}</span></p></li>
                                                </ul>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </>)
                    })
                }



            </div>
        </>
    )
}

export default Cart;