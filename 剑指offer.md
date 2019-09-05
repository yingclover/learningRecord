---
title: '剑指offer'
date: 2019-04-05 09:18:36
tags: 剑指Offer
---

**目录**

[TOC]

#### 1.



#### 2.

```c++

```





#### 连续子数组的最大值

{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。给一个数组，返回它的最大连续子序列的和，你会不会被他忽悠住？(子向量的长度至少是1)

分析：当前元素大于连续子数组和加上元素本身并且最大值比元素还小时抛弃前面的连续子数组，重新开始计算连续数组和。

```c++
    int FindGreatestSumOfSubArray(vector<int> array) {
        if(array.size()<=0)
            return 0;
        int cur=array[0];
        int m=cur;//注意初始值不能设为0 防止只有负数
        for(int i=1;i<array.size();i++){
            if(cur<0)
                cur=0;
            cur+=array[i];
            m=max(m,cur);
        }
    return m;
    }
```

```javascript
function FindGreatestSumOfSubArray(array)
{
    // write code here
    if(array.length<0)
        return 0;
    var cur=array[0];
    var m=cur;
    for(var i=1;i<array.length;i++){
        if(cur<0)
            cur=0;
        cur=cur+array[i];
        m=(m>cur)?m:cur;
    }
    return m;
}
```



#### 3.数字中重复的数字

在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2。

```c++
//解题思路：从头到尾依次扫描数组中的数字，当扫描到下标为i的数字时，首先比较这个数字（假设为tmp）是不是等于i，如果是就接着扫描下一个数字，如果不是，则拿它同第tmp个数字进行比较，如果它和第tmp个数字相等，就找到了第一个重复的数字。
//注意：判断输入是否为空，且数字大小是否大于等于0，小于n
class Solution {
public:
     bool duplicate(int numbers[], int length, int* duplication) {
        int i,tmp;
        if(!numbers[0])
        {
            return false;
        }
        for(i=0;i<length;i++)
        {
            while(numbers[i]!=i&&numbers[i]<length&&numbers[i]>=0)
            {
                tmp=numbers[i];
                if(numbers[tmp]==numbers[i])
                {
                    *duplication=numbers[i];
                     return true;
                } 
                numbers[i]=numbers[tmp];
                numbers[tmp]=tmp;

            }

        }
        return false;
    }
};
```

#### 4.二维数组中的查找

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```c++
class Solution {
public:
        bool Find(int target, vector<vector<int> > array) {
        int i,j=0;
        int row=array.size();//注意：这里二维数组没说是n×n
        int col=array[0].size();//计算列数
        i=row-1;
        bool result=false;
        while(i>=0&&j<col)
        {
            if(array[i][j]<target)
                j++;
            else if(array[i][j]==target)
            {
                 result= true;
                 break;
            }
            else
                i--;
        }
        return result;
    }
};
```

#### 5.替换空格

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

```c++
public class Solution {
    public String replaceSpace(StringBuffer str) {
        StringBuffer out=new StringBuffer();
        for (int i = 0; i < str.toString().length(); i++) {
            char b=str.charAt(i);
            if(String.valueOf(b).equals(" ")){
                out.append("%20");
            }else{
                out.append(b);
            }
        }
        return out.toString();     
    }
}
```

#### 6.从尾到头打印链表

输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。

c++实现

``` c++
//方案一：遍历链表，将值存到容器vector中，然后将容器里面值逆转
class Solution
{
public:
    vector<int> printListFromTailToHead(ListNode* head)
    {
        vector<int> value;//容器定义
        ListNode *p=NULL;
        P=head;
        while(p!=NULL)
        {
            value.push_back(p->val);//尾部增加一个值
            p=p->next;
        }
        int temp=0;
        int i=0,j=value.size()-1;//size(方法)
        while(i<j)
        {
            temp=value[i];
            value[i]=value[j];
            value[j]=temp;
            i++;
            j--;        
        }
        return value; 
    }
};
//方案二：利用栈先入后出
class Solution
{
public:
    vector<int> printListFromTailToHead(ListNode* head)
    {
        vector<int> value;
        ListNode *p=NULL;
        P=head;
        stack<int> stk;//栈定义
        while(p!=NULL)
        {
            stk.push(p->val);
            p=p->next;
        }
        while(!stk.empty())
        {
            value.push_back(stk.top())l
            stk.pop();
        }
        return value; 
    }
};
//方案三：利用递归
class Solution
{
public:
    vector<int> printListFromTailToHead(ListNode* head)
    {
        vector<int> value;
        ListNode *p=NULL;
        P=head;
        if(p!=NULL)
        {
            if(p->next!=NULL)
                printListFromTailToHead(p->next);//递归思路
            value.push_back(p->val);
        }
        return value; 
    }
};
```

#### 7.重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

```c++
/**
 
     * Definition for binary tree
 
     * struct TreeNode {
 
     *     int val;
 
     *     TreeNode *left;
 
     *     TreeNode *right;
 
     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 
     * };
 
     */
 
    class Solution {
 
    public:
 
        struct TreeNode* reConstructBinaryTree(vector<int> pre,vector<int> in) {
 
            int inlen=in.size();
 
            if(inlen==0)
 
                return NULL;
 
            vector<int> left_pre,right_pre,left_in,right_in;
 
            //创建根节点，根节点肯定是前序遍历的第一个数
 
            TreeNode* head=new TreeNode(pre[0]);
 
            //找到中序遍历根节点所在位置,存放于变量gen中
 
            int gen=0;
 
            for(int i=0;i<inlen;i++)
 
            {
 
                if (in[i]==pre[0])
 
                {
 
                    gen=i;
 
                    break;
 
                }
 
            }
 
            //对于中序遍历，根节点左边的节点位于二叉树的左边，根节点右边的节点位于二叉树的右边
 
            //利用上述这点，对二叉树节点进行归并
 
            for(int i=0;i<gen;i++)
 
            {
 
                left_in.push_back(in[i]);
 
                left_pre.push_back(pre[i+1]);//前序第一个为根节点
 
            }
 
            for(int i=gen+1;i<inlen;i++)
 
            {
 
                right_in.push_back(in[i]);
 
                right_pre.push_back(pre[i]);
 
            }
 
            //和shell排序的思想类似，取出前序和中序遍历根节点左边和右边的子树
 
            //递归，再对其进行上述所有步骤，即再区分子树的左、右子子数，直到叶节点
 
           head->left=reConstructBinaryTree(left_pre,left_in);
 
           head->right=reConstructBinaryTree(right_pre,right_in);
 
           return head;
 
        }
 
    };
 
```

#### 8.二叉树的下一个节点 

给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

分析：有3种情况

1.当该节点有右子树，那么它的下一个节点是它的右子树的最左节点

2.当该节点是它父节点的左子节点，那么它的下一个节点就是它的父节点

3.当该节点没有右子树，并且是其父节点的右子节点，那么它的下一个节点是沿着父节点的指针一直向上遍历，直到找到一个是它父节点的左子节点的节点，这个有左节点的父节点就是我们需要的节点

```c++
TreeLinkNode* GetNext(TreeLinkNode* pNode)
    {
        if(pNode==nullptr)
            return nullptr;
        TreeLinkNode* next=nullptr;
    //情况1
        if(pNode->right!=nullptr){
            TreeLinkNode* pRight=pNode->right;
            while(pRight->left!=nullptr)
                pRight=pRight->left;
            next=pRight;
        }
    //情况2，3
        else if(pNode->next!=nullptr){
            TreeLinkNode* parentNode=pNode->next;
            TreeLinkNode* currentNode=pNode;
            while(parentNode!=nullptr&&parentNode->right==currentNode){
                currentNode=parentNode;
                parentNode=parentNode->next;
            }
            next=parentNode;
        }
        return next;
    }
```



#### 9.用两个栈实现队列

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型

```c++
//思想：当栈2不为空时，在栈2栈顶的元素是最先进入队列的元素，可以弹出，当栈2为空时，我们可以逐个将栈1中的元素弹出并压入栈2。由于先进入队列的元素被压到栈1的底部，经过弹出操作之后就处于栈2的顶端，所以可以直接弹出。
class Solution
{
public:
 void push(int node) {
        stack1.push(node);
    }

       int pop() {
        int head;
        if(stack2.empty())
        {
            while(!stack1.empty())
            {
                int data=stack1.top();
                stack1.pop();
                stack2.push(data);
            }
        }
        head=stack2.top();
        stack2.pop();
        return head;
    }

private:
    stack<int> stack1;
    stack<int> stack2;
};
```

#### 10.斐波那契数列

大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。

n<=39

```javascript
function Fibonacci(n)
{
    if(n<=1)
        return n;
    else{
        var a=0,b=1;
        for(var i=2;i<=n;i++){
            c=a+b;
            a=b;
            b=c;
        }
        return c;
    }
}
```

##### 跳台阶

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

分析：

1.假设当有n个台阶时假设有f(n)种走法。 

2.青蛙最后一步要么跨1个台阶要么跨2个台阶。   

3.当最后一步跨1个台阶时即之前有n-1个台阶，根据1的假设即n-1个台阶有f(n-1)种走法。 

4.当最后一步跨2个台阶时即之前有n-2个台阶，根据1的假设即n-2个台阶有f(n-2   )种走法。 

5.显然n个台阶的走法等于前两种情况的走法之和即f(n)=f(n-1)+f(n-2)。 

6.找出递推公式后要找公式出口，即当n为1、2时的情况，显然n=1时f(1)等于1，f(2)等于2

故此题就是斐波那契数列:f(1)=1,f(2)=2,f(3)=3,...,f(n)=f(n-1)+f(n-2).

```js
function jumpFloor(number)
{
    if (number < 2) {
        return 1
    }
    var arr = [1, 1]
    for (var i = 2; i <= number; i ++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[number]
}
```

##### 变态跳台阶

一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

分析：f(n)=f(n-1)+f(n-2)+f(n-3)+...+f(1)=f(n-1)+f(n-1)=2*f(n-1)

```javascript
function jumpFloorII(number)
{
    // write code here
    if(number<2)
        return 1;
    else
        return 2*jumpFloorII(number-1);
}
```

##### 矩形覆盖

我们可以用2\*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2\*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

分析：依旧是斐波那契数列，f(n)=f(n-1)+?。发现？处，即f(n-2)只有一种水平放法（两个叠在一起），竖排并列在f(n-1)中已经算过了，所以f(n)=f(n-1)+f(n-2)，依旧是斐波那契数列问题。

```javascript
function rectCover(number)
{
   if (number < 2) {
        return number;
    }
    var arr = [1, 1]
    for (var i = 2; i <= number; i ++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[number] 
}

//注意：斐波那契数列问题注意初值，n为0时取值到底为多少，注意后面算的时候初值的选取。
```



#### 11.旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

```c++
class Solution {
public:
    int minNumberInRotateArray(vector<int> rotateArray) {
        if (rotateArray.empty()) return 0;
        int left = 0, right = rotateArray.size() - 1;
        while (left < right) {
            //确认子数组是否是类似1,1,2,4,5,7的非递减数组
           if (rotateArray[left] < rotateArray[right]) return rotateArray[left];
             
            int mid = left + (right - left) / 2;
            //如果左半数组为有序数组
            if (rotateArray[left] < rotateArray[mid])
                left = mid + 1;
            //如果右半数组为有序数组
            else if (rotateArray[mid] < rotateArray[right])
                right = mid;
            //否则，
            else {
                ++left;
            }
        }
        return rotateArray[left];
    }
};
//解法二

```

#### 12.矩阵中的路径

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。 例如 

a b c e 

s f c s 

a d e e 

这样的3 X 4 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

分析：回溯算法
	这是一个可以用回朔法解决的典型题。首先，在矩阵中任选一个格子作为路径的起点。如果路径上的第i个字符不是ch，那么这个格子不可能处在路径上的第i个位置。如果路径上的第i个字符正好是ch，那么往相邻的格子寻找路径上的第i+1个字符。除在矩阵边界上的格子之外，其他格子都有4个相邻的格子。重复这个过程直到路径上的所有字符都在矩阵中找到相应的位置。由于回朔法的递归特性，路径可以被开成一个栈。当在矩阵中定位了路径中前n个字符的位置之后，在与第n个字符对应的格子的周围都没有找到第n+1个字符，这个时候只要在路径上回到第n-1个字符，重新定位第n个字符。
　　由于路径不能重复进入矩阵的格子，还需要定义和字符矩阵大小一样的布尔值矩阵，用来标识路径是否已经进入每个格子。 当矩阵中坐标为（row,col）的格子和路径字符串中相应的字符一样时，从4个相邻的格子(row,col-1),(row-1,col),(row,col+1)以及(row+1,col)中去定位路径字符串中下一个字符,如果4个相邻的格子都没有匹配字符串中下一个的字符，表明当前路径字符串中字符在矩阵中的定位不正确，我们需要回到前一个，然后重新定位。一直重复这个过程，直到路径字符串上所有字符都在矩阵中找到合适的位置.

```c++
 private:
    bool isPath(char *matrix,vector<char> flags,char* str,int x,int y,int rows, int cols)
    {
        if(x<0 || x>=rows || y<0 || y>=cols) //越界的点
            return false;     
 
        if( matrix[x*cols+y]== *str  &&  flags[x*cols+y]==0 )
        {
            flags[x*cols+y]=1;
 
            if(*(str+1)==0)  // 字符串结尾了（最后一个满足的）
                return true;
 
            bool condition =isPath(matrix,flags,(str+1),x,y-1,rows,cols) ||
                isPath(matrix,flags,(str+1),x-1,y,rows,cols)||
                isPath(matrix,flags,(str+1),x,y+1,rows,cols)||
                isPath(matrix,flags,(str+1),x+1,y,rows,cols);           
            if(condition == false)
                flags[x*cols+y]=0;
            return condition;             
        }           
        else
            return false;
    }
    public:
    bool hasPath(char* matrix, int rows, int cols, char* str)
    {
         
        vector<char> flags(rows*cols,0);
        bool condition=false;
        for(int i=0;i<rows;i++)
            for(int j=0;j<cols;j++)
            {
                if(isPath(matrix,flags,str,i,j,rows,cols))
                    return true;
            }
        return false;    
    }
//创建标志位，用bool型数组
//bool* flags
//bool *flag = new bool[rows * cols];
//        for(int i = 0; i < rows * cols; i++)
//            flag[i] = false;
```

#### 13.机器人的运动范围

地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

```c++

```

#### 15.二进制中1的个数

输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

分析：把一个整数减去1，再和原整数做与运算，会把该整数最右边的1变成0。一个整数的二进制表示中有多少个1就可以做多少次这样的操作。

```c++
int  NumberOf1(int n) {
         int count=0;
         while(n){
             count++;
             n=(n-1)&n;
         }
         return count;
     }
```

```javascript
function NumberOf1(n)
{
    // write code here
    var count = 0,flag=1;
    while(flag){
        if(n&flag)count++;
        //1的二进制是 前面都是0，最后一位为1，也就是只有一个1，每次向左移位一下，使得flag的二进制表示中始终只有一个位为1，每次与n做位与操作，这样就相当于逐个检测n的每一位是否是1了。
        flag=flag<<1;
    }
    return count;
}
```

#### 16.数值的整数次方

给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

```c++
double Power(double base, int exponent) {
        double result=1.0;
        if(base==0)
            return 0.0;
        for(int i=0;i<abs(exponent);i++){
            result*=base;
        }
        if(exponent<0)
            result=1.0/result;
        return result;
    }
//快速幂方法，利用&来判断奇偶，用右移>>运算代替除法，注意要声明为long long类型
class Solution {
public:
    double Power(double base, int exponent) {
        long long p = abs((long long)exponent);//此处int也彳亍
      double r = 1.0;
        while(p){
            if(p & 1) r *= base;
            base *= base;
            p >>= 1;
        }
        return exponent < 0 ? 1/ r : r;
    }
};
```



#### 18.删除链表中重复节点

在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5

```c++
class Solution
{
public:
    ListNode* deleteDuplication(ListNode* pHead)
    {
        if(pHead==NULL)
            return pHead;
        ListNode *pre=NULL;//非重复节点
        ListNode *p=pHead;//当前节点
        ListNode *q=NULL;//当前节点下一节点
        while(p!=NULL)
        {
            //当p与p->next值重复时
            if(p->next!=NULL&&p->val==p->next->val)
            {
                q=p->next;
                //将p后面重复的交给q来循环找，循环完之后q指向与p重复的最后一个节点
                while(q!=NULL&&q->next!=NULL&&q->next->val==q->val)
                    q=q->next;
                //开始删除，当p为头节点时，直接删除，令头节点为下一个，不是头节点时pre指向下一个待考虑的节点
                if(p==pHead)
                    pHead=q->next;
                else
                    pre->next=q->next;
                //删除操作处理完之后，将p指向新考虑的节点
                p=q->next;
            }
            //不重复时，pre指向当前节点，p指向下一节点
            else
            {
                pre=p;
                p=p->next;
            }
        }
        return pHead;
    }
};
```

#### 21.调整数组顺序使奇数位位于偶数前面

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

```c++
void reOrderArray(vector<int> &array) {
        int len=array.size();
        int i,j;
        for(i=0;i<len;i++){
            for(j=len-1;j>i;j--){
                if(array[j]%2==1&&array[j-1]%2==0)
                    swap(array[j],array[j-1]);//每一次外循环i将数组元素array[i]确定
            }
        }
    }   
//插入排序思想：若当前数为奇数，就往前找，遇到偶数就与其交换
void reOrderArray(vector<int> &array){
        int len=array.size();
        for(int i=1;i<len;i++){
            if(array[i]%2==1){
                for(int j=i;j>0;j--){
                    if(array[j-1]%2==0){
                        swap(array[j-1],array[j]);
                    }
                }
            }
        }
    }
```





#### 22.链表中倒数第k个节点

输入一个链表，输出该链表中倒数第k个结点。

分析：设置两个指针p,q均指向头节点，让q不动，p先到达第k个节点，然后p,q同时往后走，当p为空时，返回q

```c++
class Solution {
public:
    ListNode* FindKthToTail(ListNode* pListHead, unsigned int k) {
        ListNode *p=pListHead;
        for(int i=0;i<k;i++){  
            if(!p)
                return nullptr;
            else
                p=p->next;
            
        }
        while(p){
            p=p->next;
            pListHead=pListHead->next;
        }
        return pListHead;     
    }
};
```

```javascript
function FindKthToTail(head, k) {
    if (head == null) {
        return false;
    }
    var currNode = head;
    var arr = [];
    while (currNode != null) {
        arr.push(currNode);
        currNode = currNode.next;
    }
    return arr[arr.length - k];
}
```

#### 23.链表中环的入口节点

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

分析：利用快慢指针，先找到环中的点，

1. 第一步，找环中相汇点。分别用slow，fast指向链表头部，slow每次走一步，fast每次走二步，直到slow==fast找到在环中的相汇点。
2. 第二步，找环的入口。接上步，当slow==fast时，fast所经过节点数为2x,slow所经过节点数为x,设环中有n个节点,fast比slow多走一圈有2x=n+x; n=x;可以看出slow实际走了一个环的步数，再让slow指向链表头部，fast位置不变，slow,fast每次走一步直到slow==fast; 此时slow指向环的入口。

```c++
ListNode* EntryNodeOfLoop(ListNode* pHead)
    {
        ListNode *slow = pHead;
        ListNode *fast = pHead;
        do{
            if(fast == NULL || fast->next==NULL)
                return NULL;
            fast = fast->next->next;
            slow = slow->next;   
        }while(slow != fast);
        slow = pHead;//此时距头节点为一个环的长度
        while(slow != fast){
            slow = slow->next;
            fast = fast->next;
        }
        return slow;   
    }
```



#### 24.反转链表

输入一个链表，反转链表后，输出新链表的表头。

分析：指针p遍历，每遍历一个节点赋给q，然后将q头插法构建单链表

```c+
class Solution {
public:
    ListNode* ReverseList(ListNode* pHead) {
        ListNode *p,*q;
        p=pHead->next;
        if(!pHead)
            return nullptr;
        else{
            pHead->next=nullptr;
            while(p){
                q=p;
                p=p->next;
                q->next=pHead;
                
                pHead=q;  
            }
            return pHead;
        }
    }
};
```

```javascript
//js中利用数组来实现链表的相关功能，注意push(),pop()方法和数组的声明
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
    var node=pHead,arr=[];
    while(node){
        arr.push(node.val);
        node=node.next;
    }
   node=pHead;
    while(node){
        node.val=arr.pop();
        node=node.next;
    }
    return pHead;
}
```

#### 25.合并两个排序的列表

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

```c++
//c++递归实现
class Solution {
public:
    ListNode* Merge(ListNode* pHead1, ListNode* pHead2)
    {
        if(!pHead1)
             return pHead2;
        if(!pHead2)
             return pHead1;
        if(pHead1->val<pHead2->val){
            pHead1->next=Merge(pHead1->next,pHead2);
            return pHead1;
        } 
        else{
            pHead2->next=Merge(pHead1,pHead2->next);
            return pHead2;
        }    
    }
};
//非递归实现
ListNode* Merge(ListNode* pHead1, ListNode* pHead2){
		ListNode* pHead = new ListNode(0);
        ListNode* p = pHead;
		while (pHead1!=NULL && pHead2!=NULL){
			if (pHead1->val<=pHead2->val){
					p->next = pHead1;
                    pHead1 = pHead1->next;
				}
			else {
					p->next = pHead2;
					pHead2 = pHead2->next;
				}
				p = p->next;
		}
		if (pHead2!= NULL) {
			p->next = pHead2;
		}
		else {
			p->next = pHead1;
		}
		return pHead->next;
	}
```

#### 26.树的子结构

输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

分析：分两步，第一步，在树A中找到与根节点的值一样的节点，即遍历树。第二步，判断A中以R为根节点的子树是不是和B具有相同结构。递归夫人终止条件是到达了树A或者树B的叶节点。

```c++
bool HasSubtree(TreeNode* pRoot1, TreeNode* pRoot2)
    {
        bool result=false;
        if(pRoot1!=NULL&&pRoot2!=NULL){
            if(pRoot1->val==pRoot2->val)
                result=isChild(pRoot1,pRoot2);
            if(!result)
                result=HasSubtree(pRoot1->left,pRoot2);
            if(!result)
                result=HasSubtree(pRoot1->right,pRoot2);
        }
         return result;
    }
    bool isChild(TreeNode* pRoot1, TreeNode* pRoot2){
        if(pRoot2==NULL)
            return true;
        if(pRoot1==NULL)
            return false;
        if(pRoot1->val!=pRoot2->val)
            return false;
        return isChild(pRoot1->left,pRoot2->left)&&isChild(pRoot1->right,pRoot2->right);
    }
```

#### 28.对称的二叉树 2

请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。

分析：可以通过比较二叉树的前序遍历和对称前序遍历序列来判断二叉树是不是对称的，对称前序遍历即父右左

```c++
bool isSymmetrical(TreeNode* pRoot)
    {
        return isSymmetrical(pRoot,pRoot);
    }
    bool isSymmetrical(TreeNode* pRoot1,TreeNode* pRoot2){
        if(pRoot1==nullptr&&pRoot2==nullptr)
            return true;
        if(pRoot1==nullptr||pRoot2==nullptr)
            return false;
        if(pRoot1->val!=pRoot2->val)
            return false;
        return isSymmetrical(pRoot1->left,pRoot2->right)&&isSymmetrical(pRoot1->right,pRoot2->left);
    }
```

#### 29.顺时针打印矩阵

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.

分析：用左上和右下的坐标定位出一次要旋转打印的数据，一次旋转打印结束后，往对角分别前进和后退一个单位。后两个for循环，需要加入条件判断，防止出现单行或者单列的情况。

```c++
vector<int> printMatrix(vector<vector<int> > matrix) {
        int row = matrix.size();
        int col = matrix[0].size();
        vector<int> res;
        if (row == 0 || col == 0)  return res;
        int left=0,top=0,right=col-1,bottom=row-1;
        while(left<=right&&top<=bottom){
            for(int i=left;i<=right;i++)
                res.push_back(matrix[top][i]);
            for(int i=top+1;i<=bottom;i++)
                res.push_back(matrix[i][right]);
            if(top!=bottom)
                for(int i=right-1;i>=left;i--)
                    res.push_back(matrix[bottom][i]);
            if(left!=right)
                for(int i=bottom-1;i>top;i--)
                    res.push_back(matrix[i][left]);
            left++,top++,right--,bottom--;
        }
        return res;
    }
```



#### 30.包含min函数的栈

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））

分析：

空间复杂度为O(1)意味着需要辅助栈，提高空间复杂度

每次将最小元素压入辅助栈，否则将辅助栈的栈顶重新压入一遍

```c++
stack<int> stack1,stack2;
    void push(int value) {
        stack1.push(value);
        if(stack2.empty())
            stack2.push(value);
        else if(value<stack2.top()){
            stack2.push(value);
        }
        else
            stack2.push(stack2.top());
    }
    void pop() {
        if(!stack1.empty()){
          stack2.pop();
          stack1.pop();  
        }    
    }
    int top() {
        return stack1.top();
    }
    int min() {
        return stack2.top();
    }
```

#### 31.栈的压入、弹出序列

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

分析：将栈顶元素依次和出栈序列元素比较，若下一个弹出的数字刚好是栈顶元素，则直接弹出，否则依据压栈顺序，将数字压入栈，知道把下一个要出栈的序列压入栈顶为止，若最后栈里还有数字，则不存在这样的出栈序列。

```c++
bool IsPopOrder(vector<int> pushV,vector<int> popV) {
        stack<int> stk;
        int i=0,j=0;
        for(i=0;i<popV.size();i++){
           while(stk.empty()||stk.top()!=popV[i]){
            stk.push(pushV[j++]);
        }
            stk.pop();
        }
        if(stk.empty())
            return true;
        else 
            return false;  
    }
```

#### 32.打印二叉树

##### 从上到下打印二叉树

从上往下打印出二叉树的每个节点，同层节点从左至右打印。

分析：即树的层序遍历，用双端队列实现f

```c++
 vector<int> PrintFromTopToBottom(TreeNode* root) {
        vector<int> result;
        queue<TreeNode*> que;//双端队列
        if(root==nullptr) 
            return result;
        que.push(root);
        while(!que.empty()){
            result.push_back(que.front()->val);
            if(que.front()->left!=nullptr)
                que.push(que.front()->left);
            if(que.front()->right!=nullptr)
                que.push(que.front()->right);
            que.pop();
        }
        return result;
    }
```

##### 二叉树打印成多行

从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。

```c++
vector<vector<int> > Print(TreeNode* pRoot) {
            queue<TreeNode*> que;
            vector<vector<int>> result;
            if(pRoot==nullptr)
                return result;
            que.push(pRoot);
            while(!que.empty()){
                int toBePrinted=0,len=que.size();
                vector<int> level;
                while(toBePrinted<len){  //子循环每次得到一层
                    TreeNode* t=que.front();
                    level.push_back(t->val);
                    que.pop();
                    if(t->left) 
                        que.push(t->left);
                    if(t->right) 
                        que.push(t->right);
                    toBePrinted++;
                }
                result.push_back(level);
            }
            return result;
        }
```

##### 之字打印二叉树

请实现一个函数按照之字形打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右至左的顺序打印，第三行按照从左到右的顺序打印，其他行以此类推。

```c++
//解法1，在上一题的基础上，判断奇数还是偶数层，偶数层用reverse函数逆转
vector<vector<int> > Print(TreeNode* pRoot) {
            queue<TreeNode*> que;
            vector<vector<int>> result;
            if(pRoot==nullptr)
                return result;
            que.push(pRoot);
            int count=1;
            while(!que.empty()){
                int toBePrinted=0,len=que.size();
                vector<int> level;
                while(toBePrinted<len){  
                    TreeNode* t=que.front();
                    level.push_back(t->val);
                    que.pop();
                    if(t->left) 
                        que.push(t->left);
                    if(t->right) 
                        que.push(t->right);
                    toBePrinted++;
                }
                if(count%2==0){
                    reverse(level.begin(),level.end());
                    result.push_back(level);
                }
                else    
                    result.push_back(level);
                count++;
            }
            return result;
        }
//解法2，利用两个栈实现，当前打印奇数层时，先保存左节点再保存右节点到第一个栈里，当前打印偶数层时，先保存右节点再保存左节点到第二个栈里
vector<vector<int> > Print(TreeNode* pRoot) {
        vector<vector<int> > result;
        stack<TreeNode *> stack1,stack2;
        if(pRoot!=NULL)
            stack1.push(pRoot);
        struct TreeNode *node;
        while(!stack1.empty() || !stack2.empty()){
            vector<int> data;
            if(!stack1.empty()){
                while(!stack1.empty()){
                    node = stack1.top();
                    stack1.pop();
                    data.push_back(node->val);
                    if(node->left!=NULL)
                        stack2.push(node->left);
                    if(node->right!=NULL)
                        stack2.push(node->right);
                }
            }
            else if(!stack2.empty()){
                while(!stack2.empty()){
                    node = stack2.top();
                    stack2.pop();
                    data.push_back(node->val);
                    if(node->right!=NULL)
                        stack1.push(node->right);
                    if(node->left!=NULL)
                        stack1.push(node->left);
                } 
            }
            result.push_back(data);
        }
        return result;
    }
```

#### 33.二叉搜索树的后序遍历序列

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

分析：数组最后一个是根节点，从前往后左子树比根小，右子树比根大，然后递归

```c++
bool VerifySquenceOfBST(vector<int> sequence) {
        return verify(sequence,0,sequence.size()-1);
    }
    bool verify(vector<int> a,int start,int end){
        if(end<0){
            return false;          
        }
        int root=a[end];
        int i=start;
        for(;i<end;i++){
            if(a[i]>root)
                break;
         }
        int j=i;
        for(;j<end;j++){
             if(a[j]<root)
                return false;
         }
         bool left=true;
         if(i>start)
            left=verify(a,start,i-1);
         bool right=true;
         if(i<end-1)//注意要减1，不然传参的start和end
            right=verify(a,i,end-1);
         return (left&&right);
    }
```

#### 34.二叉树中和为某一值的路径（递归）

输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。(注意: 在返回值的list中，数组长度大的数组靠前)

分析：用前序遍历的方式访问某一结点，把该节点添加到路径上，并将路径值减去该节点值，若相减后值为0且该节点是叶节点，那么这条路径满足要求。

若当前节点不是叶节点，则继续访问它的子节点，当前节点访问结束后，递归函数自动回到它的父节点，因此，在函数退出之前要在路径上删除当前节点

```c++
 vector<vector<int>> path;
    vector<int> temp;
    vector<vector<int> > FindPath(TreeNode* root,int expectNumber) {
        if(root==nullptr)
            return path;
        temp.push_back(root->val);
        if(root->val-expectNumber==0&&root->left==nullptr&&root->right==nullptr)
            path.push_back(temp);
        FindPath(root->left,expectNumber-root->val);
        FindPath(root->right,expectNumber-root->val);
        if(temp.size()!=0)
            temp.pop_back();//在返回父节点之前，在路径上删除当前节点
        return path;
    }
```

#### 37.序列化二叉树

请实现两个函数，分别用来序列化和反序列化二叉树。

```
1. 对于序列化：使用前序遍历，递归的将二叉树的值转化为字符，并且在每次二叉树的结点
不为空时，在转化val所得的字符之后添加一个' ， '作为分割。对于空节点则以 '#' 代替。
2. 对于反序列化：按照前序顺序，递归的使用字符串中的字符创建一个二叉树(特别注意：
在递归时，递归函数的参数一定要是char ** ，这样才能保证每次递归后指向字符串的指针会
随着递归的进行而移动！！！)
```

```c++
char* Serialize(TreeNode *root) {
       if(root == NULL)
           return NULL;
        string str;
        Serialize(root, str);
        char *ret = new char[str.length() + 1];
        int i;
        for(i = 0; i < str.length(); i++){
            ret[i] = str[i];
        }
        ret[i] = '\0';
        return ret;
    }
    void Serialize(TreeNode *root, string& str){
        if(root == NULL){
            str += '#';
            return ;
        }
        string r = to_string(root->val);
        str += r;
        str += ',';
        Serialize(root->left, str);
        Serialize(root->right, str);
    }
     
    TreeNode* Deserialize(char *str) {
        if(str == NULL)
            return NULL;
        TreeNode *ret = Deserialize(&str);
 
        return ret;
    }
    TreeNode* Deserialize(char **str){//由于递归时，会不断的向后读取字符串
        if(**str == '#'){  //所以一定要用**str,
            ++(*str);         //以保证得到递归后指针str指向未被读取的字符
            return NULL;
        }
        int num = 0;
        while(**str != '\0' && **str != ','){
            num = num*10 + ((**str) - '0');
            ++(*str);
        }
        TreeNode *root = new TreeNode(num);
        if(**str == '\0')
            return root;
        else
            (*str)++;
        root->left = Deserialize(str);
        root->right = Deserialize(str);
        return root;
    }
```



#### 38.字符串的排列

输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba

分析：**递归法，问题转换为先固定第一个字符，求剩余字符的排列；求剩余字符排列时跟原问题一样。** 

  (1) **遍历出所有可能出现在第一个位置的字符**（即：依次将第一个字符同后面所有字符交换）； 

  (2) **固定第一个字符，求后面字符的排列**（即：在第1步的遍历过程中，插入递归进行实现）。 

  需要注意的几点： 

  (1) 先确定**递归结束的条件**，例如本题中可设begin == str.size() - 1;  

  (2)   形如 **aba** 或 **aa** 等特殊测试用例的情况，vector在进行push_back时是不考虑重复情况的，需要自行控制； 

  (3)   输出的排列可能**不是按字典顺序排列**的，可能导致无法完全通过测试用例，考虑输出前排序，或者递归之后取消复位操作。

```c++
vector<string> Permutation(string str) {
        vector<string> result;
        if(str.empty())
            return result;
        Permutation(str,result,0);
        //为了得到字典顺序
        sort(result.begin(),result.end());
        return result;
    }
    void Permutation(string str,vector<string> &result,int begin){
        if(begin==str.size()-1){//递归结束条件
            // 如果result中不存在str，才添加；避免aa和aa重复添加的情况
            //
            if(find(result.begin(),result.end(),str)==result.end())
                result.push_back(str);
        }
        else{
			// 第一次循环i与begin相等，相当于第一个位置自身交换，关键在于之后的循环，
            // 之后i != begin，则会交换两个不同位置上的字符，直到begin==str.size()-1，进行输出；
            for(int i=begin;i<str.size();i++){
                swap(str[i],str[begin]);
                Permutation(str,result,begin+1);
                swap(str[i],str[begin]);// 复位，用以恢复之前字符串顺序，达到第一位依次跟其他位交换的目的
            }
        }
    }
    void swap(char &a,char &b){
        char temp=a;
        a=b;
        b=temp;
    }
```



#### 39.数组中出现次数超过一半的数字

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

分析：

如果有符合条件的数字，则它出现的次数比其他所有数字出现的次数和还要多。 在遍历数组时保存两个值：一是数组中一个数字，一是次数。遍历下一个数字时，若它与之前保存的数字相同，则次数加1，否则次数减1；若次数为0，则保存下一个数字，并将次数置为1。遍历结束后，所保存的数字即为所求。然后再判断它是否符合条件即可。

```c++
int MoreThanHalfNum_Solution(vector<int> numbers) {
        int count=1;
        int target=numbers[0];
        for(int i=1;i<numbers.size();i++){
            if(numbers[i]==target)
                count++;
            else
                count--;
            if(count==0){
                target=numbers[i];
                count=1;
            }
        }
        count=0;
        for(int i=0;i<numbers.size();i++){
            if(target==numbers[i])
                count++;
        }
        return count>numbers.size()/2?target:0;
    }
```

#### 43.1~n整数中1出现的次数

求出1~13的整数中1出现的次数,并算出100~1300的整数中1出现的次数？为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,但是对于后面问题他就没辙了。ACMer希望你们帮帮他,并把问题更加普遍化,可以很快的求出任意非负整数区间中1出现的次数（从1 到 n 中1出现的次数）。

```c++
//书上还有其他解法
int NumberOf1Between1AndN_Solution(int n)
    {
        int count=0;
        if(n<1)
            return 0;
        for(int i=1;i<=n;i++){
            int temp=i;
            while(temp){
                if(temp%10==1)
                    count++;
                temp=temp/10;
            }
        }
        return count;
    }
```



#### 45.把数组排成最小的数

输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。

```c++
string PrintMinNumber(vector<int> numbers) {
        int len=numbers.size();
        if(len==0) return "";
        sort(numbers.begin(),numbers.end(),cmp);
        string res;
        for(int i=0;i<len;i++){
            res+=to_string(numbers[i]);
        }
        return res;
    }
//比较器，使其按字符串升序排序
//sort中的比较函数compare要声明为静态成员函数或全局函数，不能作为普通成员函数，否则会报错。 因为：非静态成员函数是依赖于具体对象的，而std::sort这类函数是全局的，因此无法再sort中调用非静态成员函数。静态成员函数或者全局函数是不依赖于具体对象的, 可以独立访问，无须创建任何对象实例就可以访问。同时静态成员函数不可以调用类的非静态成员。
    static bool cmp(int a,int b){
        string A=to_string(a)+to_string(b);
        string B=to_string(b)+to_string(a);
        return A<B;
    }
```

```javascript
//主要就是定义新的排序规则，也就是把前一个数和后一个数拼接起来的数，然后再与后一个数和前一个数拼接起来的数比较字典序
function PrintMinNumber(numbers)
{
    numbers.sort(function(s1,s2){
        let c1=s1+""+s2;
        let c2=s2+""+s1;
        return c1>c2;
    });
    let min="";
    numbers.forEach(i=>min+=i)//学完ES6再来理解
    return min;
}
```





#### 49.丑数

把只包含质因子2、3和5的数称作丑数（Ugly Number）。例如6、8都是丑数，但14不是，因为它包含质因子7。 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第N个丑数。

```c++
int GetUglyNumber_Solution(int index) {
        // 0-6的丑数分别为0-6
        if(index < 7) return index;
        //p2，p3，p5分别为三个队列的指针，newNum为从队列头选出来的最小数
        int p2 = 0, p3 = 0, p5 = 0, newNum = 1;
        vector<int> arr;//如果要用到arr[i],所以要初始化，否则要用push_back函数
        arr.push_back(newNum);
        while(arr.size() < index) {
            //选出三个队列头最小的数
            newNum = min(arr[p2] * 2, min(arr[p3] * 3, arr[p5] * 5));
            //这三个if有可能进入一个或者多个，进入多个是三个队列头最小的数有多个的情况
            if(arr[p2] * 2 == newNum) p2++;
            if(arr[p3] * 3 == newNum) p3++;
            if(arr[p5] * 5 == newNum) p5++;
            arr.push_back(newNum);
        }
        return newNum;
    }
```

#### 50.第一个只出现一次的字符

在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）

分析：利用哈希表，键值Key是字符，而值Value是出现次数。第一遍循环将每个字符出现多少次记录下来，第二遍循环将第一个出现一次的字符找出来。

```c++
int FirstNotRepeatingChar(string str) {
        map<char, int> mp;
        int len = str.size();
        for(int i=0;i<len;i++){
            mp[str[i]]++;
        }
        for(int i=0;i<len;i++){
            if(mp[str[i]]==1){
               return i;
                break;
            }       
        }
        return -1;
    }
```



#### 52.两个链表的第一个公共节点

输入两个链表，找出它们的第一个公共结点。

```c++
//蛮力法，两个循环，复杂度为O(n*m)
ListNode* FindFirstCommonNode( ListNode* pHead1, ListNode* pHead2) {
        ListNode *p2=pHead2,*p1=pHead1;
        while(p1){
            while(p2){
                if(p1==p2)
                    return p1;
                p2=p2->next;
            }
            p2=pHead2;
            p1=p1->next;
        }
        return nullptr;
    }
//先求出两个链表长度，比较大小，然后大的那个先遍历相差的长度，然后同时遍历，遇到的第一个相等的节点就是公共节点，时间复杂度为O(n+m)
ListNode* FindFirstCommonNode( ListNode* pHead1, ListNode* pHead2) {
        ListNode *p2=pHead2,*p1=pHead1;
        int len1=getLength(pHead1);
        int len2=getLength(pHead2);
        if(len2>len1){
            p1=pHead2;
            p2=pHead1;
        }
        int distance=abs(len1-len2);
        for(int i=0;i<distance;i++)
            p1=p1->next;
        while((p1!=p2)&&p1&&p2){
            p1=p1->next;
            p2=p2->next;
        }
        return p1;
    }
    int getLength(ListNode* p){
        int count=0;
        while(p){
            count++;
            p=p->next;
        }
        return count;
    }
```

#### 54.二叉搜索树的第K个节点

给定一棵二叉搜索树，请找出其中的第k小的结点。例如， （5，3，7，2，4，6，8）    中，按结点数值大小顺序第三小结点的值为4。

分析：二叉搜索树的中序遍历序列递增

```c++
TreeNode* KthNode(TreeNode* pRoot, int k)
    {
        if(pRoot==nullptr||k==0)
            return nullptr;
        return KthNodeCore(pRoot,k);
    }
//函数内部修改参数并且希望改动影响调用者时要用引用或者指针传递
    TreeNode* KthNodeCore(TreeNode* pRoot, int &k){
        TreeNode* target=nullptr;//每次递归第一步
        if(pRoot->left!=nullptr)
            target=KthNodeCore(pRoot->left,k);
        if(target==nullptr){
            if(k==1)
                target=pRoot;
            k--;
        }
        if(target==nullptr&&pRoot->right!=nullptr){
            target=KthNodeCore(pRoot->right,k);
        }
        return target;
    }
```



#### 55.二叉树的深度

##### 二叉树的深度

输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。

分析：前序遍历二叉树，递归终止条件，当节点为空时，返回1，若根只有左子树右子树为空，深度为左子树深度加1，若根只有右子树左子树为空，深度为右子树深度加1，若左右子树均存在，则深度为左右子树深度较大值加1。

```c++
int TreeDepth(TreeNode* pRoot)
    {
        if(pRoot==nullptr)
            return 0;
        int left=TreeDepth(pRoot->left);
        int right=TreeDepth(pRoot->right);
        return (left>right)?(left+1):(right+1);
    }

//js实现
function TreeDepth(pRoot)
{
    // write code here
        if(pRoot==null)
            return 0;
        var left=TreeDepth(pRoot.left);
        var right=TreeDepth(pRoot.right);
        return (left>right)?(left+1):(right+1);
}
```

##### 平衡二叉树

输入一棵二叉树，判断该二叉树是否是平衡二叉树。

分析：在遍历树的节点时，调用函数得到它左右子树的深度，如果每个节点的左右子树深度相差不超过1即为平衡二叉树。通过后序遍历，一边遍历一边判断每个节点是不是平衡的，每个节点只用遍历一次。

```c++
bool IsBalanced_Solution(TreeNode* pRoot) {
        int depth = 0;
        return isBalanced(pRoot,depth);  
    }
    bool isBalanced(TreeNode* root,int & depth){
        if(root==nullptr)
            return true;
        int left=0;
        int right=0;
        if(isBalanced(root->left,left)&&isBalanced(root->right,right)){
            if(abs(left-right)>1)
                return false;
            depth=1+((left>right)?left:right);
            return true;
        }
        return false;
    }

//方法2
bool IsBalanced_Solution(TreeNode* pRoot) {
        if(helper(pRoot) < 0) return false;
        return true;
    }
    int helper(TreeNode* node){
        if(node == NULL) return 0;
        int ld = helper(node->left);
        if(ld == -1) return -1;    //若左边已经不是平衡二叉树了，那就直接返回，没必要搜索右边了
        int rd = helper(node->right);    
        if(rd == -1 || abs(ld-rd) > 1) return -1; //-1代表：不是平衡二叉树
        return max(ld, rd)+1;
    }
```

#### 57.和为s的数字

输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。

```c++
//由于数组已经排好序，可以设置两个指针，从两头往中间逼近
vector<int> FindNumbersWithSum(vector<int> array,int sum) {
        vector<int> result;
        int len = array.size();
        int begin = 0;
        int end = len-1;
        while(begin<end){
            int count = array[begin]+array[end];
            if(count==sum){
                result.push_back(array[begin]);
                result.push_back(array[end]);
                break;
            }
            if(count<sum)
                begin++;
            else
                end--;
        }
        return result;
    }
```

#### 58.翻转字符串(未做)

##### 翻转字符串

牛客最近来了一个新员工Fish，每天早晨总是会拿着一本英文杂志，写些句子在本子上。同事Cat对Fish写的内容颇感兴趣，有一天他向Fish借来翻看，但却读不懂它的意思。例如，“student. a am I”。后来才意识到，这家伙原来把句子单词的顺序翻转了，正确的句子应该是“I am a student.”。Cat对一一的翻转这些单词顺序可不在行，你能帮助他么？

```c++

```

##### 左旋转字符串

汇编语言中有一种移位指令叫做循环左移（ROL），现在有个简单的任务，就是用字符串模拟这个指令的运算结果。对于一个给定的字符序列S，请你把其循环左移K位后的序列输出。例如，字符序列S=”abcXYZdef”,要求输出循环左移3位后的结果，即“XYZdefabc”。是不是很简单？OK，搞定它！

```c++

```



#### 59.滑动窗口的最大值(难懂)

给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。

```c++
vector<int> maxInWindows(const vector<int>& num,unsigned int size){
    vector<int> res;//最大值数组
    deque<int> s;//双向队列，存放可能成为滑动窗口最大值的数值
    for(unsigned int i=0;i<num.size();i++){
        //从后面依次弹出队列中比当前num值小的元素，同时也能保证队列首元素为当前窗口最大值下标
        while(s.size()&&num[s.back()]<num[i])
            s.pop_back();
        //当当前窗口移出队首元素所在的位置，即队首元素坐标对应的num不在窗口中，需要弹出
        while(s.size()&&i-s.front()+1>size) 
            s.pop_front();
        s.push_back(i);//把每次滑动的num下标加入队列
        if(size&&i+1>=size)//当滑动窗口首地址i大于等于size时才开始写入窗口最大值
            res.push_back(num[s.front()]);
    }
    return res;
}
```





#### 64.求1+2+3+...+n

求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

```c++
class Solution {
public:
    int Sum_Solution(int n) {
        int sum=n;
        //sum=0为终止条件
        sum && (sum+=Sum_Solution(n-1));
        return sum;
    }
};
```

#### 65.不用加减乘除做加法

写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。

```c++
/*
首先看十进制是如何做的： 5+7=12，三步走
第一步：相加各位的值，不算进位，得到2。
第二步：计算进位值，得到10. 如果这一步的进位值为0，那么第一步得到的值就是最终结果。
第三步：重复上述两步，只是相加的值变成上述两步的得到的结果2和10，得到12。
同样我们可以用三步走的方式计算二进制值相加： 5-101，7-111 
第一步：相加各位的值，不算进位，得到010，二进制每位相加就相当于各位做异或操作，101^111。
第二步：计算进位值，得到1010，相当于各位做与操作得到101，再向左移一位得到1010，(101&111)<<1。
第三步重复上述两步， 各位相加 010^1010=1000，进位值为100=(010&1010)<<1。
     继续重复上述两步：1000^100 = 1100，直到进位值为0，跳出循环，1100为最终结果 */
int Add(int num1, int num2){
        int sum,carry;
        do{
            sum=num1^num2;
            carry=(num1&num2)<<1;
            num1=sum;
            num2=carry;
        }
        while(num2!=0);
        return num1;
}
//return num2 ? Add(num1^num2, (num1&num2)<<1) : num1;一句话搞定
```

