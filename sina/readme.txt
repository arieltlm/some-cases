这是一个仿新浪微博页面的布局练习。

<!-- 此次布局总结：
1、先写出rest的css样式，多使用挂式组合，少用继承。so——我建了一个cssRest.css，然后在其中写出common的样式，直接在class后面挂，不用重复写此代码。
2、a的颜色，必须通过a{color:red;}来设置，设置其上层元素的css样式不行
3、li后面的分隔符以及像是hr元素实现的线都可以使用，块状元素的border-right或者border-bottom:1px solid #ccc;来实现。实际上我是直接用hr元素来实现的，只是在html中增加了代码。或者使用伪元素：after和content:"|",此时就需要设置margin-left了，如果刚巧使用flex布局，其数值就不是很好的把握准确了。
4、在文字前面出现的小图标，我使用的伪元素：before和content，然后在其后使用background。如果有上下对不齐的现象，我们可以使用position：relative；结合top来调整。还有就是可以不使用伪元素，而是直接给li背景图，而注意padding-left设出图片的宽度。
5、遇到这种大块大块的布局的话，首先布局好大块，再来小细节，一定要注意浮动的问题，wrapper中的所有子块都浮动后，都处于浮动层了，下一个内容就上去了。所以注意设置高度和清除浮动。最好一点就是使用flex布局，这个布局还是好用，把稳。
6、注意盒子的宽度不是设置的width还要加上padding。所以设置时注意600=570+15*2;width=570px;padding=15px;
7、同时要实现左浮和右浮时，最好在外面包裹一个div。
8、.item .item_option:before,
.item .item_option:after {
  display: table;
  content: "";
  line-height: 0;
}
.item .item_option:after {
  clear: both;
}学习老师编写的代码，这句——————————似乎实现的是上下居中。
9、css中我一直在考虑写一个样式时，前面应该兼顾上几个上级class，看老师写的应该两级就够了。
10、相对比老师写的自己的语义化还是差一些，比如在微博正文处，老师使用的是dl、dt、dd这样正好和微博的样式符合，使用的挺好。还有加重的数字，使用strong包裹起来。
 -->