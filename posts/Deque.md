# Deque<E> - 双端队列接口

### 1.实现类

##### 1.1 ArrayDeque <E>

```Java
public class ArrayDeque<E> extends AbstractCollection <E> implements Deque <E>, Cloneable , Serializable

/*
	1.可调整数组大小实现Deque
	2.数组双端队列没有容量限制 - 根据使用自动增长
	3.非线程安全的 - 在没有外部同步的情况下，它们不支持多个线程并发访问
	4.禁止使用空元素（null）
	5.在队列两端进行的插入和删除操作时间复杂度为O(1)
*/
```

###### 1.1.1 构造函数

```Java
public ArrayDeque()   //构造一个初始容量足以容纳 16 个元素的空数组双端队列。
public ArrayDeque(int numElements)   //构造一个空数组双端队列，其初始容量足以容纳指定数量的元素。
    参数numElements - 双端队列初始容量的下限
public ArrayDeque(Collection<? extends E> c) //构造一个包含指定集合元素的双端队列，顺序与集合迭代器返回的顺序相同。
    参数c- 其元素将被放入双端队列的集合
```

###### 1.1.2 方法

```Java
public void addFirst(E e)  //将指定的元素插入到此双端队列的开头。
public void addLast(E e)   //将指定的元素插入到此双端队列的末尾。
public E pollFirst()       //检索并移除此双端队列的第一个元素，null如果此双端队列为空则返回。
public E pollLast()        //检索并移除此双端队列的最后一个元素，null如果此双端队列为空，则返回 null。
public E peekFirst()       //检索但不删除此双端队列的第一个元素，null如果此双端队列为空则返回。
public E peekLast()        //检索但不删除此双端队列的最后一个元素，null如果此双端队列为空则返回。
```

