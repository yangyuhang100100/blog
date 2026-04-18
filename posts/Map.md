

# Map

Java中用于**存储键-值对的接口**

### 1.基本性质

##### 	1.1键的唯一性

​		一个`Map`中，键必须唯一。若尝试添加一个已存在的key，则更新该key的值

##### 	1.2值可重复

​		多个键可以映射到相同的值

##### 	1.3 无序性和有序性

- 无序性：如`HashMap`，不保证键值对的顺序。每次遍历`HashMap`时，元素的顺序可能不同
- 有序性：
  - **插入顺序：**`LinkedHashMap` 按照键值对插入的顺序维护元素顺序。
  - **自然顺序或自定义顺序**：`TreeMap` 根据键的自然顺序（如果键实现了 `Comparable` 接口）或自定义顺序（通过构造函数传入 `Comparator`）对键值对进行排序。

##### 	1.4允许null键和值（部分实现类）

- **`HashMap`**：允许一个 `null` 键和多个 `null` 值。
- **`TreeMap`**：不允许 `null` 键，因为 `TreeMap` 依赖键的比较来排序，`null` 键无法进行比较。但允许 `null` 值。

##### 	1.5实现类的多样性

​		`HashMap`、`TreeMap`、`LinkedHashMap`、`ConcurrentHashMap`（线程安全）等。不同的实现类适用于不同的场景，例如，`HashMap` 适用于一般的键值对存储，`TreeMap` 适用于需要按键排序的场景，`ConcurrentHashMap` 适用于多线程环境。

### 2.参数类型

```java
Map<K,V>:
 K：关键字类型
 V：映射值类型
```

### 3.方法

```java
boolean isEmpty()：       //map中不存在键-值映射对，则返回true
V remove(Object K)：      //从map中移除参数K的键值对
default boolean	remove(Object key, Object value)；  //仅当指定键当前映射到指定值时才删除该键值对
public V get(Object K)：  //返回键 K的映射值或null
public V put(K key, V value)：           //将key-value放入map中，若已存在当前key，则为更新其value
public boolean containsKey(Object key)： //map中若存在该键，则为true
V getOrDefault(Object key, V defaultValue)：//获取指定键对应的值。如果键不存在，则返回一个默认值。   
```

##### 3.1 computeIfPresent

```java
default V computeIfPresent​(K key, BiFunction<? super K,​? super V,​? extends V> remappingFunction)：// 若 key 存在，根据旧的 key 和 value 计算新值并更新；若计算结果为 null，则删除该键值对。
    	key - 与指定值关联的键
    	remappingFunction - 用于计算值的重映射函数
    
    	//默认实现相当于对此map执行以下步骤，然后返回当前值或null如果现在不存在）：
        /*
            if (map.get(key) != null) { 
                V oldValue = map.get(key); 
                V newValue = remappingFunction.apply(key, oldValue); 
                if (newValue != null) 
                    map.put(key, newValue);
                else 
                    map.remove(key); 
            }
        */
public static void main(String[] args) {
    Map<String, Integer> map = new HashMap<>();
    map.put("score", 80);

    // 若key存在，将值加20（80 + 20 = 100）
    map.computeIfPresent("score", (k, v) -> v + 20); 
    System.out.println(map.get("score")); // 输出：100

    // 若key存在但计算结果为null，删除该键值对
    map.computeIfPresent("score", (k, v) -> null); 
    System.out.println(map.containsKey("score")); // 输出：false
}
```

​		**条件性计算与更新**：

​				只有当 `Map` 中指定的 `key` 存在时，该方法才会执行后续操作。

​				方法会使用传入的 `remappingFunction`，结合已存在的 `key` 和对应的 `value` 进行计算，得到新的值。

​				如果计算得到的新值不为 `null`，就将这个新值与 `key` 重新关联，更新 `Map` 中的值。

​		**条件性删除**：

​				若 `remappingFunction` 计算得到的新值为 `null`，则会从 `Map` 中删除该 `key` 对应的键值对。

​		**适用场景：**

​				适用于仅**对已存在的键值对**进行基于当前值的计算和更新的场景

##### 3.2 merge

```Java
default V merge​(K key, V value, BiFunction<? super V,​? super V,​? extends V> remappingFunction)  
    key - 与结果值关联的键
	value - 要与与键关联的现有值合并的非空值，或者，如果没有现有值或与键关联的空值，则与键关联
	remappingFunction - 重新映射函数，用于重新计算值（如果存在）
    
    //默认实现相当于为此map执行以下步骤，然后返回当前值，如果不存在则返回null ：
    /*	
    	V oldValue = map.get(key); 
		V newValue = (oldValue == null) ? value : remappingFunction.apply(oldValue, value); 		if (newValue == null) 
            map.remove(key); 
		else 
            map.put(key, newValue);
    */

```

​		**插入或更新键值对：**

- 插入：`Map`中不存在指定的`key`时，`merge()`会将`key-value`插入到`Map`中
- 更新：若`Map`中已存在指定`key`，`merge()`会利用`remappingFunction`对已有的值(`oldValue`)和新传入的值(`value`)进行合并计算，然后将计算结果(`newValue`)与`key`重新关联

​		**条件移出键值对：**

​			当`remappingFunction`计算得到的新值（`newValue`）为`null`时，如果`key`原本存在，`merge`方法会将该`key`从`Map`中移除。

​		**适用场景：**

- 适用于需要**统一处理插入和更新逻辑**的场景

##### 3.3 computeIfAbsent

```Java
default V computeIfAbsent(K key, Function<? super K,? extends V> mappingFunction)
    key - 要获取值的键
    mappingFunction - 一个函数，当键不存在时，该函数会被调用，用于生成与键关联的新值。
    
    //获取指定键对应的值，如果键不存在，则通过指定的函数计算一个新值并插入到 Map 中
    
    // 默认实现等效于以下步骤 map，然后返回当前值，null如果当前值不存在则返回空值：
    if (map.get(key) == null) {
         V newValue = mappingFunction.apply(key);
         if (newValue != null)
             map.put(key, newValue);
 	}
```

### 4.实现类

##### 4.1 TreeMap - 基于红黑树来存储键值对

```Java
public class TreeMap<K, V> extends AbstractMap <K, V> implements NavigableMap <K, V>, Cloneable , Serializable
    
/*
	按键排序：键实现了 Comparable 接口
	插入，删除，查找：时间复杂度为O(log n)，n为键值对的数量
	遍历：遍历 TreeMap 时，会按照键的排序顺序进行
	不允许 null 作为键：因为 TreeMap 依赖键的比较来维护树的结构和顺序，而 null 无法进行比较。
*/
```

###### 4.1.1 构造函数

```Java
public TreeMap ()                                 //使用键的自然顺序构造一个新的空树映射。
public TreeMap(Comparator<? super K> comparator)  //构建一个新的、空的树状图，并按照给定的比较器进行排序。
public TreeMap(Map<? extends K,? extends V> m)    //构造一个新的树状映射，其中包含与给定映射相同的映射，并按照其键的自然顺序进行排序。
public TreeMap(SortedMap<K,? extends V> m)	      //构建一个新的树状图，其中包含与指定的排序图相同的映射，并使用相同的顺序。
```

