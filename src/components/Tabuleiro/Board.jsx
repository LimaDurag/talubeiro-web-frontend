import React from 'react';
import '../Tabuleiro/style.css';
import logo from '../../assets/dados.png';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    drawOnCanvas() {
        var sketch = document.querySelector('#sketch');
        sketch.style.margin = 0;
        sketch.style.padding = 0;
        sketch.style.position = 'relative';
    
        var canvas = document.querySelector('#board');
    
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    
        var elements = document.querySelectorAll(".draggable");
        var isMouseDown = {};
        var offsets = {};
    
        elements.forEach(function(element) {
            element.addEventListener('mousedown', function(e) {
                isMouseDown[element] = true;
                var imgRect = element.getBoundingClientRect();
                var parentRect = sketch.parentNode.getBoundingClientRect();
                offsets[element] = {
                    x: e.pageX - window.scrollX - imgRect.left + parentRect.left,
                    y: e.pageY - window.scrollY - imgRect.top + parentRect.top
                };
            });
    
            element.addEventListener('mouseup', function(e) {
                isMouseDown[element] = false;
            });
    
            element.addEventListener('mousemove', function(e) {
                if (isMouseDown[element]) {
                    var canvasRect = canvas.getBoundingClientRect();
                    if (e.pageX >= canvasRect.left && e.pageX <= canvasRect.right && e.pageY >= canvasRect.top + window.scrollY && e.pageY <= canvasRect.bottom + window.scrollY) {
                        element.style.setProperty('left', (e.pageX - offsets[element].x) + 'px');
                        element.style.setProperty('top', (e.pageY - offsets[element].y) + 'px');
                    }
                }
            });
        });
    }

    render() {
        const imageWidth = 100;
        const images = [
            { id: "img", src: logo },
            { id: "img2", src: logo }
        ];
    
        return (
            <div className="sketch" id="sketch">
                {images.map((image, index) => (
                    <img
                        key={image.id}
                        id={image.id}
                        className="draggable"
                        src={image.src}
                        style={{ left: index * imageWidth + "px" }}
                    />
                ))}
                <canvas className="board" id="board"></canvas>
            </div>
        );
    }
}

export default Board
