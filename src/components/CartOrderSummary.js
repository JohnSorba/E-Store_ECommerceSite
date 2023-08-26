function CartOrderSummary({ selectedItems, totalQuantity }) {
  return (
    <>
      <h1 className="text-xl font-semibold">
        {totalQuantity > 1 ? (
          <span>Order Summary ({totalQuantity} Items) </span>
        ) : (
          <span>Order Summary ({totalQuantity} Item) </span>
        )}
      </h1>
      <div className="flex flex-col gap-4">
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-3 gap-4 border-b pb-4 text-sm"
          >
            <img src={item.image} alt={item.title} className="w-24 h-24" />
            <div className="col-span-2 flex flex-col gap-y-1">
              <p>
                ${" "}
                <span className="text-lg font-semibold italic  text-gray-500">
                  {item.price}
                </span>
              </p>
              <p className="font-semibold">{item.title}</p>

              {item.quantity > 1 ? (
                <p>
                  <span className="text-lg font-semibold italic  text-gray-500">
                    {item.quantity}
                  </span>{" "}
                  Items Added
                </p>
              ) : (
                <p>
                  <span className="text-lg font-semibold italic  text-gray-500">
                    {item.quantity}
                  </span>{" "}
                  Item Added
                </p>
              )}
              <p>
                Subtotal: $
                <span className="text-lg font-semibold italic  text-gray-500">
                  {" "}
                  {item.subtotal.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CartOrderSummary;
