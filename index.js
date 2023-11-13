const express = require("express");
const fs = require("fs");
const pug = require("pug");

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (request, response) => {
  //   response.send(`
  //         <body>
  //             <h1 style="background-color:red; margin-top:40px">welcome Vyshnavi </h1>
  //             <marquee>stay tune </marquee>
  //         </body>
  //     `);

  response.render("index");
});

app.get("/products", (request, response) => {
  const data = JSON.parse(fs.readFileSync("mock-data.txt").toString());

  const productsHtml = data.map(
    (item) => `
        <div> 
            <h2>${item.title}</h2>
            <img src=${item.image}  alt="no image found.. />
            <p>${item.description}</p>
            <p>${item.id}</p>
            <h4>${item.price}</h4>
        </div>
  `
  );

  response.render("products", { products: data });
});

// ${productsHtml}

app.get("/products/:id", (request, response) => {
  const data = JSON.parse(fs.readFileSync("mock-data.txt").toString());
  const product = data.find((fl) => fl.id == request.params.id);
  //   response.send(`
  //       <body>
  //           <center><h1>product information </h1></center>
  //           <h2>${product.title}</h2>
  //           <img src=${product.image}  alt="no image found.. />
  //           <p>${product.description}</p>
  //           <h4>${product.price}</h4>
  //     </body>
  //   `);

  response.render("productPage", { itemDetails: product });
});

app.listen(3000, () => {
  console.log("express app is running at localhost:3000 port number");
});
