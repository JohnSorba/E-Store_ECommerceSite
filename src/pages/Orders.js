import { useState, useEffect } from "react";
import { ref, get, remove } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../components/AuthContext";

function Orders() {
  const { currentUser } = useAuth();
  const [order, setOrder] = useState([]);
  const userUid = currentUser?.uid;

  console.log(order);

  const getOrderData = async (userId) => {
    try {
      const orderRef = ref(db, `orders/${userId}`);
      const snapshot = await get(orderRef);

      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.log("Error fetching Order data: ", error.message);
      return null;
    }
  };

  useEffect(() => {
    // Code to run on component mount
    const fetchOrder = async () => {
      const data = await getOrderData(userUid);
      if (data) {
        const orders = Object.values(data);
        setOrder(orders);
      }
    };

    fetchOrder();
  }, []);

  // REMOVE FROM CART
  const deleteOrderItem = (item) => {
    const itemRef = ref(db, `orders/${userUid}/${item.orderId}`);
    remove(itemRef)
      .then(() => {
        setOrder((prevOrder) =>
          prevOrder.filter((order) => order.orderId !== item.orderId)
        );
      })
      .catch((error) => {
        console.log("Error deleting item from database: ", error);
      });
  };

  return (
    <div>
      <h1 className="text-5xl text-center py-8 border-b-2">
        Your Recent Orders
      </h1>
      <div className="orders-section">
        <h1 className="text-3xl mb-4">Orders</h1>{" "}
        <ul className="max-w-3xl mx-auto">
          {order.map((item) => (
            <li
              key={item.orderId}
              item={item}
              className="mb-8 text-left border-4 shadow-lg rounded-3xl text-sm"
            >
              <article className="grid grid-cols-3 gap-y-4 gap-x-8 bg-gray-100 px-8 py-4 rounded-t-3xl">
                <p>
                  Order Date: <br />
                  {item.orderDate}
                </p>
                <p>
                  Total: <br />$ {item.total}
                </p>
                <p>
                  Order #: <br />
                  {item.orderId}
                </p>
                <p>
                  Delivery Address: <br />
                  {item.address}
                </p>
                <p>
                  Ship to: <br />
                  {item.name}
                </p>
                <p>
                  Payment type: <br />
                  {item.paymentOption}
                </p>
              </article>
              <ul className="grid grid-cols-6">
                {item.items?.map((item) => (
                  <>
                    <li
                      key={item.id}
                      item={item}
                      className="grid grid-cols-8 gap-8 px-8 py-2 border rounded-xl m-2 col-span-5"
                    >
                      <img
                        src={item.image}
                        alt="An image"
                        className="col-span-2 h-32 w-32"
                      />
                      <div className="flex flex-col gap-4 col-span-5">
                        <span className="text-lg font-semibold">
                          {item.title}
                        </span>
                        <span className="text-gray-500">
                          {item.description}
                        </span>
                        <span className="font-semibold">
                          Qty:{" "}
                          <span className="text-lg mt-auto">
                            {item.quantity}
                          </span>
                        </span>
                      </div>
                      <span className=" col-span-1 justify-self-end self-end">
                        $
                        <span className="text-3xl font-semibold">
                          {item.price * item?.quantity || item.price}
                        </span>
                      </span>{" "}
                    </li>{" "}
                  </>
                ))}
                <div className="self-start">
                  <button onClick={() => deleteOrderItem(item)}>Delete</button>
                </div>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Orders;
