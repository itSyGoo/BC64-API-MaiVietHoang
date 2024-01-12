function turnOnLoading() {
  document.getElementById("spinner").style.display = "block";
}
function turnOffLoading() {
  document.getElementById("spinner").style.display = "none";
}
function resetForm() {
  var reset = document.querySelectorAll("input");
  for (i = 0; i < reset.length; i++) {
    reset[i].value = "";
  }
}

idFake = null;
function renderProducts(productArray) {
  content = "";
  for (var i = productArray.length - 1; i >= 0; i--) {
    var product = productArray[i];
    var tbProduct = `
    <tr>
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.img}</td>
    <td>${product.desc}</td>
    <td>
    <button onclick ="deleteProduct(${product.id})" class="btn btn-danger">Delete</button>
    <button onclick ="editProduct(${product.id})" class="btn btn-warning">Edit</button>
    </td>
    </tr>
    `;
    content = content + tbProduct;
  }
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

function fetchProductList() {
  turnOnLoading();
  axios({
    url: "https://6597f7c2668d248edf23d046.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      console.log("res", res.data);
      renderProducts(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
}

fetchProductList();

function deleteProduct(id) {
  turnOnLoading();
  axios({
    url: `https://6597f7c2668d248edf23d046.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      console.log("res", res);
      fetchProductList();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
}

function createProduct() {
  turnOnLoading();
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;
  var moTaSp = document.getElementById("MoTaSP").value;
  var sp = {
    name: tenSp,
    price: giaSp,
    img: hinhSp,
    desc: moTaSp,
  };
  console.log("createProduct", sp);
  axios({
    url: "https://6597f7c2668d248edf23d046.mockapi.io/product",
    method: "POST",
    data: sp,
  })
    .then(function (res) {
      console.log("res", res);
      fetchProductList(res.data);
      $("#myModal").modal("hide");
      resetForm();
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
}

function editProduct(id) {
  turnOnLoading();
  idFake = id;
  axios({
    url: `https://6597f7c2668d248edf23d046.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log("res", res.data);
      $("#myModal").modal("show");
      var sp = res.data;
      document.getElementById("TenSP").value = sp.name;
      document.getElementById("GiaSP").value = sp.price;
      document.getElementById("HinhSP").value = sp.img;
      document.getElementById("MoTaSP").value = sp.desc;
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
}

function updateProduct() {
  turnOnLoading();
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;
  var moTaSp = document.getElementById("MoTaSP").value;
  var sp = {
    name: tenSp,
    price: giaSp,
    img: hinhSp,
    desc: moTaSp,
  };
  axios({
    url: `https://6597f7c2668d248edf23d046.mockapi.io/product/${idFake}`,
    method: "PUT",
    data: sp,
  })
    .then(function (res) {
      console.log("res", res.data);
      $("#myModal").modal("hide");
      fetchProductList();
      resetForm();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
}
