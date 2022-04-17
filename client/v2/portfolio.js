let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');;
const selectLowprice = document.querySelector('#lowprice');
const selectSort = document.querySelector('#sort-select');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = result => {
  currentProducts = result;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12, brand="All") => {
  try {
    const response = await fetch(
      `https://clear-fashion-api-jade.vercel.app/products/search?page=${page}&size=${size}&brand=${brand}`
      //?page=${page}&size=${size}&brand=${brand}&price=${price}
    );
    
    const body = await response.json();
    console.log(body)
    return body;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

const filterByPrice = products => {
  let filteredByPrice=[];
  for (let i = 0; i < products.result.length; i++) {
     if(parseInt(products.result[i]['price'])<=50){
        filteredByPrice.push(products.result[i]);
     }
  }
  products.result = filteredByPrice;
  return products;
}

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product._id}>
        <p style="text-align:center;"><img src=${product.photo} alt="" width="500" height="600" class="center"> 
        <br><a href="${product.link}">${product.name}</a>
        <br>${product.brand.toUpperCase()}

        
        <br><span>${product.price} €</span></p>
        
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
 const renderPagination = async (pagination) => {
  const response = await fetch(
    `https://clear-fashion-api-jade.vercel.app/count`
  );
  const body = await response.json();
  const pageCount = pagination.pageSize
  const currentPage = pagination.currentPage
  let options = ""

  for(var i = 0; i < parseInt(body[0]/pageCount); i++){
    options = options.concat('', `<option value="${i+1}">${i+1}</option>`)
  }

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = currentProducts.length;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(products,pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', event => {
  currentPagination.pageSize=parseInt(event.target.value);
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize,currentPagination.currentBrand)
    .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
});
selectPage.addEventListener('change',event=>{
  currentPagination.currentPage=parseInt(event.target.value);
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize,currentPagination.currentBrand)
    .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
})
selectBrand.addEventListener('change',event=>{
  currentPagination.currentBrand=(event.target.value);
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize,currentPagination.currentBrand)
    .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
})


var clickedPrice = true
selectLowprice.addEventListener('click',event=>{
  if(clickedPrice === false){
    fetchProducts(currentPagination.currentPage,currentPagination.pageSize,currentPagination.currentBrand)
      .then(setCurrentProducts)
        .then(() => render(currentProducts, currentPagination));
  }
  else{
    fetchProducts(currentPagination.currentPage,currentPagination.pageSize,currentPagination.currentBrand)
    .then((data) => {return filterByPrice(data);})
        .then(setCurrentProducts)
          .then(() => render(currentProducts, currentPagination));
  }
  clickedPrice = !clickedPrice
})
selectSort.addEventListener('change', event => {
  if(event.target.value==='price-asc'){
    fetchProducts(currentPagination.currentPage,currentPagination.pageSize,currentPagination.currentBrand)
    .then(setCurrentProducts)
      .then(() => render(currentProducts.sort((a, b) => (a.price > b.price) ? 1 : -1), currentPagination));
  }
  else if(event.target.value==='price-desc'){
    fetchProducts(currentPagination.currentPage,currentPagination.pageSize,currentPagination.currentBrand)
    .then(setCurrentProducts)
      .then(() => render(currentProducts.sort((a, b) => (a.price < b.price) ? 1 : -1), currentPagination));
  }
  });
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  await setCurrentProducts(products);
  await render(currentProducts, currentPagination);
});