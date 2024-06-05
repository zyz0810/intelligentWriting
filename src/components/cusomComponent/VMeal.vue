<template>
  <!--套餐页面-->
  <div class="mealBox">
    <div class="topMeal">
      <img class="l-left"
           src='../../assets/app/left_meal.png' />
      <div class="mealFont">超值套餐</div>
      <img class="l-right"
           src='../../assets/app/right_meal.jpg' />
    </div>
    <div class="centerMeal-box">
      <div class="centerMeal">
        <span class="mealPriceFont">套餐价：</span>
        <span class="retailMealPrice">10.00</span>
        <span class="originalMealPrice">19.00</span>
      </div>
      <div class="incrementMealPrice">
        <div class="leftMealDecrement">-</div>
        <input type="number"
               name=""
               id=""
               value="1"
               class="centerMealInput" />
        <div class="rightMealIncrement">+</div>
      </div>
    </div>
    <div class="contentMeal">
      <div class="productMealBox"
           v-for="(item, index) in 4"
           :key="index">
        <!-- <img
          class="productMealPic"
          src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=282156732,749984537&fm=26&gp=0.jpg"
          alt=""
        /> -->
        <div class="productMealPic">
          <span class="el-icon-picture"></span>
        </div>
        <div class="productMealName">商品名称</div>
        <div class="productPriceBox">
          <div class="productMealPack">规格值</div>
        </div>
        <div class="productMealPack">数量值</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propValue: {
      type: [Object, Array],
      require: true,
      default: () => {
        return [
          {
            skuImageUrl: "",
            name: "",
            retailPrice: "",
            marketPrice: "",
            specificationValue: "",
            manufacture: {
              name: "",
            },
            createSupplierName: "",
          },
        ];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.mealBox {
  padding: 10px;
  width: 100%;
}
.centerMeal,
.incrementMealPrice {
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  // font-weight: bold;
}
.leftMealDecrement,
.rightMealIncrement {
  font-size: 18px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #666666;
  text-align: center;
  border-radius: 50%;
  box-sizing: border-box;
}
.centerMealInput {
  width: 35px;
  border: 0px solid #666666;
  padding: 0 2px;
  font-size: 18px;
  outline: none;
  text-align: center;
}
.centerMealInput:focus {
  border: 0px solid #666666;
  border-left: none;
  border-right: none;
  outline: none;
}
.centerMealInput:active {
  border: 0px solid #666666;
  border-left: none;
  border-right: none;
  outline: none;
}
.incrementMealPrice {
  // padding-top: 0px;
}
.mealPriceFont,
.retailMealPrice {
  font-size: 14px;
  color: #000000;
  font-weight: bold;
}
.retailMealPrice {
  color: #e1082d;
  margin-right: 10px;
}
.originalMealPrice {
  text-decoration: line-through;
  color: #999;
}
.originalMealPrice::before {
  content: "实际售价：";
  text-decoration: line-through;
}
.topMeal {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 10px;
  }
  .l-left {
    // display: inline-block;
    // overflow: hidden;
    // position: relative;
    // width: 50px;
    // height: 10px;
  }
  .l-right {
    // display: block;
    // position: absolute;
    // top: 0;
    // left: 0;
    // opacity: 0;
  }
}
.mealBackColor {
  background-color: #ffd97f;
  display: inline-block;
  border-radius: 2px;
}
.mealFont {
  text-align: center;
  padding: 9px;
  font-size: 19px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #730ffc;
}
.contentMeal {
  display: flex;
  overflow-x: hidden;
}
.productMealBox {
  width: 80px;
  margin-right: 15px;
  width: 80px;
  margin-right: 15px;
  background: white;
  box-shadow: 0px 0px 5px #999;
  padding: 0px 10px 10px 10px;
  border-radius: 5px;
}
.productMealPic {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    height: 80px;
    font-size: 70px;
    color: #b9b9b9;
    margin-top: 10px;
  }
}
.productPriceBox {
  display: flex;
  justify-content: space-between;
  line-height: 24px;
}
.productMealName {
  font-size: 14px;
  font-weight: bold;
  line-height: 14px;
}
.productMealSpecification,
.productMealPack {
  color: #999;
  padding-right: 10px;
}
.centerMeal-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>