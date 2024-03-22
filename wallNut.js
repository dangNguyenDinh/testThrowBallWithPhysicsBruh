export default class wallNut{
    src;
    x;
    y;
    width;
    height;
    nut = document.createElement("div");
    nutImg = document.createElement("img");
    constructor(src, x, y, width, height){
        this.x = x;
        this.y = y;
        this.src = src;
        this.width = width;
        this.height = height;
    }
    //getter setter
    setUp(){
        //khởi tạo thẻ chứa ảnh nut shooter
        this.nutImg.src = this.src;
        this.nutImg.alt = "nutShooter";
        this.nutImg.style.width = this.width + "vh";
        this.nut.appendChild(this.nutImg);
        //set thuộc tính cho nó
        this.nut.style.zIndex = 1;
        this.nut.style.width = this.width + "vh";
        this.nut.style.height = this.height + "vw";
        this.nut.style.position = "absolute";
        this.nut.style.top = this.y + "vh";
        this.nut.style.left = this.x + "vw";
    }
    getX(){
        return this.x;
    }
    getNut(){
        return this.nut;
    }
    displayInCanvas(){
        var canvas = document.querySelector("#wrapper #mainFrame");
        canvas.appendChild(this.nut);
    }
}