import bullet from "./bullet.js";
import peaShooter from "./peaShooter.js";
import wallNut from "./wallNut.js";


// Lấy danh sách tất cả các phần tử trong trang
var elements = document.querySelectorAll("*");
// Lặp qua từng phần tử để ngăn chặn việc bôi đen
elements.forEach(function(element) {
    // Lắng nghe sự kiện selectionchange
    element.addEventListener("selectstart", function(event) {
        // Ngăn chặn việc chọn bôi đen
        event.preventDefault();
        return false;
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'F11') {
        event.preventDefault();
    }
});

var div = document.querySelector("body");
// Ngăn chặn chế độ toàn màn hình khi click vào div
div.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
});




var pea1 = new peaShooter("./assetForPeaShooter/peaShooter.png", 10, 60, 10, 10);
pea1.setUp();
pea1.displayInCanvas();

var nut1 = new wallNut("./assetForPeaShooter/wallNut.png", 75, 60, 10, 12);
nut1.displayInCanvas();
nut1.setUp();
var bul1 = new bullet("./assetForPeaShooter/bullet.png", 0, 50);
let circle = document.getElementById("range");

//vòng lặp xử lý chính, dựa vào đại lượng thời gian time để quyết định chuyển động
let time = 0;
let mainInterval = setInterval(()=>{
    time++;
    //xử lý
    bul1.receiveClick(); 
    bul1.born(pea1.getXY()[0], pea1.getXY()[1], 1);
    
}, 20);







