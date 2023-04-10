
// //import routes
const categoryRoute = require("./src/category/category.route");
const productRoute = require("./src/product/product.route");
const authRoute = require("./src/auth/auth.route");
const orderRoute = require("./src/order/order.route");
const postRouter = require("./src/posts/post.router");
const userRoute = require("./src/users/user.route");


module.exports.useRoutes = (app) => {
    // //use routes
    app.use("/category", categoryRoute);
    app.use("/product", productRoute);
    app.use("/user", userRoute);
    app.use("/auth", authRoute);
    app.use("/order", orderRoute);
    app.use("/post", postRouter);
}
