## RunCode

RunCode is a Node.js package that allows you to execute C, C++, Python, and Java code using the `child_process` module.

### Installation

Install the package using npm:

```bash
npm install runcode
```

### Usage

#### Importing the Module

```javascript
const { executePy, executeCpp, executeJava } = require("runcode");
```

#### Executing Python Code

To execute a Python script:

```javascript
const filePath = "path/to/your/script.py";
const userInput = "input data for the script";

executePy(filePath, userInput)
  .then((output) => {
    console.log("Python Output:", output);
  })
  .catch((error) => {
    console.error("Python Error:", error);
  });
```

#### Executing C++ Code

To execute a C++ script:

```javascript
const filePath = "path/to/your/script.cpp";
const userInput = "input data for the script";

executeCpp(filePath, userInput)
  .then((output) => {
    console.log("C++ Output:", output);
  })
  .catch((error) => {
    console.error("C++ Error:", error);
  });
```

#### Executing Java Code

To execute a Java script:

```javascript
const filePath = "path/to/your/script.java";
const userInput = "input data for the script";

executeJava(filePath, userInput)
  .then((output) => {
    console.log("Java Output:", output);
  })
  .catch((error) => {
    console.error("Java Error:", error);
  });
```

### Example Scripts

#### Python Script (`script.py`)

```python
print("Hello, World!")
```

#### C++ Script (`script.cpp`)

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

#### Java Script (`script.java`)

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### Handling Errors

The methods `executePy`, `executeCpp`, and `executeJava` return promises. Use `.catch` to handle any errors that occur during code execution.

```javascript
executePy(filePath, userInput)
  .then((output) => {
    console.log("Python Output:", output);
  })
  .catch((error) => {
    console.error("Python Error:", error);
  });
```

### License

This package is licensed under the ISC License.
