export const useHandleCart = ({
    setLoading,
    navigate,
    user,
    createOrUpdateCart,
    cartProducts,
    toast,
    dispatch
}) => {
    let items = [];
    let filteredItems = '';
    let index = '';
    let itemIndex = '';

    const handleAddProduct = (obj) => {
        setLoading(true);
        if (user) {
            const { product, count, orderFrom } = obj;
            items = cartProducts || items || [];
            let arr = {
                cuisineId: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                count: Number(count),
                images: product.images
            };
            itemIndex = items && items?.findIndex(item => item.orderFrom.email === orderFrom.email);
            if (itemIndex !== -1) {
                index = items[itemIndex]?.cuisines?.findIndex(item => item.cuisineId === arr?.cuisineId);
                if (index !== -1) {
                    if (Number(items[itemIndex]?.cuisines[index]?.count) === Number(arr?.count)) {
                        toast.error('Product exist in the cart');
                        setLoading(false);
                    } else {
                        items[itemIndex].cuisines[index].count = Number(arr.count);
                        handleCartCommon();
                    }
                } else {
                    items[itemIndex]?.cuisines?.push(arr);
                    handleCartCommon();
                }
            } else {
                items.push({
                    cuisines: [arr],
                    orderFrom,
                    assignedTo: ''
                })
                handleCartCommon();
            }
        } else {
            setLoading(false);
            toast.error('Please login/resgister to add items to the cart');
            navigate('/login');
        }
    }

    const handleCartCommon = () => {
        let cartTotal = 0;
        let cartQuantity = 0;
        items?.map(item => {
            item.cuisines.map(cuisine => {
                cartTotal = cartTotal + Number(cuisine?.count) * Number(cuisine?.price);
                cartQuantity = cartQuantity + Number(cuisine.count);
            })
        })
        let shipping = (cartTotal * 0.05).toFixed(2);
        createOrUpdateCart(user.token, { items, shipping, cartTotal, cartQuantity, totalAfterDiscount: 100, orderdBy: { name: user?.firstName?.concat(' ', user?.lastName), email: user.email }})
            .then(res => {
                if (res.status === 200) {
                    items = res.data.cart.products;
                    dispatch({
                        type: 'CART',
                        payload: res.data.cart
                    });
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error);
            })
    }

    const handleDeleteProduct = ({ product, orderFrom }) => {
        setLoading(true);
        items = cartProducts || items;
        itemIndex = items && items.findIndex(item => item.orderFrom.email === orderFrom?.email);
        if (itemIndex !== -1) {
            filteredItems = items[itemIndex].cuisines.filter(item => item.cuisineId !== product.cuisineId);
            if (filteredItems?.length > 0) {
                items[itemIndex] = {
                    cuisines: filteredItems,
                    orderFrom: orderFrom
                }
                handleCartCommon();
            } else {
                items?.splice(itemIndex, 1);
                handleCartCommon();
            }
        } else {
            toast.error('Something went wrong..!');
            setLoading(false);
        }
    }

    return ({
        handleAddProduct,
        handleDeleteProduct
    })
}
