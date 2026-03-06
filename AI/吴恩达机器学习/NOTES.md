

## 什么是机器学习

## 监督学习（Supervised Learning）

**X(Input) -> Y(Output)** 的算法，监督学习的关键特征是你给学习算法**提供学习的例子**。  

实际应用场景下的 X -> Y

1. 垃圾邮件过滤器：Email -> 是否垃圾邮件
2. 语音识别：音频片段 -> 文本转录
3. 机器翻译：English -> 任意语言
4. 在线广告：广告信息、用户信息 -> 广告点击（产生收入）
5. 汽车自动驾驶：图像、传感器（雷达）-> 输出其它车辆位置
6. 视觉检测：手机产品图片 -> 是否有缺陷

监督学习算法的两大类型：

- **回归算法(Regression)**：房屋面积对应房价预测。
- **分类算法(Classification)**：肿瘤预测。


## 非监督学期（Unsupervised Learning）

使用最为广泛。  
仅有**X(Input)**，没有**Y（Ouput）**。  

被称为无监督意为并不是试图监督算法为每个问题的输入给出某个所谓的正确答案，而是为了让算法自己在这些数据中找出有什么有趣的东西或可能存在的模式或结构。


主要非监督学习算法：

- **聚类算法(Clustering)**：谷歌新闻（相关文章推荐）
- **异常检测**：金融系统的欺诈检测。
- **降维算法**：


## 单变量线性回归 

### 线性回归模型

一些标准化术语

- 训练集（Training set）：用来训练模型的数据集合。
- x：输入变量，也被称为输入特征（小写）。
- y：预测的变量或目标变量（小写）。
- m：训练集的总数（小写）。
- y-hat：y的估计值或预测值（$\hat{y}$）。
- 模型（learning algorithm）：x -> y 的函数。

单变量线性回归函数公式：$f_{w,b}(x) = wx + b$  
w,b: 模型参数 (paramerters) （又叫系数、权重） 
模型参数是在训练中可以调整的变量，以改进模型。

## 代价函数：Cost Function


<img src="./assets/img1.png"/>

*假设函数（Hypothesis Function）表达式；*

$\hat{y}^{(i)} = f_{w,b}(x^{(i)})$  

*线性回归模型可以表示为：*

$f_{w,b}(x^{(i)}) = wx^{(i)} + b$  

寻找参数 $w$ 和 $b$，使得对于所有的训练样本，预测值 $\hat{y}$ 都尽可能地接近真实值 $y$。

*代价函数表达式：*

$$J(w,b) = \frac{1}{2m} \sum_{i=0}^{m-1} (f_{w,b}(x^{(i)}) - y^{(i)})^2$$

衡量模型预测y与y的真实值之间的差异。

线性回归目标：找到尽量小的差异。

$$\underset{w,b}{\text{minimize }} J(w,b)$$

 
### 可视化代价函数

### 阶梯下降

#### 公式 

$$w = w - \alpha \frac{\partial}{\partial w} J(w, b)$$  
$$b = b - \alpha \frac{\partial}{\partial b} J(w, b)$$  

阶梯算法需要同时更新参数w、b

$\alpha $ ：学习率 (Learning rate)，介于0 ～ 1 之间的一个正数，**控制你向下迈步的大小**。  

$\frac{\partial}{\partial w} J(w, b)$：代价函数J的导数项（Derivative)，**告诉你往哪个方向走**。

重复以上公式的更新步骤，直到算法**收敛**。  
**收敛**：达到一个局部最小值点，此时每迈出一步，参数w和b不再有太大变化。  

#### 更新过程：

<img src="./assets/img2.png"/>

#### 学习率

学习率 $\alpha$ 的选择对梯度下降实现的效率有巨大影响。

学习率过小：可以正常工作但效率极低。  
学习率过大：梯度下降可能无法收敛甚至发散，无法工作。

#### 线性回归的梯度下降

线形回归模型函数：$f_{w,b}(x) = wx + b$   

代价函数：$J(w,b) = \frac{1}{2m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})^2$

梯度下降公式：$w = w - \alpha \frac{\partial}{\partial w} J(w, b)$、 $b = b - \alpha \frac{\partial}{\partial b} J(w, b)$

线性回归的`导数`部分，通过微积分推导：

$\frac{\partial}{\partial w} J(w, b)$   $\longrightarrow$   $\frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})x^{(i)}$   

$\frac{\partial}{\partial b} J(w, b)$   $\longrightarrow$   $\frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})$  

线形回归算法的梯度下降公式：

$w = w - \alpha \frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})x^{(i)}$   

$b = b - \alpha \frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})$

线性回归梯度下降的成本函数只有一个**全局最小值**。


## 多类特征

<img src="./assets/img3.png"/>

### 一些新的符号

$x_j$：第j个特征。

$n$：特征的总数。  

$\vec{x}^{(i)}$：第 $i$ 个训练集的所有特征值。

$x^{(i)}_j$： 第 $i$ 个训练样本中第 $j$ 个特征的具体取值。