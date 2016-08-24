# m-picker

---

模拟ios原生select的选择器    
用户需要选择操作时，在手机下方弹出选择器

## 何时使用
分为
－单值选择器
－多值选择器：
	－需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
	－从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。


```html
<Picker {...opt1} placeholder="picker 选择1" />
```

## API

选择器容器`<Picker>`的属性说明如下：

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| onOpen    |打开选择器回调 |Function  |  noop  |
| onChange | 选择器的值改变的回调 | Function | noop |
| onClose    | 关闭选择器回调 | Function |  noop  |
| toolbar    | 是否显示toolbar | boolean   |  false  |
| toolbarTitle    | toolbar的标题 | String或DOM   |  ''  |
| showSubmitBtn    | 是否显示确认按钮| boolean   |  true  |
| showClearBtn    | 是否显示清除按钮 | boolean   |  false  |
| formatValue    | 格式化cols中values和displayValues的方法 | Function  |  noop  |
| cols    | 配置选择器的部分属性 |  Array&lt;object&gt; | `{}` |
| cols[i].classNames | 选项列表的className | string | '' |
| cols[i].textAlign | 选项列表的对齐方式，可选值有'left', 'right', 'center' | string | 'center' |
| cols[i].values | 选项列表的值 | Array&lt;string&gt; | `[]` |
| cols[i].displayValue | 选项列表的显示值（如果有的话） | Array&lt;string&gt; | undefined |



````jsx
import { Input,Picker,FormItem } from '@ali/msui-react';
const opt1 = {
    cols: [{
        values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
    }]
}
ReactDOM.render(
    <div>
        <h4>单个值的picker</h4>
        <FormItem>
            <Picker {...opt1} placeholder="picker选择1" />
        </FormItem>
    </div>
, document.getElementById('container'));
````

通过设置`toolbar`和`toolbarTitle`来修改toolbar的显隐和文案。

通过设置`showClearBtn`和`showSubmitBtn`来控制确认和取消按钮的显隐。

---

```jsx
import { Input,Picker,FormItem } from '@ali/msui-react';
const opt2 = {
    toolbar: true,
    toolbarTitle: '请选择设备',
    cols: [{
        textAlign: 'center',
        values: ['iPhone 4', 'iPhone 4S', ...., 'iPad mini 3'],
        displayValues: ['苹果4', '苹果4S', ...., '艾派mini3'],
        className: 'picker-items-col-normal'
    }],
    defaultValue: ['iPhone 5S']
}
ReactDOM.render(
    <div>
        <h3>显示toolbar的picker</h3>
        <FormItem>
            <Picker {...opt2} placeholder="picker 选择1" />
        </FormItem>
    </div>
, document.getElementById('container'));
```

多列选项的picker

---

````jsx
import { Input,Picker,FormItem } from '@ali/msui-react';
const opt3 = {
    toolbar: true,
    toolbarTitle: '请选择姓名',
    showClearBtn: true,
    cols: [{
        values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
    },
    {
        values: ['杰伦', '磊', '明', '小鹏', '燕姿', '菲菲', 'Baby']
    },
    {
        values: ['先生', '小姐']
    }],
    defaultValue: ['孙', '燕姿', '小姐'],
    onClose: function() {
        console.log('closed')
    },
    onChange: function (picker, values, displayValues) {
        console.log(values, displayValues)
    }
}
  
ReactDOM.render(
    <div>
        <h3>多个值的picker</h3>
        <FormItem>
            <Picker {...opt3} placeholder="picker 选择2" />
        </FormItem>
    </div>
, document.getElementById('container'));
````

