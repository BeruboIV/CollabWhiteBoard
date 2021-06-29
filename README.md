# Whiteboard


## Installation

Use the node package manager [npm](https://nodejs.org/en/) to install whiteboard.

```python
git clone https://github.com/BeruboIV/WhiteBoard
cd Whiteboard
npm install 
node server.js
```
The app is hosted on PORT 5000

## How Global variables saved the day

socket.io was changing the fillStyle and strokeStyle for all the connected sockets (users), which is necessary to draw on the canvas. But it was not good that the settings were changed permanently for all the users. So using the Global variables (fill_style and stroke_style) to store the previous state fillStlye and strokeStyle was enough to fix this.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
